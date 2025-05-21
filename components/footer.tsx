import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#F6F3F1] py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tighter text-primary">TECXMATE</span>
            </Link>
            <p className="text-sm text-gray-500">
              Empowering SMEs and Founders with premier technology consultancy and solutions.
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
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#services" className="hover:text-primary">
                  MVP Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-primary">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-primary">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-primary">
                  Market Research & Consultancy
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-primary">
                  UI/UX & Graphics Design
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
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
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="mailto:tecxmate@gmail.com" className="hover:text-primary">
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
                  className="hover:text-primary"
                >
                  Book a Discovery Call
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tecxmate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
