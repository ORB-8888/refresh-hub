import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Buildings, Globe, Handshake, TrendUp } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const features = [
  {
    icon: Buildings,
    title: 'Exclusive Listings',
    description: 'Curated selection of premium apartments, penthouses, and villas in prime locations.',
  },
  {
    icon: TrendUp,
    title: 'Strong Marketing',
    description: 'Strategic marketing approach ensuring maximum visibility for every property.',
  },
  {
    icon: Handshake,
    title: 'Expert Negotiation',
    description: 'Skilled negotiators who secure the best deals for our clients, every time.',
  },
  {
    icon: Globe,
    title: 'International Reach',
    description: 'Global network connecting buyers and sellers across borders seamlessly.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Who We Are
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Highly Strategic
            <br />
            <span className="text-gradient-gold">Selling Experts</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We are skilled negotiators, seasoned marketers, and loyal confidantes.
            Our team combines deep market knowledge with a passion for luxury real estate
            to deliver exceptional results for every client.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover hover:shadow-[0_0_30px_oklch(0.75_0.12_85_/_0.08)]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_oklch(0.75_0.12_85_/_0.15)]">
                <feature.icon size={24} weight="duotone" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
