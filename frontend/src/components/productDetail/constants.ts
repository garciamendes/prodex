import type { RequireFields } from "./createReview";

export const ERROS_MESSAGES: Record<RequireFields, string> = {
  ['author']: 'Erro ao tentar criar, recarregue a página',
  ['product']: 'Erro ao tentar criar, recarregue a página',
  ['rating']: 'Indique a nota da avaliação',
}