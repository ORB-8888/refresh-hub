import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Showcase from './components/Showcase'
import SocialFeed from './components/SocialFeed'
import Contact from './components/Contact'
import Footer from './components/Footer'

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="flex flex-col items-center gap-8">
        <motion.img
          src="/logo.png"
          alt="Refresh"
          className="h-40 w-auto sm:h-52"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 240 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Exclusive listings &bull; Expert negotiation
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [videoReady, setVideoReady] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)
  const loading = !videoReady || !minTimePassed

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Fallback: if video never loads (ad blocker etc), show site after 5s
  useEffect(() => {
    const fallback = setTimeout(() => setVideoReady(true), 5000)
    return () => clearTimeout(fallback)
  }, [])

  const onVideoReady = useCallback(() => setVideoReady(true), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* Always render Hero so video preloads immediately */}
      <div style={{ visibility: loading ? 'hidden' : 'visible', position: loading ? 'fixed' : 'relative', inset: 0 }}>
        <Navbar />
        <Hero onVideoReady={onVideoReady} />
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <About />
          <Services />
          <Showcase />
          <SocialFeed />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  )
}
