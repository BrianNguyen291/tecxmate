import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-alt-black py-12 md:py-14 border-0">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-accent tracking-tighter text-white">
                <span className="font-bold">tecx</span><span className="font-normal">mate</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Got an idea? Let's build it with tecxmate!
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Team</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#team" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:hello@tecxmate.com" className="hover:text-white transition-colors duration-200">
                  Email: hello@tecxmate.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Chat with us
                </Link>
              </li>
              <li>
                <a
                  href="https://cal.com/nikolasdoan/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Book a Discovery Call
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} tecxmate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
