import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProduct } from "@/hooks/useProduct"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"

interface ProductDeleteProps {
  productToDelete: string | null
  onCancel?: () => void
  onRefresh?: () => void
}
export const ProductDelete = ({ productToDelete, onRefresh, onCancel }: ProductDeleteProps) => {
  const { delete: deleteProduct } = useProduct()
  const [isLoading, setIsLoading] = useState(false)

  const handlerDeleteProduct = async () => {
    if (!productToDelete) return

    setIsLoading(true)
    await deleteProduct(productToDelete, onRefresh)
    setIsLoading(false)
  }

  return (
    <AlertDialog open={!!productToDelete}>
      <AlertDialogContent className="bg-gray-700 border-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-200">Tem certeza de que deseja deletar o produto?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-200">
            Após <strong className="text-red-500">CONFIRMAR</strong>, essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={handlerDeleteProduct}
            className="cursor-pointer bg-red-500 text-gray-100 hover:bg-red-600">
            {isLoading ? <Loader2Icon className="animate-spin" /> : 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}