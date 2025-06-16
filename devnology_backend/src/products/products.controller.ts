import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filterProducts.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAllProductsFromBothApis(@Query() query: FilterProductsDto) {
    return this.productService.findAllOrQuery(query);
  }

  @Get(':provider/:id')
  findProductsById(
    @Param('provider') provider: string,
    @Param('id') id: string,
  ) {
    return this.productService.findById(provider, id);
  }
}
