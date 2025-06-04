import { createContext, type ReactNode } from "react";
import type { Product } from "./types";
import api from "@/infra/api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ProductContextProps {
  list: () => Promise<Omit<Product, 'reviews'>[]>
  get: (productId: string) => Promise<Product | null>
  // create: (data: CreateProduct) => Promise<void>
  // update: (productId: string, data: UpdateProduct) => Promise<void>
  // delete: (productId: string) => Promise<void>
}
// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext<ProductContextProps | null>(null)

export const ProductProvider = ({ children }: { children: ReactNode }) => {

  const handlerList = async (): Promise<Omit<Product, 'reviews'>[]> => {
    try {
      const result = await api.get<Omit<Product, 'reviews'>[]>('/product')

      return result.data
    } catch (error) {
      const { message } = error as AxiosError

      if (Array.isArray(message)) {
        message.forEach(m => {
          toast.error(m)
        })
        return []
      }

      toast.error(message)
      return []
    }
  }

  const handlerGet = async (productId: string): Promise<Product | null> => {
    try {
      const result = await api.get<Product>(`/product/${productId}`)

      return result.data
    } catch (error) {
      const { message } = error as AxiosError

      if (Array.isArray(message)) {
        message.forEach(m => {
          toast.error(m)
        })
        return null
      }

      toast.error(message)
      return null
    }
  }

  return (
    <ProductContext.Provider value={{
      list: handlerList,
      get: handlerGet
    }}>
      {children}
    </ProductContext.Provider>
  )
}