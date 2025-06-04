import { LoaderCircle } from "lucide-react"

export const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <LoaderCircle size={30} className="stroke-gray-200 animate-spin" />
    </div>
  )
}