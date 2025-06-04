/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @IsNotEmpty({ message: 'Rating is a required field' })
  @IsNumber({}, { message: 'Rating must be a number' })
  rating: number;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  product: string;
}
