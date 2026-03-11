import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Merab Aleksidze St. 12',
    sub: 'Tbilisi, Georgia 0171',
    href: 'https://maps.google.com/?q=Merab+Aleksidze+St.+12,+Tbilisi,+Georgia+0171',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+995 557 12 40 00',
    sub: 'Mon — Sat, 10:00 — 19:00',
    href: 'tel:+995557124000',
  },
  {
    icon: EnvelopeSimple,
    label: 'Email Us',
    value: 'contact@refresh-hub.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:contact@refresh-hub.com',
  },
  {
    icon: WhatsappLogo,
    label: 'WhatsApp',
    value: 'Message Us',
    sub: 'Quick response guaranteed',
    href: 'https://wa.me/995557124000',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Get in Touch
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let's <span className="text-gradient-gold">Connect</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Ready to find your dream property? Reach out and let our experts guide you through every step.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group rounded-xl border border-border/50 bg-card p-6 text-center transition-all duration-500 hover:border-primary/20 hover:bg-card-hover hover:shadow-[0_0_30px_oklch(0.75_0.12_85_/_0.08)]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i, ease }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_oklch(0.75_0.12_85_/_0.15)]">
                <item.icon size={28} weight="duotone" />
              </div>
              <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {item.label}
              </div>
              <div className="mb-1 font-semibold text-foreground">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </motion.a>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          className="mt-12 overflow-hidden rounded-xl border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.793!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzU0LjQiTiA0NMKwNDcnMzQuOCJF!5e0!3m2!1sen!2sge!4v1"
            width="100%"
            height="350"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
