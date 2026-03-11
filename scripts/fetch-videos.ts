/**
 * Fetches all video IDs from the Refresh Hub YouTube channel RSS feed.
 * Runs at build time — no API key needed.
 * When new videos are uploaded to YouTube, just rebuild to pick them up.
 */

const CHANNEL_ID = 'UCh6F73uH3ELH0kZI5kwMGTw'
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

interface Video {
  id: string
  title: string
  thumbnail: string
}

async function fetchVideos(): Promise<void> {
  console.log('Fetching YouTube channel videos...')

  const res = await fetch(FEED_URL)
  if (!res.ok) {
    console.error(`Failed to fetch RSS feed: ${res.status}`)
    process.exit(1)
  }

  const xml = await res.text()

  // Parse video IDs
  const idMatches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)]
  // Parse titles
  const titleMatches = [...xml.matchAll(/<media:title>([^<]+)<\/media:title>/g)]

  const videos: Video[] = idMatches.map((match, i) => ({
    id: match[1],
    title: titleMatches[i]?.[1] ?? `Property Video ${i + 1}`,
    thumbnail: `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`,
  }))

  console.log(`Found ${videos.length} videos`)

  const outPath = new URL('../src/data/videos.json', import.meta.url).pathname
  await Bun.write(outPath, JSON.stringify(videos, null, 2) + '\n')
  console.log(`Written to ${outPath}`)
}

fetchVideos()
