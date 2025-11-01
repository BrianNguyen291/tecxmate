import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-alt-black py-20 md:py-24">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-accent font-normal tracking-tighter text-white">tecxmate inc.</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Got an idea? Let's build it with tecxmate!
            </p>
            <div className="flex gap-4">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="#services" className="hover:text-white transition-colors duration-200">
                  AI Application Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors duration-200">
                  Business Automation
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors duration-200">
                  AI Integration & Consulting
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors duration-200">
                  Custom Workflow Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="#team" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-white transition-colors duration-200">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="mailto:tecxmate@gmail.com" className="hover:text-white transition-colors duration-200">
                  Email: tecxmate@gmail.com
                </a>
              </li>
              <li>
                <span>WhatsApp | Line | WeChat: nikolasdoan</span>
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
        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} tecxmate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
