import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { InstagramLogo, FacebookLogo, TiktokLogo } from '@phosphor-icons/react'

const ease = [0.22, 1, 0.36, 1] as const

const socialLinks = [
  {
    name: 'Instagram',
    icon: InstagramLogo,
    url: 'https://www.instagram.com/refresh_luxury_hub/',
    handle: '@refresh_luxury_hub',
    color: 'oklch(0.65 0.20 350)',
    description: 'Follow us for the latest luxury property showcases and lifestyle content.',
  },
  {
    name: 'Facebook',
    icon: FacebookLogo,
    url: 'https://www.facebook.com/RefreshLuxuryRealEstateHub/',
    handle: 'RefreshLuxuryRealEstateHub',
    color: 'oklch(0.55 0.15 260)',
    description: 'Stay updated with new listings, market insights, and company news.',
  },
  {
    name: 'TikTok',
    icon: TiktokLogo,
    url: 'https://tiktok.com/@refreshhub',
    handle: '@refreshhub',
    color: 'oklch(0.75 0.15 170)',
    description: 'Watch property tours, behind-the-scenes, and real estate tips.',
  },
]

export default function SocialFeed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative px-6 py-14 sm:py-20" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Follow Us
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stay <span className="text-gradient-gold">Connected</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Follow our social channels for the latest luxury property showcases and exclusive content.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover sm:p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: social.color }}
              />
              <div className="relative z-10">
                <social.icon
                  size={30}
                  weight="duotone"
                  className="mb-3 transition-colors duration-300"
                  style={{ color: social.color }}
                />
                <h3 className="mb-1 font-semibold">{social.name}</h3>
                <p className="mb-2 text-xs text-muted-foreground">{social.handle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{social.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
