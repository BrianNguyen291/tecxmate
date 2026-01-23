"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Video } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { language, t } = useLanguage()
  
  return (
    <footer id="footer" className="bg-alt-black py-12 md:py-14 border-0">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-accent italic tracking-wide text-white">
                <span className="font-thin">tecx</span><span className="font-thin">mate</span>
              </span>
              {language === 'zh' && (
                <span className="text-2xl font-accent italic tracking-wide text-white">凰龜科技</span>
              )}
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("got_idea")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://cal.com/nikolasdoan/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Video className="h-5 w-5" />
                <span className="text-sm">{t("book_discovery_call")}</span>
              </a>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/tecxmate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://x.com/tecxmate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X</span>
              </a>
              <a 
                href="https://www.instagram.com/tecxmate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://tw.linkedin.com/company/tecxmate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              </div>
            </div>
          </div>
          <div className="space-y-3 md:ml-6">
            <h3 className="text-lg font-semibold text-white">{t("team")}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  {t("news_insights")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">
                  {t("terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">{t("contact")}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:niko.tecx@gmail.com" className="hover:text-white transition-colors duration-200">
                  {t("email")}: niko.tecx@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/nikolasdoan/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("book_discovery_call")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 text-center text-sm copyright-text">
          <p>© {new Date().getFullYear()} tecxmate. {t("all_rights_reserved")}</p>
        </div>
      </div>
    </footer>
  )
}
