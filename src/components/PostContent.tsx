"use client"

import FeaturedImage from "./FeaturedImage"

interface PostContentProps {
  content: string
  featuredImage?: {
    node?: {
      sourceUrl?: string
    }
  }
  title: string
}

export default function PostContent({ content, featuredImage, title }: PostContentProps) {
  return (
    <div className="border-b border-[#333] pb-4 mb-4 segoe-ui-font-light text-base">
      {featuredImage?.node?.sourceUrl && (
        <FeaturedImage
          src={featuredImage.node.sourceUrl}
          alt={title}
          title={title}
          width={960}
          height={300}
        />
      )}
      
      <div 
        className="text-white segoe-ui-font-light text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
