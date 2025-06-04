/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';
import { Model, Types } from 'mongoose';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { getModelToken } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { toReviewResponse } from './adapters/review.adapter';

describe('ReviewService', () => {
  let service: ReviewService;
  let model: DeepMockProxy<Model<Review>>;

  beforeEach(async () => {
    const modelMock = mockDeep<Model<Review>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken('Review'),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    model = module.get(getModelToken('Review'));
  });

  describe('Create', () => {
    it('Should create a new review', async () => {
      const mockedReview = {
        author: 'Joe Doe',
        product: new Types.ObjectId().toString(),
        rating: 3.4,
      };
      model.create.mockResolvedValueOnce(mockedReview as any);

      const data: CreateReviewDto = {
        author: 'Joe Doe',
        product: new Types.ObjectId().toString(),
        rating: 3.4,
      };

      const result = await service.create(data);

      expect(result).toEqual(toReviewResponse(mockedReview as any));
      expect(model.create).toHaveBeenCalledWith(data);
    });

    it('Should not create a new review', async () => {
      const error = new BadRequestException('Mocked error');

      model.create.mockRejectedValueOnce(error);

      const createReviewDto = {};
      await expect(
        service.create(createReviewDto as any),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(model.create).toHaveBeenCalledWith(createReviewDto);
    });
  });

  describe('Get', () => {
    it('Should return one review', async () => {
      const mockedReview = {
        author: 'Joe Doe 2',
        product: new Types.ObjectId().toString(),
        rating: 4.5,
        createdAt: new Date(),
      };
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await service.get(reviewId);

      expect(result).toEqual(toReviewResponse(mockedReview as any));
      expect(model.findOne).toHaveBeenCalledWith({ _id: reviewId });
    });

    it('Should not return a review if the review ID does not exist', async () => {
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      await expect(service.get(reviewId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(model.findOne).toHaveBeenCalledWith({ _id: reviewId });
    });
  });

  describe('Update', () => {
    it('Should update a review', async () => {
      const mockedReview = {
        author: 'Joe Doe 3',
        product: new Types.ObjectId().toString(),
        rating: 4.5,
        createdAt: new Date(),
      };
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const updateReviewDto: UpdateReviewDto = {
        rating: 5,
      };
      const result = await service.update(reviewId, updateReviewDto);

      expect(result).toEqual(toReviewResponse(mockedReview as any));
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        reviewId,
        updateReviewDto,
        { new: true },
      );
    });

    it('Should not update a review without the review ID existing', async () => {
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const data: UpdateReviewDto = {
        rating: 5,
      };

      await expect(service.update(reviewId, data)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(reviewId, data, {
        new: true,
      });
    });
  });

  describe('Delete', () => {
    it('Should delete a review', async () => {
      const mockedReview = {
        author: 'Joe Doe 2',
        product: new Types.ObjectId().toString(),
        rating: 4.5,
        createdAt: new Date(),
      };
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await service.delete(reviewId);

      expect(result).toEqual(toReviewResponse(mockedReview as any));
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });

    it('Should not delete a review without the review ID existing', async () => {
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      await expect(service.delete(reviewId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });
  });
});
