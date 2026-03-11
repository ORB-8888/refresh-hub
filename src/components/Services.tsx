import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { House, Warehouse, Crown, MagnifyingGlass, CurrencyDollar, ShieldCheck } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const services = [
  {
    icon: House,
    title: 'Premium Apartments',
    description: 'Luxury apartments in the most sought-after locations with world-class amenities and stunning views.',
  },
  {
    icon: Crown,
    title: 'Penthouses',
    description: 'Exclusive penthouse properties offering unparalleled living experiences at the pinnacle of luxury.',
  },
  {
    icon: Warehouse,
    title: 'Luxury Villas',
    description: 'Prestigious villas with private grounds, pools, and bespoke architectural design.',
  },
  {
    icon: MagnifyingGlass,
    title: 'Property Search',
    description: 'Tailored property search service matching your exact requirements and lifestyle preferences.',
  },
  {
    icon: CurrencyDollar,
    title: 'Investment Advisory',
    description: 'Strategic real estate investment guidance to maximize returns on luxury property portfolios.',
  },
  {
    icon: ShieldCheck,
    title: 'Full-Service Support',
    description: 'End-to-end support from property viewing through legal processes to final handover.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="relative px-6 py-14 sm:py-20" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Services
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What We <span className="text-gradient-gold">Offer</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Comprehensive luxury real estate services tailored to the most discerning clients.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover sm:p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease }}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/0 blur-[60px] transition-all duration-700 group-hover:bg-primary/[0.06]" />
              <div className="relative z-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15">
                  <service.icon size={24} weight="duotone" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
