import { useReview } from "@/hooks/useReview"
import { RatingStars } from "./ratingStars"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SquarePen, Trash } from "lucide-react"
import { useState } from "react"
import { UpdateReview } from "../productDetail/updateReview"

export interface ReviewProps {
  id: string
  author: string
  createAt: Date
  rating: number
  comment: string
  product: string
  onClose?: () => void
  onRefresh?: () => void
}
export const Review = ({ id, author, createAt, rating, comment, product, onRefresh, onClose }: ReviewProps) => {
  const { delete: deleteReview } = useReview()
  const [enabledEdit, setEnabledEdit] = useState(false)

  const handlerDelete = async (reviewId: string) => {
    await deleteReview(reviewId, onRefresh)
  }
  
  if (enabledEdit) {
    return (
      <UpdateReview
        product={product}
        review={id}
        enabledEdit={enabledEdit}
        onClose={() => setEnabledEdit(false)}
        onRefresh={onRefresh}
      />
    )
  }

  return (
    <div className="group flex flex-col w-full min-h-[180px] h-auto gap-3 bg-gray-700 rounded-[10px] p-4">
      <div className="flex flex-col lg:flex-row gap-3 w-full justify-between items-start">
        <div className="flex flex-col gap-1">
          <strong className="text-lg">{author}</strong>

          <span className="text-base text-gray-300">
            {formatDistanceToNow(createAt, { locale: ptBR, addSuffix: true })}
          </span>
        </div>

        <div className="flex gap-2">
          <RatingStars rating={rating} />
          
          <Trash
            className="cursor-pointer transition-all duration-300 hover:stroke-red-500"
            onClick={(event) => {
              event.stopPropagation()
              handlerDelete(id)
            }}
            size={25} />

          <SquarePen
            className="cursor-pointer transition-all duration-300 "
            onClick={(event) => {
              event.stopPropagation()
              setEnabledEdit(true)
            }}
            size={25} />
        </div>
      </div>

      <p className="text-gray-200 flex-1">{comment}</p>
    </div>
  )
}