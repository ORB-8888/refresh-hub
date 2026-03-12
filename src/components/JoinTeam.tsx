import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const WHATSAPP_NUMBER = '995557124000'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello, I am interested in joining the REFRESH HUB team. I would like to learn more about available opportunities.'
)

export default function JoinTeam() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="careers" className="relative px-6 py-14 sm:py-20" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Careers
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Join the <span className="text-gradient-gold">Team</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            We're always looking for talented professionals to join our growing team.
            Reach out to start the conversation.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {/* Mobile: mailto link */}
            <a
              href="mailto:team@refresh-hub.com"
              className="group relative flex overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover sm:p-8 md:hidden"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/30 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex w-full flex-col items-center text-center">
                <EnvelopeSimple size={36} weight="duotone" className="mb-3 text-primary" />
                <h3 className="mb-1 font-semibold">Send Your CV</h3>
                <p className="mb-3 text-sm text-muted-foreground">Email us your resume and cover letter</p>
                <span className="text-sm font-medium text-primary">team@refresh-hub.com</span>
              </div>
            </a>
            {/* Desktop: selectable text, no mailto */}
            <div className="group relative hidden cursor-default overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover sm:p-8 md:block">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/30 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <EnvelopeSimple size={36} weight="duotone" className="mb-3 text-primary" />
                <h3 className="mb-1 font-semibold">Send Your CV</h3>
                <p className="mb-3 text-sm text-muted-foreground">Email us your resume and cover letter</p>
                <span className="select-all text-sm font-medium text-primary">team@refresh-hub.com</span>
              </div>
            </div>
          </motion.div>

          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundColor: 'oklch(0.65 0.18 145)' }} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <WhatsappLogo
                size={36}
                weight="duotone"
                className="mb-3"
                style={{ color: 'oklch(0.65 0.18 145)' }}
              />
              <h3 className="mb-1 font-semibold">WhatsApp</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Quick chat about opportunities
              </p>
              <span className="text-sm font-medium" style={{ color: 'oklch(0.65 0.18 145)' }}>
                Message Us
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
