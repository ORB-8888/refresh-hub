/**
 * Fetches all videos from the Refresh Hub YouTube channel RSS feed.
 * Auto-detects Shorts vs regular videos via oEmbed dimensions.
 * Runs at build time — no API key needed.
 */

const CHANNEL_ID = 'UCh6F73uH3ELH0kZI5kwMGTw'
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

interface Video {
  id: string
  title: string
  thumbnail: string
  type: 'video' | 'short'
}

async function detectType(videoId: string): Promise<'video' | 'short'> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${videoId}&format=json`,
    )
    if (!res.ok) return 'video'
    const data = await res.json()
    // Shorts have portrait dimensions (height > width)
    return data.height > data.width ? 'short' : 'video'
  } catch {
    return 'video'
  }
}

async function fetchVideos(): Promise<void> {
  console.log('Fetching YouTube channel videos...')

  const res = await fetch(FEED_URL)
  if (!res.ok) {
    console.error(`Failed to fetch RSS feed: ${res.status}`)
    process.exit(1)
  }

  const xml = await res.text()

  const idMatches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)]
  const titleMatches = [...xml.matchAll(/<media:title>([^<]+)<\/media:title>/g)]

  console.log(`Found ${idMatches.length} videos, detecting types...`)

  const videos: Video[] = await Promise.all(
    idMatches.map(async (match, i) => {
      const id = match[1]
      const type = await detectType(id)
      return {
        id,
        title: titleMatches[i]?.[1] ?? `Property Video ${i + 1}`,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        type,
      }
    }),
  )

  const regulars = videos.filter((v) => v.type === 'video')
  const shorts = videos.filter((v) => v.type === 'short')
  console.log(`  ${regulars.length} regular videos, ${shorts.length} shorts`)

  const outPath = new URL('../src/data/videos.json', import.meta.url).pathname
  await Bun.write(outPath, JSON.stringify(videos, null, 2) + '\n')
  console.log(`Written to ${outPath}`)
}

fetchVideos()
