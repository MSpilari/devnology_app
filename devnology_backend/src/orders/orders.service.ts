import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    try {
      const total = dto.products
        .map((product) => product.preco * product.quantidade)
        .reduce((prevValue, currValue) => prevValue + currValue, 0);

      if (isNaN(total) || total <= 0) {
        throw new BadRequestException('Invalid total order amount');
      }

      const newOrder = this.orderRepo.create({
        customerName: dto.customerName,
        products: dto.products,
        total,
      });
      return await this.orderRepo.save(newOrder);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      Logger.error('Failed to create order', error.stack || error.message);
      throw new InternalServerErrorException('Could not create the order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepo.find();
    } catch (error) {
      Logger.error('Failed to retrieve orders', error.stack || error.message);
      throw new InternalServerErrorException('Could not fetch orders');
    }
  }
}
