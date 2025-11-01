"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative bg-[#F6F3F1] pt-12 md:pt-16 pb-6 snap-end">

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="font-semibold text-2xl md:text-3xl tracking-tight">
                <span className="font-light text-black">tecx</span>
                <span className="font-bold text-[#5b10fd]">mate</span>
              </span>
            </Link>
            <p className="text-lg text-gray-500">
              Got an idea? Let us be your tecxmate!
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold tracking-tighter">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#team" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold tracking-tighter">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="mailto:hello@tecxmate.com" className="hover:text-primary">
                  Email: hello@tecxmate.com
                </a>
              </li>
              
              <li>
                <a
                  href="https://cal.com/nikolasdoan/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Book a Discovery Call
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 md:mt-10 border-t border-gray-200 pt-4 text-center text-lg text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} tecxmate. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
