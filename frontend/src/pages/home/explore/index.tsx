import { ProductCreate } from "@/components/productCreate"
import { ProductDetail } from "@/components/productDetail"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import type { Product } from "@/contexts/product/types"
import { useProduct } from "@/hooks/product"
import { BinocularsIcon } from "@phosphor-icons/react"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export const Explore = () => {
  const [products, setProducts] = useState<Omit<Product, 'reviews'>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [productId, setProductId] = useState<string | null>(null)
  const { list } = useProduct()

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)

    const result = await list()
    setIsLoading(false)
    setProducts(result)
  }

  const renderProducts = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!products.length) {
      return (
        <div className="w-full flex items-center justify-center">
          <span className="text-gray-500 text-2xl mt-2">Nenhum produto encontrado</span>
        </div>
      )
    }

    return (
      products.map((product, index) => {
        return (
          <Card
            key={index}
            id={product.id}
            title={product.name}
            price={product.price}
            rating={1}
            quantityReviews={1}
            onClick={(id: string) => {
              if (id === productId) return

              setProductId(id)
            }}
          />
        )
      })
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <ProductDetail onClose={() => setProductId(null)} productId={productId} />
      <ProductCreate
        openSideCreateProduct={openCreateProduct}
        onClose={() => setOpenCreateProduct(false)} />

      <div className="flex w-full justify-between">
        <div className="flex items-center gap-6">
          <BinocularsIcon size={32} className="fill-cyan-500" />

          <h2 className="text-gray-100 text-2xl font-bold">Explorar</h2>
        </div>

        <div className="flex items-center">
          <Button onClick={() => setOpenCreateProduct(true)} variant="secondary" className="cursor-pointer" size="sm">
            <Plus size={26} />
            <span>Adicionar produto</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap h-full overflow-auto">
        {renderProducts()}
      </div>
    </div>
  )
}