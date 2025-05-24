"use client"

interface CategoriesProps {
  categories: string[]
}

export default function Categories({ categories }: CategoriesProps) {
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
