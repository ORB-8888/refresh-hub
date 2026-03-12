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
    href: 'https://maps.google.com/?cid=16861927899849324521',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+995 557 12 40 00',
    sub: 'Mon — Sat, 12:00 — 20:00',
    href: 'tel:+995557124000',
  },
  {
    icon: EnvelopeSimple,
    label: 'Email Us',
    value: 'info@refresh-hub.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@refresh-hub.com',
  },
  {
    icon: WhatsappLogo,
    label: 'WhatsApp',
    value: 'Contact Us',
    sub: 'Quick response guaranteed',
    href: 'https://wa.me/995557124000',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative px-6 py-14 sm:py-20" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Get in Touch
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let's <span className="text-gradient-gold">Connect</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Ready to find your dream property? Reach out and let our experts guide you.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, i) => {
            const isEmail = item.href.startsWith('mailto:')
            const isExternal = item.href.startsWith('http')
            const cardClass = "group rounded-xl border border-border/50 bg-card p-5 text-center transition-all duration-500 hover:border-primary/20 hover:bg-card-hover hover:shadow-[0_0_30px_oklch(0.75_0.12_85_/_0.08)]"
            const inner = (
              <>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_oklch(0.75_0.12_85_/_0.15)]">
                  <item.icon size={24} weight="duotone" />
                </div>
                <div className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </div>
                <div className="mb-0.5 text-sm font-semibold text-foreground select-all">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </>
            )

            if (isEmail) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease }}
                >
                  {/* Mobile: mailto link */}
                  <a href={item.href} className={`${cardClass} md:hidden`}>{inner}</a>
                  {/* Desktop: selectable text, no mailto */}
                  <div className={`${cardClass} hidden cursor-default md:block`}>{inner}</div>
                </motion.div>
              )
            }

            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cardClass}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease }}
              >
                {inner}
              </motion.a>
            )
          })}
        </div>

        <motion.div
          className="mt-8 overflow-hidden rounded-xl border border-border/50 sm:mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.793!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404473e45ba98c55%3A0xe9cd67f79c7f37e9!2sRefresh%20Luxury%20Hub!5e0!3m2!1sen!2sge!4v1"
            width="100%"
            height="300"
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
