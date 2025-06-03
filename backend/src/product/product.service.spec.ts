/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let model: DeepMockProxy<Model<Product>>;

  beforeEach(async () => {
    const modelMock = mockDeep<Model<Product>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get(getModelToken('Product'));
  });

  describe('Create', () => {
    it('Should create a new product', async () => {
      const mockedProduct: CreateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      model.create.mockResolvedValueOnce(mockedProduct as any);

      const createProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      const result = await service.create(createProductDto);

      expect(result).toEqual(mockedProduct);
      expect(model.create).toHaveBeenCalledWith(createProductDto);
    });

    it('Should not create a new product', async () => {
      const error = new BadRequestException('Mocked error');

      model.create.mockRejectedValueOnce(error);

      const createProductDto = {};
      await expect(
        service.create(createProductDto as any),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(model.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('List', () => {
    it('Should return all products', async () => {
      const mockedProducts = [
        {
          name: 'Product 01',
          price: 10.2,
          category: 'technology',
        },
        {
          name: 'Product 02',
          price: 10.2,
          category: 'technology',
        },
      ];
      model.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProducts),
      } as any);

      const result = await service.list();

      expect(result).toEqual(mockedProducts);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('Should return one product', async () => {
      const mockedProduct = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.get(productId);

      expect(result).toEqual(mockedProduct);
      expect(model.findOne).toHaveBeenCalled();
    });

    it('Should not return a product if the productId does not exist', async () => {
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce(null),
      } as any);

      const productId = new Types.ObjectId().toString();
      await expect(service.get(productId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(model.findOne).toHaveBeenCalledWith({ _id: productId });
    });
  });

  describe('Update', () => {
    it('Should update a product', async () => {
      const mockedProduct = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const updateProductDto: UpdateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      const result = await service.update(productId, updateProductDto);

      expect(result).toEqual(mockedProduct);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        productId,
        updateProductDto,
        { new: true },
      );
    });

    it('Should not update a product without the product ID existing', async () => {
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const productId = new Types.ObjectId().toString();
      const updateProductDto: UpdateProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };

      await expect(
        service.update(productId, updateProductDto),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        productId,
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
        category: 'technology',
      };
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.delete(productId);

      expect(result).toEqual(mockedProduct);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });

    it('Should not delete a product without the product ID existing', async () => {
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const productId = new Types.ObjectId().toString();
      await expect(service.delete(productId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });
  });
});
