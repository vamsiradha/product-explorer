import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('navigation')
  async scrapeNavigation() {
    const items = await this.scrapingService.scrapeNavigation();
    return {
      success: true,
      count: items.length,
      data: items,
      scrapedAt: new Date().toISOString()
    };
  }

  @Get('category')
  async scrapeCategory(@Query('url') url: string) {
    if (!url) {
      return { error: 'Category URL is required' };
    }
    
    const products = await this.scrapingService.scrapeCategory(url);
    return {
      success: true,
      count: products.length,
      data: products,
      scrapedAt: new Date().toISOString()
    };
  }

  @Get('product')
  async scrapeProduct(@Query('url') url: string) {
    if (!url) {
      return { error: 'Product URL is required' };
    }
    
    const product = await this.scrapingService.scrapeProduct(url);
    return {
      success: true,
      data: product,
      scrapedAt: new Date().toISOString()
    };
  }

  @Post('refresh/navigation')
  async refreshNavigation() {
    const items = await this.scrapingService.scrapeNavigation();
    return {
      message: 'Navigation refreshed successfully',
      count: items.length,
      data: items
    };
  }
}
