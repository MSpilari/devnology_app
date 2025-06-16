import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ProductsModule,
    CacheModule.register({ isGlobal: true, ttl: 300000 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
