"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = useCallback((path: string) => {
    return pathname === path
  }, [pathname])
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])
  
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-[#F6F3F1]/30 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-accent tracking-tighter text-primary">
            <span className="font-bold">tecx</span><span className="font-normal">mate</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={`text-sm font-medium transition-colors ${isActive("/projects") ? "text-primary" : "hover:text-primary"}`}
          >
            Projects
          </Link>
          <Link 
            href="/services" 
            className={`text-sm font-medium transition-colors ${isActive("/services") ? "text-primary" : "hover:text-primary"}`}
          >
            Services
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
          >
            News & Insights
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex" asChild>
            <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors ${isActive("/projects") ? "text-primary" : "hover:text-primary"}`}
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors ${isActive("/services") ? "text-primary" : "hover:text-primary"}`}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
              onClick={closeMenu}
            >
              News & Insights
            </Link>
            <Button className="w-full" onClick={closeMenu} asChild>
              <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
