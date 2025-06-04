import { ProductCreate } from "@/components/productCreate"
import { ProductDelete } from "@/components/productDelete"
import { ProductDetail } from "@/components/productDetail"
import { ProductUpdate } from "@/components/productUpdate"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useProduct } from "@/hooks/useProduct"
import type { Product } from "@/hooks/useProduct/types"
import { BinocularsIcon } from "@phosphor-icons/react"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export const Explore = () => {
  const [products, setProducts] = useState<Omit<Product, 'reviews'>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [productId, setProductId] = useState<string | null>(null)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [productToEdit, setProductToEdit] = useState<string | null>(null)
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
        <div className="w-full flex justify-center">
          <span className="text-gray-500 text-2xl mt-2">Nenhum produto encontrado</span>
        </div>
      )
    }

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              id={product.id}
              title={product.name}
              price={product.price}
              rating={1}
              quantityReviews={1}
              className="w-full"
              onDelete={(id: string) => setProductToDelete(id)}
              onEdit={(id: string) => setProductToEdit(id)}
              onDetail={(id: string) => {
                if (id === productId) return

                setProductId(id)
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ProductDetail
        onClose={() => setProductId(null)}
        productId={productId} />
      <ProductCreate
        onRefresh={fetchProducts}
        openSideCreateProduct={openCreateProduct}
        onClose={() => setOpenCreateProduct(false)} />
      <ProductUpdate
        productId={productToEdit}
        onClose={() => setProductToEdit(null)}
        onRefresh={() => {
          setProductToEdit(null)
          fetchProducts()
        }} />
      <ProductDelete
        productToDelete={productToDelete}
        onCancel={() => setProductToDelete(null)}
        onRefresh={() => {
          setProductToDelete(null)
          fetchProducts()
        }} />

      <div className="flex w-full justify-between">
        <div className="flex items-center gap-6">
          <BinocularsIcon size={32} className="fill-cyan-500 hidden md:block" />

          <h2 className="text-gray-100 text-2xl font-bold">Explorar</h2>
        </div>

        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger className='cursor-pointer'>
              <Button
                onClick={() => setOpenCreateProduct(true)}
                variant="secondary"
                className="cursor-pointer"
                size="sm">
                <Plus size={26} />
                <span className="hidden md:block">Adicionar produto</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Criar produto</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="relative flex h-full w-full overflow-auto mt-6 no-scrollbar z-0">
        {renderProducts()}
      </div>
    </div>
  )
}