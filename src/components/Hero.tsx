import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import VideoBackground from './VideoBackground'

const ease = [0.22, 1, 0.36, 1] as const

const backgroundVideos = ['0Jg4ntu9iFU', '_jNsxPWiDms', 'CKBiUs_DPpc']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* YouTube video background */}
      <VideoBackground videos={backgroundVideos} />

      <motion.div
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo in circle */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-black/40 p-5 backdrop-blur-sm sm:h-32 sm:w-32 sm:p-6">
            <img src="/logo.png" alt="Refresh" className="h-full w-full object-contain" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-5">
          <span className="inline-block rounded-full border border-primary/30 bg-black/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            International Luxury Real Estate
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient-gold">Premium</span>
          <br />
          <span className="text-white">Living Redefined</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-8 max-w-xl text-base text-white/70 sm:text-lg"
        >
          Exclusive apartments, penthouses & villas.
          <br className="hidden sm:block" />
          Strong marketing & expert negotiation.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#gallery"
            className="group relative overflow-hidden rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.12_85_/_0.3)]"
          >
            <span className="relative z-10">View Properties</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex items-center justify-center gap-10 sm:gap-12"
        >
          {[
            { value: '50+', label: 'Premium Listings' },
            { value: '8+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient-gold sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs tracking-wide text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — prominent arrow */}
      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
          Scroll
        </span>
        <CaretDown size={28} weight="bold" className="text-white/50" />
      </motion.a>
    </section>
  )
}
