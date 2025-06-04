import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import NoImg from '@/assets/images/no-image.svg'
import { format } from "@/lib/utils"
import { Review } from "../ui/review"
import { useEffect, useState } from "react"
import { Loading } from "../ui/loading"
import { XIcon } from "lucide-react"
import type { Product } from "@/hooks/useProduct/types"
import { useProduct } from "@/hooks/useProduct"
import { CreateReview } from "./createReview"

export interface ProductDetailProps {
  productId: string | null
  onClose?: () => void
}
export const ProductDetail = ({ productId, onClose }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [enabledToCreateReview, setEnabledToCreateReview] = useState(false)

  const { get } = useProduct()

  useEffect(() => {
    if (!productId) return

    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchProduct = async () => {
    if (!productId) return

    setIsLoading(true)
    const result = await get(productId)
    setIsLoading(false)
    setProduct(result)
  }

  const handlerOnClonse = () => {
    setProduct(null)
    onClose?.()
  }

  const renderReviews = () => {
    if (!product?.reviews?.length) {
      return (
        <div className="w-full flex items-center justify-center">
          <span className="text-gray-500 text-base mt-2">Nenhuma avaliação</span>
        </div>
      )
    }

    return (
      product?.reviews.map((review, index) => (
        <Review
          key={index}
          id={review.id}
          author={review.author}
          comment={review.comment}
          rating={review.rating}
          createAt={review.createdAt}
          product={review.product}
          onRefresh={fetchProduct}
        />
      ))
    )
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
        <div className="flex flex-col justify-between gap-6 rounded-[10px] bg-gray-700 p-3 min-h-[400px]">
          <div className="flex justify-center items-center w-full">
            <img src={NoImg} alt="No image" className='h-32 object-cover' />
          </div>

          <div className="flex flex-col">
            <SheetTitle className="text-gray-100">
              {product?.name || '---'}
            </SheetTitle>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <strong className="text-gray-100 text-2xl">{format(product?.price || 0)}</strong>
              {/* <Rating rating={3.6} quantityReviews={30} /> */}
            </div>
          </div>
        </div>

        <div className="h-[calc(100%-400px)] w-full flex flex-col">
          <div className="flex flex-col max-h-[150px]">
            <strong className="text-gray-300">
              Descrição
            </strong>

            <p className="text-gray-300 text-sm w-full no-scrollbar overflow-auto">
              {product?.description || '---'}
            </p>
          </div>

          <div className="flex flex-col lg:min-h-[calc(100%-(400px-150px))]">
            <strong className="text-gray-300 hover:text-gray-100 duration-300 py-3">
              <div className="flex flex-1 justify-between items-center">
                <strong className="text-gray-300">
                  Avaliações
                </strong>

                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    setEnabledToCreateReview(true)
                  }}
                  className="text-gray-100 hover:text-white cursor-pointer font-medium"
                >
                  Avaliar
                </button>
              </div>
            </strong>

            <div className="flex-1 overflow-hidden pb-10">
              <div
                className="flex-1 h-full overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 no-scrollbar">
                <div className="flex flex-col gap-4">
                  {enabledToCreateReview && (
                    <CreateReview
                      product={productId!}
                      enabledToCreate={enabledToCreateReview}
                      onClose={() => setEnabledToCreateReview(false)}
                      onRefresh={() => {
                        setEnabledToCreateReview(false)
                        fetchProduct()
                      }}
                    />
                  )}

                  {renderReviews()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <Sheet open={!!productId}>
      <SheetContent className="bg-gray-800 border-gray-800 text-gray-100 !min-w-full md:!min-w-[560px] p-4 flex flex-col h-full overflow-auto no-scrollbar">
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