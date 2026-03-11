import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Play } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const videos = [
  { id: '0Jg4ntu9iFU', title: 'Luxury Property Tour' },
  { id: '_jNsxPWiDms', title: 'Premium Penthouse Showcase' },
  { id: 'CKBiUs_DPpc', title: 'Exclusive Villa Walkthrough' },
]

// Use YouTube thumbnails as gallery images — zero maintenance
const galleryImages = [
  ...videos.map((v) => ({
    src: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
    alt: v.title,
    videoId: v.id,
  })),
  ...videos.map((v) => ({
    src: `https://img.youtube.com/vi/${v.id}/sddefault.jpg`,
    alt: v.title,
    videoId: v.id,
  })),
]

function AutoScrollCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.5

    const scroll = () => {
      scrollPos += speed
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0
      }
      el.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    const pause = () => cancelAnimationFrame(animationId)
    const resume = () => { animationId = requestAnimationFrame(scroll) }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
    }
  }, [])

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate for infinite scroll */}
        {[...galleryImages, ...galleryImages].map((img, i) => (
          <div
            key={i}
            className="group relative aspect-video w-[320px] flex-shrink-0 overflow-hidden rounded-xl sm:w-[400px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <button
              onClick={() => setPlayingVideo(img.videoId)}
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110">
                <Play size={24} weight="fill" />
              </div>
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-sm font-medium text-white/90">{img.alt}</p>
            </div>
          </div>
        ))}
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
