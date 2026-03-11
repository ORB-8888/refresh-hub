import { InstagramLogo, FacebookLogo, TiktokLogo } from '@phosphor-icons/react'

const socials = [
  { icon: InstagramLogo, href: 'https://www.instagram.com/refresh_luxury_hub/', label: 'Instagram' },
  { icon: FacebookLogo, href: 'https://www.facebook.com/RefreshLuxuryRealEstateHub/', label: 'Facebook' },
  { icon: TiktokLogo, href: 'https://tiktok.com/@refreshhub', label: 'TikTok' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
        {/* Logo + Name */}
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="Refresh" className="h-16 w-auto opacity-80" />
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_oklch(0.75_0.12_85_/_0.15)]"
              >
                <s.icon size={18} weight="bold" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <span className="whitespace-nowrap text-center text-xs text-muted-foreground">
          &copy; 2026 Refresh Luxury Real Estate Hub. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
