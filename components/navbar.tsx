"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#F6F3F1]/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-primary">TECXMATE</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
          >
            Home
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">
            Process
          </Link>
          <Link href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
            Portfolio
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Chinese</DropdownMenuItem>
              <DropdownMenuItem>Vietnamese</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="hidden md:flex" asChild>
            <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#process"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
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
