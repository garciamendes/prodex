import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { XIcon } from "@phosphor-icons/react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useEffect, useState, type ChangeEvent } from "react"
import { NumericFormat } from 'react-number-format'
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Loading } from "../ui/loading"
import type { CreateProduct } from "@/hooks/useProduct/types"
import { useProduct } from "@/hooks/useProduct"
import { Loader2Icon } from "lucide-react"
import { parseFormattedMoney } from "@/lib/utils"

export interface ProductCreateProps {
  productId: string | null
  onClose?: () => void
  onRefresh?: () => void
}
export type RequireFields = keyof Omit<CreateProduct, 'description'>

export const ProductUpdate = ({ productId, onRefresh, onClose }: ProductCreateProps) => {
  const { get, update } = useProduct()
  const [form, setForm] = useState<CreateProduct>({
    name: '', category: '', price: null, description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

  const requiredFields: RequireFields[] = ['name', 'price', 'category']

  useEffect(() => {
    if (!productId) return

    fetchProducts(productId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchProducts = async (product: string) => {
    setIsLoading(true)

    const result = await get(product)
    setIsLoading(false)

    if (!result) {
      onClose?.()
      return
    }

    setForm({
      name: result.name,
      price: result.price,
      category: result.category
    })
  }

  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = () => {
    const errors: RequireFields[] = []

    Object.entries(form).forEach(([key, value]) => {
      if (requiredFields.includes(key as RequireFields) && ((typeof value === 'string' && !value.trim()) || !value))
        errors.push(key as RequireFields)
    })

    return errors
  }

  const handlerCreateProduct = async () => {
    if (!productId) return

    const errors = validate()
    if (errors.length) {
      toast.error('Os campos "Nome, Preço e Categoria" não podem ser vázios')
      return
    }

    setIsLoadingUpdate(true)
    await update(productId, { ...form, price: parseFormattedMoney(String(form.price))}, onRefresh)
    handlerOnClose()
  }

  const handlerOnClose = () => {
    setIsLoading(false)
    setIsLoadingUpdate(false)
    setForm({
      name: '', category: '', price: null, description: ''
    })
    onClose?.()
  }

  const renderFields = () => {
    if (isLoading) return <Loading />

    return (
      <>
        <div className="flex flex-col gap-6 rounded-[10px] bg-gray-700 p-3 shrink-0">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="name">Nome do produto</Label>
            <Input
              id='name'
              name='name'
              placeholder="Teclado"
              value={form.name}
              onChange={onChange} />
          </div>

          <div className="flex items-center gap-1">
            <strong className="text-gray-100 text-2xl">R$</strong>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              name="price"
              value={form.price}
              onChange={onChange}
              placeholder="120.30"
              className="text-gray-100 !text-2xl placeholder:text-xl placeholder:text-gray-300 border-0 focus-visible:ring-0"
              customInput={Input}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-[10px] bg-gray-700 p-3 shrink-0">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id='category'
              name='category'
              placeholder="Periférico"
              value={form.category}
              onChange={onChange} />
          </div>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id='description'
              name='description'
              value={form.description}
              placeholder="Teclado RGB..."
              onChange={onChange} />
          </div>
        </div>
      </>
    )
  }

  return (
    <Sheet open={!!productId}>
      <SheetContent
        className="bg-gray-800 border-gray-800 text-gray-100 !max-w-[560px] p-4 flex flex-col h-full">
        <div
          onClick={handlerOnClose}
          className="flex w-full justify-end opacity-70 transition-opacity hover:opacity-100">
          <XIcon className="size-6 cursor-pointer" />
        </div>

        <div className="flex flex-col flex-1 overflow-auto no-scrollbar gap-8">
          {renderFields()}
        </div>

        <div className="flex gap-6 justify-end">
          <Button
            variant='outline'
            size='sm'
            onClick={handlerOnClose}
            className="bg-transparent cursor-pointer">
            Cancelar
          </Button>

          <Button
            variant='default'
            size='sm'
            disabled={isLoadingUpdate}
            onClick={handlerCreateProduct}
            className="bg-gray-700 hover:bg-gray-700 cursor-pointer border border-gray-700 hover:opacity-80">
            {isLoadingUpdate ? <Loader2Icon className="animate-spin" /> : 'Criar Produto'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}