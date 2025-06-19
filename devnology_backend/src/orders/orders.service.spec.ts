import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './entity/order.entity';
import { OrdersService } from './orders.service';

const mockOrderRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepo,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create and save a new order with correct total', async () => {
      const dto: CreateOrderDto = {
        customerName: 'John Doe',
        products: [
          {
            preco: 100,
            quantidade: 2,
            id: '1',
            nome: 'Product1',
          },
          {
            preco: 50,
            quantidade: 1,
            id: '2',
            nome: 'Product2',
          },
        ],
      };
      const expectedOrder = {
        id: 1,
        customerName: dto.customerName,
        products: dto.products,
        total: 250,
      };

      mockOrderRepo.create.mockReturnValue(expectedOrder);
      mockOrderRepo.save.mockResolvedValue(expectedOrder);

      const result = await service.createOrder(dto);

      expect(mockOrderRepo.create).toHaveBeenCalledWith({
        customerName: dto.customerName,
        products: dto.products,
        total: 250,
      });
      expect(mockOrderRepo.save).toHaveBeenCalledWith(expectedOrder);
      expect(result).toEqual(expectedOrder);
    });

    it('should throw BadRequestException if total is invalid', async () => {
      const dto: CreateOrderDto = {
        customerName: 'Jane Doe',
        products: [
          {
            preco: 0,
            quantidade: 0,
            id: '1',
            nome: 'Product1',
          },
        ],
      };

      await expect(service.createOrder(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException on repository error', async () => {
      const dto: CreateOrderDto = {
        customerName: 'Jane Doe',
        products: [
          {
            preco: 10,
            quantidade: 1,
            id: '1',
            nome: 'Product1',
          },
        ],
      };

      mockOrderRepo.create.mockImplementation(() => {
        throw new Error('Repo error');
      });

      await expect(service.createOrder(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const orders = [
        { id: 1, customerName: 'Alice', products: [], total: 100 },
        { id: 2, customerName: 'Bob', products: [], total: 200 },
      ];
      mockOrderRepo.find.mockResolvedValue(orders);

      const result = await service.findAll();
      expect(result).toEqual(orders);
    });

    it('should throw InternalServerErrorException on failure', async () => {
      mockOrderRepo.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
