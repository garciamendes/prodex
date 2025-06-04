import { Star } from "lucide-react"
import { useState } from "react"

interface RatingStarsProsp {
  isInput?: boolean
  rating: number
  onClick?: (index: number) => void
}

export const RatingStars = ({ rating, isInput = false, onClick }: RatingStarsProsp) => {
  const MAX_STARS = 5
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    if (!isInput) return
    onClick?.(index)
  }

  const handleMouseEnter = (index: number) => {
    if (!isInput) return
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    if (!isInput) return
    setHoveredIndex(null)
  }

  return (
    <div
      className="flex items-center gap-2"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: MAX_STARS }).map((_, index) => {
        const currentRating = index + 1
        const filled = hoveredIndex !== null
          ? currentRating <= hoveredIndex
          : currentRating <= (isInput ? rating : Math.round(rating))

        return (
          <Star
            key={currentRating}
            data-filled={filled}
            data-input={isInput}
            onClick={(event) => {
              event.stopPropagation()
              handleClick(currentRating)
            }}
            onMouseEnter={() => handleMouseEnter(currentRating)}
            className="stroke-gray-200 data-[filled=true]:fill-gray-200 data-[input=true]:hover:fill-gray-200 transition-all duration-300 data-[input=true]:cursor-pointer"
            size={20}
          />
        )
      })}
    </div>
  )
}
