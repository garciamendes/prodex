import api from "@/infra/api";
import { toast } from "sonner";
import type { CreateProduct, Product, UpdateProduct } from "./types";

interface UseProductProps {
  list: () => Promise<Omit<Product, 'reviews'>[]>
  get: (productId: string) => Promise<Product | null>
  create: (data: CreateProduct, callback?: () => void) => Promise<void>
  update: (productId: string, data: UpdateProduct, callback?: () => void) => Promise<void>
  delete: (productId: string, callback?: () => void) => Promise<void>
}
export const useProduct = (): UseProductProps => {
  const handlerList = async (): Promise<Omit<Product, 'reviews'>[]> => {
    try {
      const result = await api.get<Omit<Product, 'reviews'>[]>('/product')

      return result.data
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }

      return []
    }
  }

  const handlerGet = async (productId: string): Promise<Product | null> => {
    try {
      const result = await api.get<Product>(`/product/${productId}`)

      return result.data
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }

      return null
    }
  }

  const handlerCreate = async (data: CreateProduct, callback?: () => void) => {
    try {
      await api.post<Product>(`/product`, data)
      callback?.()
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }
    }
  }

  const handlerUpdate = async (productId: string, data: UpdateProduct, callback?: () => void) => {
    try {
      await api.patch<Product>(`/product/${productId}`, data)
      callback?.()
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }
    }
  }

  const handlerDelete = async (productId: string, callback?: () => void) => {
    try {
      await api.delete<Product>(`/product/${productId}`)
      callback?.()
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }
    }
  }

  return {
    list: handlerList,
    get: handlerGet,
    create: handlerCreate,
    update: handlerUpdate,
    delete: handlerDelete
  }
};
