import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column('simple-json')
  products: Products[];

  @Column('bigint')
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
