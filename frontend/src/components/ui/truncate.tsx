import { cn } from "@/lib/utils"

export interface TruncateProps {
  text: string
  length?: number
  className?: string
}

export const Truncate = ({ length = 100, text, className }: TruncateProps) => {

  const RenderText = ({ value }: { value: string }) => {
    return <p className={cn('text-base text-gray-100', className)}>{value}</p>
  }

  if (length < text.length) {
    return <RenderText value={text.slice(0, length).concat('...')} />
  }

  return <RenderText value={text} />
}