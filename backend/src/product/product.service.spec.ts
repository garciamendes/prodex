/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Review } from '../review/schemas/review.schema';
import { toProductResponse } from './adapters/product.adapter';

describe('ProductService', () => {
  let service: ProductService;
  let model: DeepMockProxy<Model<Product>>;
  let reviewModel: DeepMockProxy<Model<Review>>;

  beforeEach(async () => {
    const modelMock = mockDeep<Model<Product>>();
    const reviewModelMock = mockDeep<Model<Review>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: modelMock,
        },
        {
          provide: getModelToken('Review'),
          useValue: reviewModelMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get(getModelToken('Product'));
    reviewModel = module.get(getModelToken('Review'));
  });

  describe('Create', () => {
    it('Should create a new product', async () => {
      const mockedProduct = {
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
        description: '',
        createdAt: new Date(),
      };
      model.create.mockResolvedValueOnce(mockedProduct as any);

      const createProductDto = {
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
      };
      const result = await service.create(createProductDto);

      expect(result).toEqual(toProductResponse(mockedProduct as any));
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
          _id: new Types.ObjectId(),
          name: 'Product 01',
          price: 10.2,
          category: 'technology',
          description: undefined,
          createdAt: new Date(),
        },
        {
          _id: new Types.ObjectId(),
          name: 'Product 02',
          price: 20.5,
          category: 'books',
          description: 'Some description',
          createdAt: new Date(),
        },
      ];
      model.find.mockReturnValueOnce({
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockedProducts),
      } as any);

      const result = await service.list();

      expect(result).toEqual(mockedProducts.map(toProductResponse as any));
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('Should return one product', async () => {
      const mockedProductData = {
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
        description: undefined,
        createdAt: new Date(),
      };

      const mockedProduct = {
        ...mockedProductData,
        toObject: () => mockedProductData,
      };
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const mockedReviews = [
        { _id: new Types.ObjectId(), comment: 'Great', rating: 5 },
      ];
      reviewModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockedReviews),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.get(productId);

      expect(result).toEqual(
        toProductResponse(mockedProductData as any, mockedReviews as any),
      );
      expect(model.findOne).toHaveBeenCalledWith({ _id: productId });
      expect(reviewModel.find).toHaveBeenCalled();
    });

    it('Should not return a product if the productId does not exist', async () => {
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
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
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
        description: undefined,
        createdAt: new Date(),
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

      expect(result).toEqual(toProductResponse(mockedProduct as any));
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
        _id: new Types.ObjectId(),
        name: 'Product 01',
        price: 10.2,
        category: 'technology',
        description: undefined,
        createdAt: new Date(),
      };
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedProduct),
      } as any);

      const productId = new Types.ObjectId().toString();
      const result = await service.delete(productId);

      expect(result).toEqual(toProductResponse(mockedProduct as any));
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
