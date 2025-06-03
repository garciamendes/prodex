import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: DeepMockProxy<ProductService>;

  beforeEach(async () => {
    const serviceMock = mockDeep<ProductService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<DeepMockProxy<ProductService>>(ProductService);
  });

  describe('Create', () => {
    it('Should create a new product', async () => {
      const mockedProduct = {
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.create.mockResolvedValueOnce(mockedProduct as any);

      const data: CreateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      const result = await controller.create(data);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(data);
    });
  });

  describe('List', () => {
    it('should return an array of products', async () => {
      const mockedProducts = [
        {
          _id: new Types.ObjectId(),
          name: 'Product 01',
          price: 10.2,
          category: 'technology',
        },
        {
          _id: new Types.ObjectId(),
          name: 'Product 02',
          price: 10.2,
          category: 'technology',
        },
      ];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.list.mockResolvedValueOnce(mockedProducts as any);

      const result = await controller.list();

      expect(result).toEqual(mockedProducts);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.list).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('Should return a single product', async () => {
      const mockedProduct = {
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.get.mockResolvedValueOnce(mockedProduct as any);

      const productId = new Types.ObjectId().toString();
      const result = await controller.get(productId);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.get).toHaveBeenCalledWith(productId);
    });
  });

  describe('Update', () => {
    it('Should update a single product', async () => {
      const mockedProduct = {
        _id: new Types.ObjectId(),
        name: 'Product 01 updated',
        price: 10.2,
        category: 'technology',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.update.mockResolvedValueOnce(mockedProduct as any);

      const productId = new Types.ObjectId().toString();
      const data: UpdateProductDto = {
        name: 'Product 01 updated',
        price: 10.2,
        category: 'technology',
      };
      const result = await controller.update(productId, data);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(productId, data);
    });
  });

  describe('Delete', () => {
    it('Should delete a single product', async () => {
      const mockedProduct = {
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.delete.mockResolvedValueOnce(mockedProduct as any);

      const productId = new Types.ObjectId().toString();
      const result = await controller.delete(productId);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.delete).toHaveBeenCalledWith(productId);
    });
  });
});
