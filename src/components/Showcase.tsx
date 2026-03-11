import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Play } from '@phosphor-icons/react'
import allVideos from '../data/videos.json'

const ease = [0.22, 1, 0.36, 1] as const

function AutoScrollCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })
  const hasDragged = useRef(false)
  const [validVideos, setValidVideos] = useState(allVideos)

  // Filter out videos without thumbnails
  useEffect(() => {
    let cancelled = false

    async function checkThumbnails() {
      const results = await Promise.all(
        allVideos.map(async (video) => {
          try {
            const img = new Image()
            const loaded = await new Promise<boolean>((resolve) => {
              img.onload = () => {
                // YouTube returns a 120x90 gray placeholder if no maxres thumbnail
                resolve(img.naturalWidth > 200)
              }
              img.onerror = () => resolve(false)
              img.src = video.thumbnail
            })
            return loaded ? video : null
          } catch {
            return null
          }
        }),
      )
      if (!cancelled) {
        const filtered = results.filter(Boolean) as typeof allVideos
        if (filtered.length > 0) setValidVideos(filtered)
      }
    }

    checkThumbnails()
    return () => { cancelled = true }
  }, [])

  // Auto-scroll — faster speed
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = el.scrollLeft
    const speed = 1.0
    let paused = false

    const scroll = () => {
      if (!paused) {
        scrollPos += speed
        if (scrollPos >= el.scrollWidth / 2) scrollPos = 0
        el.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    const pause = () => { paused = true }
    const resume = () => { scrollPos = el.scrollLeft; paused = false }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', () => setTimeout(resume, 3000))

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
    }
  }, [validVideos])

  // Drag-to-scroll
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    hasDragged.current = false
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    const dx = e.pageX - dragStart.current.x
    if (Math.abs(dx) > 5) hasDragged.current = true
    el.scrollLeft = dragStart.current.scrollLeft - dx
  }

  const onMouseUp = () => setIsDragging(false)

  const handleVideoClick = (videoId: string) => {
    if (hasDragged.current) return
    setPlayingVideo(videoId)
  }

  const items = [...validVideos, ...validVideos]

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-6 scrollbar-hide sm:gap-4"
        style={{ scrollBehavior: 'auto', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((video, i) => {
          const isShort = video.type === 'short'
          return (
            <div
              key={`${video.id}-${i}`}
              className={`group relative flex-shrink-0 overflow-hidden rounded-xl ${
                isShort
                  ? 'aspect-[9/16] w-[180px] sm:w-[220px]'
                  : 'aspect-video w-[280px] sm:w-[380px]'
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <button
                onClick={() => handleVideoClick(video.id)}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110">
                  <Play size={20} weight="fill" />
                </div>
              </button>
              <div className="absolute bottom-2 left-3 right-3">
                <p className="line-clamp-2 text-xs font-medium text-white/90">{video.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Video modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className="relative mx-4 aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
              className="h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Property Video"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="relative py-14 sm:py-20" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Showroom
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Property <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Explore our curated collection of luxury properties through immersive video tours.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <AutoScrollCarousel />
      </motion.div>
    </section>
  )
}
