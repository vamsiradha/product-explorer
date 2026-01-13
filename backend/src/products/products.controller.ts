import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScrapingService } from '../scraping/scraping.service';
import { Product } from '../types/scraping.types';

@Controller('products')
export class ProductsController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get()
  async findAll(
    @Query('category') categoryUrl?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20'
  ) {
    let products: Product[] = [];
    
    if (categoryUrl) {
      products = await this.scrapingService.scrapeCategory(categoryUrl);
    } else {
      // Default to fiction category
      products = await this.scrapingService.scrapeCategory('https://www.worldofbooks.com/en-gb/category/fiction');
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: products.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(products.length / limitNum)
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('url') url?: string) {
    if (url) {
      const product = await this.scrapingService.scrapeProduct(url);
      return {
        ...product,
        id,
        sourceUrl: url
      };
    }

    // Return mock if no URL provided
    return {
      id,
      title: 'Book Title',
      price: 12.99,
      description: 'Book description from World of Books',
      imageUrl: 'https://via.placeholder.com/300',
      category: 'Fiction',
      rating: 4.5,
      reviews: [
        { id: '1', author: 'Reader 1', rating: 5, text: 'Excellent!', createdAt: new Date() },
        { id: '2', author: 'Reader 2', rating: 4, text: 'Good read', createdAt: new Date() }
      ],
      details: {
        publisher: 'Penguin',
        isbn: '9781234567890',
        pages: '320'
      },
      lastScrapedAt: new Date()
    };
  }
}
