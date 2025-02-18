import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { FileService } from 'src/services/files/file.services';
import { CloudService } from 'src/services/cloud/cloud.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GalleryController],
  providers: [GalleryService, FileService, CloudService]
})
export class GalleryModule {}