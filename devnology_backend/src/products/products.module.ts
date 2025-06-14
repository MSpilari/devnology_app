import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { ExternalProductsService } from './externalProducts.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ExternalProductsService],
})
export class ProductsModule {}
