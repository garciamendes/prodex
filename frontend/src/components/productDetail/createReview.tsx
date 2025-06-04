import { Check, Loader2Icon, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RatingStars } from "../ui/ratingStars"
import { Textarea } from "../ui/textarea"
import { useState, type ChangeEvent } from "react"
import { useReview } from "@/hooks/useReview"
import type { ICreateReview } from "@/hooks/useReview/types"
import { ERROS_MESSAGES } from "./constants"
import { toast } from "sonner"

interface CreateReviewProps {
  enabledToCreate: boolean
  product: string
  onClose?: () => void
  onRefresh?: () => void
}
export type RequireFields = keyof Omit<ICreateReview, 'comment'>

export const CreateReview = ({ product, enabledToCreate, onClose, onRefresh }: CreateReviewProps) => {
  const { create } = useReview()
  const [form, setForm] = useState<ICreateReview>({
    author: '', product: product, rating: 0, comment: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const requiredFields: RequireFields[] = ['author', 'product', 'rating']

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

    console.log(errors)
    return errors
  }

  const handlerCreateReview = async () => {
    if (!enabledToCreate) return 
    const errors = validate()

    if (errors.length) {
      if (requiredFields.length === errors.length) {
        toast.error('Erro ao tentar criar, recarregue a página')
      } else {
        errors.forEach((key) => {
          toast.error(ERROS_MESSAGES[key])
        })
      }

      return
    }

    setIsLoading(true)
    await create(form, onRefresh)
    handlerOnClonse()
  }

  const handlerOnClonse = () => {
    setIsLoading(false)
    setForm({
      author: '', product: '', rating: 0, comment: ''
    })
    onClose?.()
  }

  return (
    <div
      className="flex flex-col w-full min-h-[180px] transition-all duration-300 h-auto gap-3 bg-gray-700 rounded-[10px] p-4">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <Label htmlFor="author">Autor</Label>
            <Input
              name='author'
              id="author"
              placeholder="Joe Doe"
              className="text-lg"
              value={form.author}
              onChange={onChange}
            />
          </div>
        </div>

        <RatingStars
          isInput
          onClick={(index: number) => setForm(prev => ({ ...prev, ['rating']: index }))}
          rating={form.rating} />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="comment">Descrição</Label>
        <Textarea
          id='comment'
          name='comment'
          placeholder="Comente (Opcional)"
          className="placeholder:text-gray-400"
          value={form.comment}
          onChange={onChange} />
      </div>

      <div className="flex gap-6 justify-end">
        <Button
          variant='outline'
          size='sm'
          onClick={handlerOnClonse}
          className="group bg-transparent cursor-pointer border border-gray-100 hover:bg-gray-800">
          <X className="group-hover:text-gray-100" />
        </Button>

        <Button
          variant='outline'
          size='sm'
          disabled={isLoading}
          onClick={handlerCreateReview}
          className="group bg-transparent cursor-pointer border border-gray-100 hover:bg-gray-800">
          {isLoading ? <Loader2Icon className="animate-spin" /> : <Check className="group-hover:text-gray-100" size={26} />}
        </Button>
      </div>
    </div>
  )
}