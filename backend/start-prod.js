const { execSync } = require('child_process');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');

async function bootstrap() {
  try {
    // Run database migrations in production
    console.log('🚀 Starting production setup...');
    
    // Generate Prisma client if not exists
    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
    } catch (error) {
      console.log('Prisma client already generated');
    }
    
    // Push database schema
    try {
      execSync('npx prisma db push', { stdio: 'inherit' });
    } catch (error) {
      console.log('Database schema already up to date');
    }
    
    // Start the application
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log']
    });
    
    // Enable CORS for production
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'https://product-explorer-frontend.onrender.com',
        'https://product-explorer.onrender.com'
      ],
      credentials: true,
    });
    
    const port = process.env.PORT || 3001;
    await app.listen(port);
    
    console.log(`🎉 Production backend running on port ${port}`);
    console.log(`🔗 Health check: http://localhost:${port}/scraping/navigation`);
    console.log(`📚 API Documentation:`);
    console.log(`   GET /scraping/navigation`);
    console.log(`   GET /products`);
    console.log(`   GET /products/:id?url=PRODUCT_URL`);
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
