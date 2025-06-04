export interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
  product: string;
  createdAt: Date;
}

export interface ICreateReview {
  comment?: string;
  rating: number;
  author: string;
  product: string;
}
export type UpdateReview = Partial<Pick<ICreateReview, 'rating' | 'comment'>>

