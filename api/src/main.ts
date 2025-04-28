import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { ClientModule } from './client/client.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  ClientModule.setup(app);
  
  // Public assets
  let uploadPath = join(__dirname, '../../', 'dist/public');

  if (!existsSync(uploadPath))
    mkdirSync(uploadPath);
  
  copyFileSync(join(__dirname, '../../', 'public/index.html'), `${uploadPath}/index.html`);

  // Create images folders
  let imagesPath = join(uploadPath, '/images');
  if (!existsSync(imagesPath)) {
    mkdirSync(imagesPath);
    mkdirSync(imagesPath + '/services');
    mkdirSync(imagesPath + '/gallery');
  }
    
  app.useStaticAssets(join(__dirname, '../../', 'public'));

  // Cors
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(';') || [];

  app.enableCors({
        origin: allowedOrigins, // Allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        credentials: true, // Allow credentials (e.g., cookies)
    });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();