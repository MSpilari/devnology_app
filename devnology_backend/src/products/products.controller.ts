import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filterProducts.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAllProductsFromBothApis(@Query() query: FilterProductsDto) {
    return this.productService.findAllOrQuery(query);
  }
}
