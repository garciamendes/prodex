import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import NoImg from '@/assets/images/no-image.svg'
import { format } from "@/lib/utils"
import { Rating } from "../ui/rating"
import { Review } from "../ui/review"
import { useEffect, useState } from "react"
import { Loading } from "../ui/loading"
import { XIcon } from "lucide-react"
import type { Product } from "@/hooks/useProduct/types"
import { useProduct } from "@/hooks/useProduct"

export interface ProductDetailProps {
  productId: string | null
  onClose?: () => void
}
export const ProductDetail = ({ productId, onClose }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { get } = useProduct()

  useEffect(() => {
    if (!productId) return

    fetchProducts(productId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchProducts = async (product: string) => {
    setIsLoading(true)
    const result = await get(product)
    setIsLoading(false)
    setProduct(result)
  }

  const handlerOnClonse = () => {
    setProduct(null)
    onClose?.()
  }

  const renderProduct = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!product) {
      return (
        <div className="w-full flex items-center justify-center">
          <span className="text-gray-500 text-2xl mt-2">Nenhum produto encontrado</span>
        </div>
      )
    }

    return (
      <>
        <div className="flex flex-col gap-6 rounded-[10px] bg-gray-700 p-3 shrink-0">
          <div className="flex justify-center items-center w-full">
            <img src={NoImg} alt="No image" className='h-32 object-cover' />
          </div>

          <SheetTitle className="text-gray-100">
            {product?.name || '---'}
          </SheetTitle>

          <div className="flex items-center justify-between">
            <strong className="text-gray-100 text-2xl">{format(product?.price || 0)}</strong>
            <Rating rating={3.6} quantityReviews={30} />
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <Accordion type="single" collapsible className="shrink-0">
            <AccordionItem value="description">
              <AccordionTrigger className="cursor-pointer hover:no-underline text-gray-300 hover:text-gray-100 duration-300">
                Descrição
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-sm">
                {product?.description || '---'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="flex-1 flex flex-col overflow-hidden">
            <AccordionItem value="reviews" className="border-none flex flex-col h-full">
              <AccordionTrigger className="cursor-pointer hover:no-underline text-gray-300 hover:text-gray-100 duration-300 py-3">
                <div className="flex flex-1 justify-between items-center">
                  <span>Avaliações</span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      alert('Avaliar')
                    }}
                    className="text-gray-100 hover:text-white font-medium"
                  >
                    Avaliar
                  </button>
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex-1 min-h-0 overflow-hidden">
                <div
                  className="h-[calc(180px*2.8)] overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 no-scrollbar">
                  <div className="flex flex-col gap-4">
                    {product?.reviews.map((review, index) => (
                      <Review
                        key={index}
                        author={review.author}
                        comment={review.comment}
                        rating={review.rating}
                        createAt={review.createdAt}
                      />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </>
    )
  }

  return (
    <Sheet open={!!productId}>
      <SheetContent className="bg-gray-800 border-gray-800 text-gray-100 !max-w-[560px] p-4 flex flex-col h-full">
        <div
          onClick={handlerOnClonse}
          className="flex w-full justify-end cursor-pointer opacity-70 transition-opacity hover:opacity-100">
          <XIcon className="size-6" />
        </div>
        {renderProduct()}
      </SheetContent>
    </Sheet>
  )
}
