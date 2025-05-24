"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import FeaturedImage from "./FeaturedImage"
import Categories from "./Categories"

interface NewsProps {
  title: string
  comments?: number | string
  content: string
  thumbnail?: string
  categories?: string[]
  permalink: string
  unoptimized?: boolean
}

function NewsTitle({ title, comments, permalink }: { title: string, comments?: number | string, permalink: string }) {
  const t = useTranslations('news');
  
  return (
    <div id="title" className="flex justify-between items-center border-b border-[#333] pb-2 mb-4 segoe-ui-font-light uppercase">
      <Link 
        href={permalink} 
        title={title}
        className="text-xl md:text-3xl font-light text-white hover:text-[#fae326] transition-colors mr-1"
      >
        {title}
      </Link>
      {comments !== undefined && (
        <span id="comm" title={t('comments')} className="text-lg md:text-xl text-gray-400 relative float-right pr-[15px] segoe-ui-font-light flex items-center">
          <MessageSquare className="w-4 h-4 mr-1" />
          {comments}
        </span>
      )}
    </div>
  )
}

function NewsThumbnail({ thumbnail, title, unoptimized = false }: { thumbnail?: string, title: string, unoptimized?: boolean }) {
  if (!thumbnail) {
    return null;
  }
  
  return (
    <FeaturedImage
      src={thumbnail}
      alt={title}
      title={title}
      width={960}
      height={100}
      unoptimized={unoptimized}
    />
  );
}

export default function News({
  title,
  comments,
  content,
  thumbnail,
  categories = [],
  permalink,
  unoptimized = false
}: NewsProps) {
  return (
    <div className="news mb-6 bg-[rgba(0,0,0,0.7)] rounded-[0.8rem] p-4" id="item">
      <NewsTitle title={title} comments={comments} permalink={permalink} />
      
      <div id="text" className="border-b border-[#333] pb-4 mb-4 segoe-ui-font-light text-base">
        <NewsThumbnail thumbnail={thumbnail} title={title} unoptimized={unoptimized} />
        <div className="text-white segoe-ui-font-light text-base" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      
      <Categories categories={categories} />
    </div>
  )
}
