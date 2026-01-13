import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log']
  });
  
  // Enable CORS for development
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Development backend running on: http://localhost:${port}`);
  console.log(`📊 Scraping endpoints:`);
  console.log(`   GET /scraping/navigation`);
  console.log(`   GET /scraping/category?url=CATEGORY_URL`);
  console.log(`   GET /scraping/product?url=PRODUCT_URL`);
  console.log(`🛒 Product endpoints:`);
  console.log(`   GET /products`);
  console.log(`   GET /products/:id?url=PRODUCT_URL`);
}
bootstrap();
