import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { FileService } from 'src/services/files/file.services';
import { CloudService } from 'src/services/cloud/cloud.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicesController],
  providers: [ServicesService, FileService, CloudService]
})
export class ServicesModule {}