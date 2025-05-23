"use client"

import { Search, Swords } from "lucide-react"
import { useTranslations } from "next-intl"
import { SiDiscord, SiX } from "@icons-pack/react-simple-icons"
import socialLinks from "@/src/config/social-links"

function TwitterIcon() {
  return (
    <a
      href={socialLinks.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center bg-[#000] rounded hover:bg-[#101010] transition-colors"
    >
      <SiX className="w-4 h-4 text-white" />
    </a>
  )
}

function SearchIcon() {
  return (
    <a
      href={socialLinks.search}
      className="w-8 h-8 flex items-center justify-center bg-[#000] rounded hover:bg-[#101010] transition-colors"
    >
      <Search className="w-4 h-4 text-white" />
    </a>
  )
}

function DiscordIcon() {
  return (
    <a
      href={socialLinks.discord}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center bg-[#000] rounded hover:bg-[#101010] transition-colors"
    >
      <SiDiscord className="w-4 h-4 text-white" />
    </a>
  )
}


function SocialIcons() {
  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <SearchIcon />
      <TwitterIcon />
      <DiscordIcon />
    </div>
  )
}

export default function Header() {
  const t = useTranslations()

  return (
    <header className="w-full text-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 md:space-x-3 max-w-[75%] md:max-w-none">
            <div className="flex-shrink-0">
              <Swords className="w-6 h-6 md:w-8 md:h-8" />
            </div>

            {/* Title */}
            <div className="font-segoe truncate">
              <span className="text-lg md:text-2xl font-light whitespace-normal md:whitespace-nowrap">
                {t("header.title")} <sup className="text-xs md:text-sm font-normal">{t("header.version")}</sup>
                <span className="hidden md:inline"> — {t("header.slogan")}</span>
              </span>
            </div>
          </div>

          {/* Right - Social Icons */}
          <SocialIcons />
        </div>

        {/* Bottom Line */}
        <div className="w-full block float-left border-t border-[#333] mt-3"></div>
      </div>
    </header>
  )
}
