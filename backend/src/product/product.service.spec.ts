import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const productModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};
describe('ProductService', () => {
  let service: ProductService;
  let model: jest.Mocked<Model<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: productModelMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get(getModelToken('Product'));
  });

  describe('Create', () => {
    it('Should insert a new product', async () => {
      const mockedProduct: CreateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.create.mockResolvedValueOnce(mockedProduct as any);

      const createProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      const result = await service.create(createProductDto);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('List', () => {
    it('Should return all products', async () => {
      const mockedProducts = [
        {
          name: 'Product 01',
          price: 10.2,
          category: 'tecn',
        },
        {
          name: 'Product 02',
          price: 10.2,
          category: 'tecn',
        },
      ];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProducts),
      } as any);

      const result = await service.list();

      expect(result).toEqual(mockedProducts);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('Should return one product', async () => {
      const mockedProduct = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.get(productId);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findOne).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    it('Should update a product', async () => {
      const mockedProduct = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const updateProductDto: UpdateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      const result = await service.update(productId, updateProductDto);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: productId },
        updateProductDto,
        { new: true },
      );
    });
  });

  describe('Delete', () => {
    it('Should delete a product', async () => {
      const mockedProduct = {
        name: 'Product 01',
        price: 10.2,
        category: 'tecn',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.delete(productId);

      expect(result).toEqual(mockedProduct);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });
  });
});
