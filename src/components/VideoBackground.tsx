import { useEffect, useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        },
      ) => YTPlayer
      PlayerState: {
        ENDED: number
        PLAYING: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  destroy: () => void
}

let apiLoadPromise: Promise<void> | null = null

const loadYouTubeAPI = (): Promise<void> => {
  if (apiLoadPromise) return apiLoadPromise

  apiLoadPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const first = document.getElementsByTagName('script')[0]
    first.parentNode?.insertBefore(tag, first)

    window.onYouTubeIframeAPIReady = () => resolve()
  })

  return apiLoadPromise
}

interface Props {
  videos: string[]
}

export default function VideoBackground({ videos }: Props) {
  const playersRef = useRef<Map<number, YTPlayer>>(new Map())
  const containersRef = useRef<Map<number, HTMLDivElement>>(new Map())
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const [ready, setReady] = useState(false)

  const createPlayer = useCallback(
    (videoId: string, index: number) => {
      const container = containersRef.current.get(index)
      if (!container || playersRef.current.has(index)) return

      const playerId = `yt-bg-${index}`
      const div = document.createElement('div')
      div.id = playerId
      container.appendChild(div)

      const player = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: index === 0 ? 1 : 0,
          mute: 1,
          loop: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            const p = event.target
            p.mute()
            if (index === 0) {
              p.playVideo()
              setReady(true)
            } else {
              // Preload by briefly playing then pausing
              p.playVideo()
              setTimeout(() => {
                if (currentIndexRef.current !== index) p.pauseVideo()
              }, 1500)
            }
          },
          onStateChange: (event) => {
            if (index !== currentIndexRef.current) return
            if (event.data === window.YT.PlayerState.ENDED) {
              const next = (index + 1) % videos.length
              currentIndexRef.current = next
              setCurrentIndex(next)
            }
          },
        },
      })

      playersRef.current.set(index, player)
    },
    [videos.length],
  )

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      await loadYouTubeAPI()
      if (cancelled) return

      // Create first player immediately
      createPlayer(videos[0], 0)

      // Load rest after short delay
      setTimeout(() => {
        if (cancelled) return
        for (let i = 1; i < videos.length; i++) {
          createPlayer(videos[i], i)
        }
      }, 1000)
    }

    init()

    return () => {
      cancelled = true
      playersRef.current.forEach((p) => {
        try {
          p.destroy()
        } catch {
          /* ignore */
        }
      })
      playersRef.current.clear()
    }
  }, [videos, createPlayer])

  // Switch videos
  useEffect(() => {
    videos.forEach((_, index) => {
      const player = playersRef.current.get(index)
      if (!player) return
      try {
        if (index === currentIndex) {
          player.seekTo(0, true)
          player.playVideo()
          player.mute()
        } else {
          player.pauseVideo()
        }
      } catch {
        /* not ready */
      }
    })
  }, [currentIndex, videos])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/65" />

      {/* Gradient fade at bottom for smooth transition to content below */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      {videos.map((_, index) => (
        <motion.div
          key={index}
          ref={(el) => {
            if (el) containersRef.current.set(index, el)
          }}
          className="absolute pointer-events-none [&>div]:!absolute [&>div]:!top-1/2 [&>div]:!left-1/2 [&>div]:!min-w-full [&>div]:!min-h-full [&>div]:!w-[177.78vh] [&>div]:!h-screen [&>div]:![transform:translate(-50%,-50%)_scale(1.2)] [&>iframe]:!w-full [&>iframe]:!h-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            width: '177.78vh',
            height: '100vh',
            minWidth: '100%',
            minHeight: '56.25vw',
            zIndex: index === currentIndex ? 1 : 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex && ready ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
      ))}
    </div>
  )
}
