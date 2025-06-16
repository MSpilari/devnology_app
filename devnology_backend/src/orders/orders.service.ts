import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  createOrder(dto: CreateOrderDto): Promise<Order> {
    const total = dto.products
      .map((product) => product.preco * product.quantidade)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);

    const newOrder = this.orderRepo.create({
      customerName: dto.customerName,
      products: dto.products,
      total,
    });
    return this.orderRepo.save(newOrder);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }
}
