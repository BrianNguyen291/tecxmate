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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#F6F3F1]/80 backdrop-blur-md relative">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl tracking-tight">
            <span className="font-light text-black">tecx</span>
            <span className="font-bold text-[#5b10fd]">mate</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
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
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
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
          <Button asChild>
            <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger Button - Top Right */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden absolute top-2 right-2 z-[60] bg-red-500 text-white shadow-lg rounded-lg" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Side Panel */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[55] md:hidden" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Slide-in Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/40">
                <span className="text-lg font-semibold text-primary">Menu</span>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col gap-2 p-6">
                <Link
                  href="/"
                  className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    isActive("/") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="flex items-center py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="#process"
                  className="flex items-center py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Process
                </Link>
                <Link
                  href="#portfolio"
                  className="flex items-center py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="/blog"
                  className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    isActive("/blog") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    isActive("/contact") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
              
              {/* Footer Actions */}
              <div className="p-6 border-t border-border/40 space-y-4">
                <Button className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
                  <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                    Book a Call
                  </a>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Language
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>Chinese</DropdownMenuItem>
                    <DropdownMenuItem>Vietnamese</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
