"use client"

import Link from "next/link"
import { formatDate } from "@/src/utils/dateFormat"

interface PostHeaderProps {
  title: string
  slug: string
  date: string
  locale: string
}

export default function PostHeader({ title, slug, date, locale }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-[#333] pb-2 mb-4 segoe-ui-font-light uppercase">
      <Link 
        href={`/post/${slug}`} 
        title={title}
        className="text-xl md:text-3xl font-light text-white hover:text-[#fae326] transition-colors mr-1"
      >
        {title}
      </Link>
      <span className="text-lg md:text-xl text-gray-400 relative float-right pr-[15px] segoe-ui-font-light flex items-center">
        {formatDate(date, locale === 'uk' ? 'uk-UA' : 'en-US')}
      </span>
    </div>
  )
}
