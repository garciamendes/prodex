import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { XIcon } from "@phosphor-icons/react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState, type ChangeEvent } from "react"
import { NumericFormat } from 'react-number-format'
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { ERROS_MESSAGES } from "./constants"
import type { CreateProduct } from "@/hooks/useProduct/types"
import { useProduct } from "@/hooks/useProduct"
import { Loader2Icon } from "lucide-react"
import { parseFormattedMoney } from "@/lib/utils"

export interface ProductCreateProps {
  openSideCreateProduct: boolean
  onRefresh?: () => {}
  onClose?: () => void
}

export type RequireFields = keyof Omit<CreateProduct, 'description'>

export const ProductCreate = ({ openSideCreateProduct, onRefresh, onClose }: ProductCreateProps) => {
  const { create } = useProduct()
  const [form, setForm] = useState<CreateProduct>({
    name: 'Teclado', category: 'Periférico', price: 340.50, description: 'Teclado RGB'
  })
  const [isLoading, setIsLoading] = useState(false)
  const requiredFields: RequireFields[] = ['name', 'price', 'category']

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
    const errors = validate()

    if (errors.length) {
      if (requiredFields.length === errors.length) {
        toast.error('Os campos "Nome, Preço e Categoria" são obrigatórios')
      } else {
        errors.forEach((key) => {
          toast.error(ERROS_MESSAGES[key])
        })
      }

      return
    }

    setIsLoading(true)
    await create({ ...form, price: parseFormattedMoney(String(form.price))}, onRefresh)
    handlerOnClonse()
  }

  const handlerOnClonse = () => {
    setIsLoading(false)
    setForm({
      name: '', category: '', price: null, description: ''
    })
    onClose?.()
  }

  return (
    <Sheet open={openSideCreateProduct}>
      <SheetContent
        className="bg-gray-800 border-gray-800 text-gray-100 !min-w-full lg:!min-w-[560px] p-4 flex flex-col h-full">
        <div
          onClick={handlerOnClonse}
          className="flex w-full justify-end opacity-70 transition-opacity hover:opacity-100">
          <XIcon className="size-6 cursor-pointer" />
        </div>

        <div
          className="flex flex-col flex-1 overflow-auto no-scrollbar gap-8">
          <div className="flex flex-col gap-6 rounded-[10px] bg-gray-700 p-3 shrink-0">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">Nome do produto</Label>
              <Input
                id='name'
                name='name'
                placeholder="Teclado"
                className="placeholder:text-gray-400"
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
                placeholder="0.00"
                className="text-gray-100 !text-2xl placeholder:text-xl placeholder:text-gray-400 border-0 focus-visible:ring-0"
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
                className="placeholder:text-gray-400"
                value={form.category}
                onChange={onChange} />
            </div>

            <div className="grid w-full items-center gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id='description'
                name='description'
                placeholder="Teclado RGB..."
                className="placeholder:text-gray-400"
                value={form.description}
                onChange={onChange} />
            </div>
          </div>
        </div>

        <div className="flex gap-6 justify-end">
          <Button
            variant='outline'
            size='sm'
            onClick={handlerOnClonse}
            className="bg-transparent cursor-pointer">
            Cancelar
          </Button>

          <Button
            variant='default'
            size='sm'
            onClick={handlerCreateProduct}
            disabled={isLoading}
            className="bg-gray-700 hover:bg-gray-700 cursor-pointer border border-gray-700 hover:opacity-80">
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Criar Produto"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}