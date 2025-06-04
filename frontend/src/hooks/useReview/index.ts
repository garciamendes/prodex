import api from "@/infra/api";
import { toast } from "sonner";
import type { ICreateReview, Review, UpdateReview } from "./types";

interface UseReviewProps {
  get: (reviewId: string) => Promise<Review | null>
  create: (data: ICreateReview, callback?: () => void) => Promise<void>
  update: (reviewId: string, data: UpdateReview, callback?: () => void) => Promise<void>
  delete: (reviewId: string, callback?: () => void) => Promise<void>
}
export const useReview = (): UseReviewProps => {

  const handlerGet = async (reviewId: string): Promise<Review | null> => {
    try {
      const result = await api.get<Review>(`/review/${reviewId}`)

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

  const handlerCreate = async (data: ICreateReview, callback?: () => void) => {
    try {
      await api.post(`/review`, data)
      callback?.()
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }
    }
  }

  const handlerUpdate = async (reviewId: string, data: UpdateReview, callback?: () => void) => {
    try {
      await api.patch(`/review/${reviewId}`, data)
      callback?.()
    } catch (error: any) {
      if (Array.isArray(error?.response?.data?.message)) {
        (error?.response?.data?.message as string[]).forEach((m: string) => {
          toast.error(m)
        })
      }
    }
  }

  const handlerDelete = async (reviewId: string, callback?: () => void) => {
    try {
      await api.delete(`/review/${reviewId}`)
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
    get: handlerGet,
    create: handlerCreate,
    update: handlerUpdate,
    delete: handlerDelete
  }
};
