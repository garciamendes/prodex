export class CreateReviewDto {
  readonly comment?: string;
  readonly rating: number;
  readonly author: string;
  readonly productId: string;
}
