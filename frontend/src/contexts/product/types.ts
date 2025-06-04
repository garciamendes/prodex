import type { Review } from "../review/types";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  reviews: Array<Review>;
  createdAt: Date;
}

export interface CreateProduct {
  name: string;
  price: number | null;
  category: string;
  description?: string;
}
export type UpdateProduct = Partial<CreateProduct>;
