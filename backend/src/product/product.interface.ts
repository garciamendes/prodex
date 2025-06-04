import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';

export interface ProductInterface {
  create: (
    data: CreateProductDto,
  ) => Promise<Omit<ResponseProductDto, 'reviews'>>;
  list: () => Promise<Omit<ResponseProductDto, 'reviews'>[]>;
  get: (productId: string) => Promise<ResponseProductDto>;
  update: (
    productId: string,
    data: UpdateProductDto,
  ) => Promise<Omit<ResponseProductDto, 'reviews'>>;
  delete: (productId: string) => Promise<Omit<ResponseProductDto, 'reviews'>>;
}
