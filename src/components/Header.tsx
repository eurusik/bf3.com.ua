"use client"

import { Twitter, Facebook, Youtube, Swords } from "lucide-react"
import { useTranslations } from "next-intl"

function FacebookIcon() {
  return (
    <a
      href="https://www.facebook.com/pagePlayPlanet"
      target="_blank"
      rel="noopener noreferrer"
      className="w-5 h-5 flex items-center justify-center bg-[#3b5998] rounded hover:bg-[#2d4373] transition-colors"
    >
      <Facebook className="w-3 h-3 text-white" />
    </a>
  )
}

function TwitterIcon() {
  return (
    <a
      href="http://twitter.com/playplanet_ua"
      target="_blank"
      rel="noopener noreferrer"
      className="w-5 h-5 flex items-center justify-center bg-[#1DA1F2] rounded hover:bg-[#1a91da] transition-colors"
    >
      <Twitter className="w-3 h-3 text-white" />
    </a>
  )
}

function YoutubeIcon() {
  return (
    <a
      href="http://www.youtube.com/user/playplanetcomua"
      target="_blank"
      rel="noopener noreferrer"
      className="w-5 h-5 flex items-center justify-center bg-[#ff0000] rounded hover:bg-[#cc0000] transition-colors"
    >
      <Youtube className="w-3 h-3 text-white" />
    </a>
  )
}

function SteamIcon() {
  return (
    <a
      href="http://steamcommunity.com/groups/playplanet"
      target="_blank"
      rel="noopener noreferrer"
      className="w-4 h-4 flex items-center justify-center bg-[#171a21] rounded hover:bg-[#1b2838] transition-colors"
    >
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V8h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    </a>
  )
}

function SocialIcons() {
  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <FacebookIcon />
      <TwitterIcon />
      <YoutubeIcon />
      <SteamIcon />
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
            {/* Play Button Triangle */}
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

        {/* Слоган показується тільки на десктопі */}

        {/* Bottom Line */}
        <div className="w-full block float-left border-t border-[#333] mt-3"></div>
      </div>
    </header>
  )
}
