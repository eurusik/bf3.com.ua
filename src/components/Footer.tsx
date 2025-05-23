"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

function AuthorInfo() {
  const t = useTranslations("footer")

  return (
    <div className="author-info">
      <div>{t("basedOn")}</div>
      <div className="mt-1">
        {t("author")}:{" "}
        <a href="https://github.com/Mo45" target="_blank" rel="noopener noreferrer">
          Kirill Krasin
        </a>
      </div>
      <div className="mt-2">
        {t("rewrittenBy")}:{" "}
        <a href="https://github.com/eurusik" target="_blank" rel="noopener noreferrer">
          EuRusik
        </a>
      </div>
    </div>
  )
}

function Copyright() {
  const t = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  return (
    <div className="copyright">
      <div>{t.rich("copyright", { year: currentYear })}</div>
      <div className="mt-1">{t("copyRequirement")}</div>
    </div>
  )
}

function Navigation() {
  const t = useTranslations("footer")

  return (
    <nav className="navigation">
      <div className="flex flex-wrap gap-2">
        <Link href="/about">{t("about")}</Link>
        <span className="px-1">|</span>
        <Link href="/feedback">{t("contacts")}</Link>
        <span className="px-1">|</span>
        <Link href="/ads">{t("ads")}</Link>
        <span className="px-1">|</span>
        <Link href="/partners">{t("partners")}</Link>
      </div>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="w-full mt-8 pb-4 bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="footer-grid">
          <AuthorInfo />
          <Copyright />
          <Navigation />
        </div>
      </div>
    </footer>
  )
}
