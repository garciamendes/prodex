import NoImg from '@/assets/images/no-image.svg'
import { Truncate } from './truncate';
import { cn, format } from '@/lib/utils';
import { Rating } from './rating';
import { SquarePen, Trash } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface CardProps {
  id: string
  title: string
  price: number
  quantityReviews: number
  rating: number
  className?: string
  onEdit: (productId: string) => void
  onDelete: (productId: string) => void
  onDetail: (productId: string) => void
}

export const Card = ({ id, title, price, rating, quantityReviews, className, onEdit, onDelete, onDetail }: CardProps) => {
  return (
    <div
      className={cn(
        "group cursor-pointer flex flex-col w-[240px] h-[350px] rounded-xl py-4 px-5 gap-5 bg-gray-700",
        className
      )}
      onClick={() => onDetail(id)}>
      <div className="flex justify-center items-center w-full">
        <img src={NoImg} alt="No image" className='h-32 object-cover' />
      </div>

      <div className="flex-1 flex flex-col gap-3.5">
        <Truncate
          text={title}
          length={50}
          className="cursor-pointer group-hover:text-cyan-500 duration-300 transition-colors"
        />

        <div className="flex flex-col flex-1 gap-2">
          <strong className="text-gray-100 text-2xl">{format(price)}</strong>

          {/* <Rating rating={rating} quantityReviews={quantityReviews} /> */}
        </div>
      </div>

      <div className='opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-5 justify-end'>
        <Tooltip>
          <TooltipTrigger className='cursor-pointer'>
            <Trash
              className='stroke-gray-200'
              onClick={(event) => {
                event.stopPropagation()
                onDelete(id)
              }}
              size={27} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Deletar produto</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className='cursor-pointer'>
            <SquarePen
              className='stroke-gray-200'
              onClick={(event) => {
                event.stopPropagation()
                onEdit(id)
              }}
              size={27} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar produto</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}