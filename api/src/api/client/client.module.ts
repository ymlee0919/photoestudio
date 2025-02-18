import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';

import { ClientGalleryModule } from './gallery/gallery.module';
import { ClientServicesModule } from './services/services.module';
import { ClientOffersModule } from './offers/offers.module';
import { ClientBusinessModule } from './business/business.module';

@Module({
    imports: [
        DatabaseModule, 
        ClientGalleryModule,
        ClientServicesModule,
        ClientOffersModule,
        ClientBusinessModule
    ]
})
export class ClientModule {}
