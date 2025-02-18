import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { ClientGalleryController } from './gallery.controller';
import { ClientGalleryService } from './gallery.service';
import { CloudService } from 'src/services/cloud/cloud.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientGalleryController],
  providers: [ClientGalleryService, CloudService]
})
export class ClientGalleryModule {}