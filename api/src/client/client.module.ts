import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupTwig } from './twig.config';
import { TemplateMiddleware } from './middleware/templates.middleware';
import { DatabaseService } from 'src/services/database/database.service';
import { ClientOffersService } from './services/offers.service';
import { ClientBusinessService } from './services/business.service';
import { ClientGalleryService } from './services/gallery.service';
import { ClientServicesService } from './services/services.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from 'src/services/database/database.module';
import { CloudService } from 'src/services/cloud/cloud.service';

@Module({
    imports : [
      DatabaseModule
    ],
    providers: [
      ClientOffersService,
      ClientBusinessService,
      ClientGalleryService,
      ClientServicesService,
      CloudService,
      {
        provide: APP_INTERCEPTOR,
        useClass: TemplateMiddleware, // Alternative if middleware doesn't work
      },
    ],
    controllers: [ClientsController],
})
export class ClientModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TemplateMiddleware)
      .forRoutes('*');
  }

  // Método estático para configuración
  static setup(app: NestExpressApplication) {
    setupTwig(app);
  }
}