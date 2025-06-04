import NoImg from '@/assets/images/no-image.svg'
import { Truncate } from './truncate';
import { format } from '@/lib/utils';
import { Rating } from './rating';


export interface CardProps {
  id: string
  title: string
  price: number
  quantityReviews: number
  rating: number
  onClick: (productId: string) => void
}

export const Card = ({ id, title, price, rating, quantityReviews, onClick }: CardProps) => {
  return (
    <div
      className="group cursor-pointer flex flex-col w-[240px] h-[350px] rounded-xl py-4 px-5 gap-5 bg-gray-700"
      onClick={() => onClick(id)}>
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

          <Rating rating={rating} quantityReviews={quantityReviews} />
        </div>
      </div>
    </div>
  )
}