import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            International Luxury Real Estate
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-gold">Premium</span>
          <br />
          <span className="text-foreground">Living Redefined</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground sm:text-xl"
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
            className="rounded-lg border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-card-hover"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16 flex items-center justify-center gap-12 text-muted-foreground"
        >
          {[
            { value: '50+', label: 'Premium Listings' },
            { value: '8+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient-gold sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CaretDown size={24} className="text-muted-foreground" />
      </motion.a>
    </section>
  )
}
