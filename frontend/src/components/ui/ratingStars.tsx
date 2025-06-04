import { Star } from "lucide-react";

export const RatingStars = ({ rating }: { rating: number }) => {
  const MAX_STARS = 5


  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: MAX_STARS }).map((_, index) => {
        const filled = index < Math.round(rating)

        return <Star
          key={index}
          data-filled={filled}
          className="stroke-gray-200 data-[filled=true]:fill-gray-200"
          size={20} />
      })}
    </div>
  )
}