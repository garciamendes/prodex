import type { RequireFields } from ".";

export const ERROS_MESSAGES: Record<RequireFields, string> = {
  ['name']: 'Nome é um campo obrigatório',
  ['price']: 'Preço é um campo obrigatório',
  ['category']: 'Categoria é um campo obrigatório',
}