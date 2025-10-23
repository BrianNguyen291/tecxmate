"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isLightBehind, setIsLightBehind] = useState(false)
  const [forceTransparent, setForceTransparent] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow
      const originalHtmlOverflowX = document.documentElement.style.overflowX
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflowX = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
        document.documentElement.style.overflowX = originalHtmlOverflowX
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    const getLuminance = (r: number, g: number, b: number) => {
      const srgb = [r, g, b].map((v) => {
        const c = v / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2]
    }

    const parseRgb = (val: string): { r: number; g: number; b: number; a: number } | null => {
      const m = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/)
      if (!m) return null
      return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] ? Number(m[4]) : 1 }
    }

    const detectBackground = () => {
      const header = document.getElementById("site-header")
      if (!header) return
      // 1) Force transparent if we're within the top half of the hero
      const hero = document.getElementById("hero") as HTMLElement | null
      if (hero) {
        const heroTop = hero.offsetTop
        const heroHeight = hero.offsetHeight
        const heroHalf = heroHeight / 2
        const scrollY = window.scrollY
        // transparent while scroll within [heroTop - 1px, heroTop + heroHalf)
        const inTopHalf = scrollY < heroTop + heroHalf
        setForceTransparent(inTopHalf)
      }

      // 2) Auto-detect background brightness behind header
      const rect = header.getBoundingClientRect()
      const x = Math.min(Math.max(rect.left + rect.width / 2, 0), window.innerWidth - 1)
      const y = Math.min(Math.max(rect.top + rect.height / 2, 0), window.innerHeight - 1)
      let el: Element | null = document.elementFromPoint(x, y)
      let attempts = 0
      while (el && attempts < 10) {
        const style = window.getComputedStyle(el as Element)
        const bgImg = style.backgroundImage
        const bgCol = style.backgroundColor
        const parsed = parseRgb(bgCol)

        if (bgImg && bgImg !== "none") {
          // If there is an image/gradient, assume mixed background; use body color fallback.
          const bodyParsed = parseRgb(getComputedStyle(document.body).backgroundColor)
          if (bodyParsed) {
            setIsLightBehind(getLuminance(bodyParsed.r, bodyParsed.g, bodyParsed.b) > 0.6)
            return
          }
        }

        if (parsed && parsed.a > 0 && bgCol !== "transparent") {
          setIsLightBehind(getLuminance(parsed.r, parsed.g, parsed.b) > 0.6)
          return
        }

        el = (el as HTMLElement).parentElement
        attempts += 1
      }

      // Fallback to body background
      const bodyParsed = parseRgb(getComputedStyle(document.body).backgroundColor || "rgb(255,255,255)")
      if (bodyParsed) setIsLightBehind(getLuminance(bodyParsed.r, bodyParsed.g, bodyParsed.b) > 0.6)
    }

    let ticking = false
    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectBackground()
          ticking = false
        })
        ticking = true
      }
    }

    detectBackground()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [])

  const containerClasses = forceTransparent
    ? "bg-transparent"
    : isLightBehind
    ? "bg-white/70 backdrop-blur-xl border-b border-black/10 shadow-sm supports-[backdrop-filter]:bg-white/50"
    : "bg-transparent"

  const linkClasses = forceTransparent
    ? "text-black/80 hover:text-black"
    : isLightBehind
    ? "text-black/80 hover:text-black"
    : "text-white/80 hover:text-white"

  const ctaClasses = forceTransparent
    ? "bg-black text-white hover:bg-black/90"
    : isLightBehind
    ? "bg-black text-white hover:bg-black/90"
    : "bg-white text-black hover:bg-white/90"

  return (
    <header id="site-header" className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 transition-colors duration-300 ${containerClasses}`}>
      {/* Left side - Mobile hamburger + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger button - on the left */}
        <button
          aria-label="Open menu"
          className={`md:hidden inline-flex items-center justify-center rounded-full p-2 ${forceTransparent ? "text-black" : isLightBehind ? "text-black" : "text-white"}`}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className={`font-semibold text-lg md:text-xl tracking-tight ${forceTransparent ? "text-black" : isLightBehind ? "text-black" : "text-white"}`}>
          <span className="font-light text-black">tecx</span>
          <span className="font-bold text-[#5b10fd]">mate</span>
        </Link>
      </div>

      {/* Desktop nav (centered on md+) */}
      <nav className="hidden md:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Home
        </Link>
        <Link
          href="/#services"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Services
        </Link>
        <Link
          href="/#portfolio"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Products
        </Link>
        <Link
          href="/#team"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Team
        </Link>
        <Link
          href="/blog"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Blog
        </Link>
        <Link
          href="/contact"
          className={`${linkClasses} text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200`}
        >
          Contact
        </Link>
      </nav>

      {/* Right side - Desktop CTA only */}
      <div className="flex items-center gap-2">
        {/* Desktop CTA */}
        <div id="gooey-btn" className="hidden md:flex relative items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer" className={`absolute right-0 px-2 py-1.5 rounded-full font-normal text-xs transition-all duration-300 cursor-pointer h-8 flex items-center justify-center -translate-x-9 group-hover:-translate-x-16 z-0 ${ctaClasses}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer" className={`px-5 py-1.5 rounded-full font-normal text-xs transition-all duration-300 cursor-pointer h-8 flex items-center z-10 ${ctaClasses}`}>
            Book a Call
          </a>
        </div>
      </div>

      {/* Mobile slide-over menu (always mounted for smooth transitions) */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          aria-hidden
          className={`fixed inset-0 z-[110] bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`fixed top-0 left-0 z-[120] h-[100dvh] w-80 max-w-[85vw] bg-white/80 backdrop-blur-md shadow-2xl transition-transform duration-300 will-change-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-base font-semibold">Menu</span>
            <button aria-label="Close menu" className="p-2" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-2">
            <Link href="/" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/#services" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/#portfolio" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link href="/#team" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Team
            </Link>
            <Link href="/blog" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="py-3 px-3 rounded-lg hover:bg-black/5" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <a 
              href="https://cal.com/nikolasdoan/30min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-3 rounded-lg bg-black text-white hover:bg-black/90 text-center font-medium mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Call
            </a>
          </nav>
        </aside>
      </div>
    </header>
  )
}

