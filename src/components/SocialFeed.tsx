import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { InstagramLogo, FacebookLogo, TiktokLogo, XLogo } from '@phosphor-icons/react'

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
  {
    name: 'X / Twitter',
    icon: XLogo,
    url: 'https://x.com/RefreshHub',
    handle: '@RefreshHub',
    color: 'oklch(0.85 0.01 260)',
    description: 'Real-time market updates and luxury real estate insights.',
  },
]

function FacebookEmbed() {
  useEffect(() => {
    const existingScript = document.getElementById('fb-sdk')
    if (!existingScript) {
      const script = document.createElement('script')
      script.id = 'fb-sdk'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0'
      document.body.appendChild(script)
    }
    if (window.FB) {
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/RefreshLuxuryRealEstateHub/"
        data-tabs="timeline"
        data-width="500"
        data-height="600"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote
          cite="https://www.facebook.com/RefreshLuxuryRealEstateHub/"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/RefreshLuxuryRealEstateHub/">
            Refresh Luxury Real Estate Hub
          </a>
        </blockquote>
      </div>
    </div>
  )
}

export default function SocialFeed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32" ref={ref}>
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Follow Us
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stay <span className="text-gradient-gold">Connected</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Follow our social channels for the latest luxury property showcases, market insights, and exclusive content.
          </p>
        </motion.div>

        {/* Social link cards */}
        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: social.color }}
              />
              <div className="relative z-10">
                <social.icon size={32} weight="duotone" className="mb-4 transition-colors duration-300" style={{ color: social.color }} />
                <h3 className="mb-1 font-semibold">{social.name}</h3>
                <p className="mb-3 text-xs text-muted-foreground">{social.handle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{social.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Facebook Page embed */}
        <motion.div
          className="mx-auto max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <h3 className="mb-6 text-center text-lg font-semibold text-muted-foreground">
            Latest from Facebook
          </h3>
          <FacebookEmbed />
        </motion.div>
      </div>
    </section>
  )
}
