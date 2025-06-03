import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

export interface ProductInterface {
  create: (data: CreateProductDto) => Promise<Product>;
  list: () => Promise<Product[]>;
  get: (productId: string) => Promise<Product | null>;
  update: (
    productId: string,
    data: UpdateProductDto,
  ) => Promise<Product | null>;
  delete: (productId: string) => Promise<Product | null>;
}
