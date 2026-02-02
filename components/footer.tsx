"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Video, Phone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useContactForm } from "@/components/contact-form-provider"
import { company } from "@/lib/company"

export function Footer() {
  const { language, t } = useLanguage()
  const { openContactForm } = useContactForm()

  return (
    <footer id="footer" className="bg-alt-black py-12 md:py-16 border-0">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          {/* Brand & Social */}
          <div className="space-y-4 md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-accent italic tracking-wide text-white">
                <span className="font-thin">tecx</span>
                <span className="font-thin">mate</span>
              </span>
              <span className="text-2xl font-accent italic tracking-wide text-white">達盟科技</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">{t("got_idea")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openContactForm}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Video className="h-5 w-5 shrink-0" />
                <span className="text-sm">{t("book_discovery_call")}</span>
              </button>
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
              <p className="text-sm text-gray-300">
                {t("email")}:{" "}
                <a
                  href={`mailto:${company.contactEmail}`}
                  className="text-white hover:text-primary transition-colors duration-200"
                >
                  {company.contactEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-2">
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

          {/* Legal & Contact - organized by country */}
          <div className="space-y-4 md:col-span-6">
            <h3 className="text-lg font-semibold text-white">{t("footer_legal_contact")}</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="grid gap-4 sm:grid-cols-3">
                {/* US */}
                <div className="space-y-1 rounded-lg border border-gray-700/50 p-3">
                  <p className="font-medium text-white">{company.legalName.en}</p>
                  <p className="text-white text-xs leading-relaxed">{company.addressUS}</p>
                  <a
                    href={`tel:${company.phone.us.tel}`}
                    className="inline-flex items-center gap-1.5 text-white hover:text-primary transition-colors duration-200 text-xs"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {company.phone.us.display}
                  </a>
                </div>
                {/* Taiwan */}
                <div className="space-y-1 rounded-lg border border-gray-700/50 p-3">
                  <p className="font-medium text-white">{company.legalName.zh}</p>
                  <p className="text-white text-xs leading-relaxed">{company.addressTW}</p>
                  <a
                    href={`tel:${company.phone.tw.tel}`}
                    className="inline-flex items-center gap-1.5 text-white hover:text-primary transition-colors duration-200 text-xs"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {company.phone.tw.display}
                  </a>
                </div>
                {/* Vietnam */}
                <div className="space-y-1 rounded-lg border border-gray-700/50 p-3">
                  <p className="font-medium text-white">{company.legalName.vi}</p>
                  <p className="text-white text-xs leading-relaxed">{t("address")}</p>
                  <a
                    href={`tel:${company.phone.vn.tel}`}
                    className="inline-flex items-center gap-1.5 text-white hover:text-primary transition-colors duration-200 text-xs"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {company.phone.vn.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-sm text-white">
          <p className="text-white">
            © {new Date().getFullYear()} {company.name.toUpperCase()}. {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
