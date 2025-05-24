"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export default function BackToHome() {
  const t = useTranslations('news');
  
  return (
    <div className="mb-6 text-center">
      <Link 
        href="/"
        className="text-white hover:text-[#fae326] transition-colors"
      >
        {t('backToHome')}
      </Link>
    </div>
  )
}
