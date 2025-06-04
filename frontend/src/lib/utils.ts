import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface FormatOptionsProps {
  hiddenCurrency?: boolean
}
export const format = (value: number, options?: FormatOptionsProps) => {
  if (!value) return null

  const hasDecimal = value % 1 !== 0;

  if (options && options.hiddenCurrency)
    return new Intl.NumberFormat('pt-br', {
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(value);

  return new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
    style: "currency",
    currency: 'BRL'
  }).format(value);
}