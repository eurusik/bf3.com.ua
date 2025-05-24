"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

interface FeaturedImageProps {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  className?: string
  unoptimized?: boolean
}

export default function FeaturedImage({
  src,
  alt,
  title,
  width = 960,
  height = 300,
  className = "",
  unoptimized = true
}: FeaturedImageProps) {
  const t = useTranslations('news');
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  useEffect(() => {
    if (src) {
      setImageLoaded(false)
      setImageError(false)
    }
  }, [src])

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true)
    }, 100)
  }

  const handleImageError = () => {
    setImageError(true)
  }
  
  if (!src || imageError) {
    return (
      <div className="mb-4 w-full">
        <div className={`h-[${height}px] w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-[0.8rem] border-2 border-[#333] flex items-center justify-center`}>
          <span className="text-gray-400 text-sm font-bold">{t('missingImage')}</span>
        </div>
      </div>
    )
  }
  
  const containerClasses = "mb-4 w-full"
  const imageClasses = `thumb rounded-[0.8rem] w-full ${className}`
  
  return (
    <div className={containerClasses}>
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse rounded-[0.8rem] border-2 border-[#333] flex items-center justify-center">
            <span className="text-gray-400 text-sm font-bold">{t('loadingImage')}</span>
          </div>
        )}
        
        <Image 
          src={src} 
          alt={alt} 
          title={title || alt}
          width={width} 
          height={height} 
          className={`${imageClasses} ${!imageLoaded ? 'invisible' : 'visible'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={true}
          unoptimized={unoptimized}
        />
      </div>
    </div>
  )
}
