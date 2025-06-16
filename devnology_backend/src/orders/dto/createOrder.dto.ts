import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductOrder {
  @IsString()
  id: string;

  @IsString()
  nome: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: 'O preço deve ser maior que 0.' })
  preco: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: 'A quantidade deve ser maior que 0.' })
  quantidade: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];
}
