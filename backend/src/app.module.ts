import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ScrapingController } from './scraping/scraping.controller';
import { ScrapingService } from './scraping/scraping.service';

@Module({
  imports: [],
  controllers: [ProductsController, ScrapingController],
  providers: [ScrapingService],
})
export class AppModule {}
