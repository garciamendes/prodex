/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
