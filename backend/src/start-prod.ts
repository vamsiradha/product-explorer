import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
  console.log(`🚀 Production backend running on port ${port}`);
}
bootstrap();
