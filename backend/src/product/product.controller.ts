import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.create(data);
  }

  @Get()
  async list(): Promise<Product[]> {
    return this.productService.list();
  }

  @Get(':productId')
  async get(@Param('productId') productId: string): Promise<Product | null> {
    return this.productService.get(productId);
  }

  @Patch(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productService.update(productId, data);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string): Promise<Product | null> {
    return this.productService.delete(productId);
  }
}
