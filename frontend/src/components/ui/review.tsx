import { RatingStars } from "./ratingStars"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface ReviewProps {
  author: string
  createAt: Date
  rating: number
  comment: string
}
export const Review = ({ author, createAt, rating, comment }: ReviewProps) => {
  return (
    <div className="flex flex-col w-full min-h-[180px] h-auto gap-3 bg-gray-700 rounded-[10px] p-4">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col gap-1">
          <strong className="text-lg">{author}</strong>

          <span className="text-base text-gray-300">
            {formatDistanceToNow(createAt, { locale: ptBR, addSuffix: true })}
          </span>
        </div>

        <RatingStars rating={rating} />
      </div>

      <p className="text-gray-200 flex-1">{comment}</p>
    </div>
  )
}