import { format } from "@/lib/utils";
import { RatingStars } from "./ratingStars";

export interface RatingProps {
  rating: number
  quantityReviews: number
}
export const Rating = ({ rating, quantityReviews }: RatingProps) => {
  return (
    <div className="flex gap-1.5">
      <span className='text-gray-300'>{rating}</span>

      <RatingStars rating={rating} />

      <span className="text-gray-300">{`(${format(quantityReviews, { hiddenCurrency: true })})`}</span>
    </div>
  )
}