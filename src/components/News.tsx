"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { MessageSquare } from "lucide-react"

interface NewsProps {
  title: string
  comments?: number | string
  content: string
  thumbnail?: string
  categories?: string[]
  permalink: string
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

function ImageSkeleton({ text }: { text: string }) {
  return (
    <div className="thumb h-[100px] w-full bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse rounded-[0.8rem] border-2 border-[#333] flex items-center justify-center">
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  )
}

function NewsThumbnail({ thumbnail, title }: { thumbnail?: string, title: string }) {
  const t = useTranslations('news');
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="mb-4">
      {thumbnail && !imageError ? (
        <>
          {!imageLoaded && <ImageSkeleton text={t('loadingImage')} />}
          <Image 
            src={thumbnail} 
            alt={title} 
            title={title}
            width={960} 
            height={100} 
            className={`thumb ${!imageLoaded ? 'hidden' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </>
      ) : (
        <ImageSkeleton text={t('missingImage')} />
      )}
    </div>
  )
}

function NewsCategories({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null
  
  return (
    <div id="postmeta" className="text-xs text-gray-400 pt-1">
      <div>
        <span className="categories">
          {categories.join(", ")}
        </span>
      </div>
    </div>
  )
}

export default function News({
  title,
  comments,
  content,
  thumbnail,
  categories = [],
  permalink
}: NewsProps) {
  return (
    <div className="news mb-6 bg-[rgba(0,0,0,0.7)] rounded-[0.8rem] p-4" id="item">
      <NewsTitle title={title} comments={comments} permalink={permalink} />
      
      <div id="text" className="border-b border-[#333] pb-4 mb-4 segoe-ui-font-light text-base">
        <NewsThumbnail thumbnail={thumbnail} title={title} />
        <div className="text-white segoe-ui-font-light text-base" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      
      <NewsCategories categories={categories} />
    </div>
  )
}
