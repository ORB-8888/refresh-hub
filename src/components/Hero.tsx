import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import VideoBackground from './VideoBackground'

const ease = [0.22, 1, 0.36, 1] as const

const backgroundVideos = ['0Jg4ntu9iFU', '_jNsxPWiDms', 'CKBiUs_DPpc']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
      <VideoBackground videos={backgroundVideos} />

      <motion.div
        className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-5 pt-14 text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo in circle */}
        <motion.div variants={fadeUp} className="mb-4 sm:mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-black/40 p-4 backdrop-blur-sm sm:h-28 sm:w-28 sm:p-5">
            <img src="/logo.png" alt="Refresh" className="h-full w-full object-contain" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-3 sm:mb-4">
          <span className="inline-block rounded-full border border-primary/30 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs">
            International Luxury Real Estate
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-3 text-3xl font-bold leading-[1.1] tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient-gold">Premium</span>
          <br />
          <span className="text-white">Living Redefined</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-5 max-w-md text-sm text-white/70 sm:mb-6 sm:max-w-xl sm:text-lg"
        >
          Exclusive apartments, penthouses & villas.
          <br className="hidden sm:block" />
          Strong marketing & expert negotiation.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#gallery"
            className="group relative overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.12_85_/_0.3)] sm:px-8 sm:py-3"
          >
            <span className="relative z-10">View Properties</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:px-8 sm:py-3"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-6 sm:mt-10 sm:gap-12"
        >
          {[
            { value: '50+', label: 'Premium Listings' },
            { value: '8+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-gradient-gold sm:text-3xl">{stat.value}</div>
              <div className="mt-0.5 text-[10px] tracking-wide text-white/50 sm:text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — always visible at bottom */}
      <motion.a
        href="#about"
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/40 sm:text-[10px]">
          Scroll
        </span>
        <CaretDown size={24} weight="bold" className="text-white/50" />
      </motion.a>
    </section>
  )
}
