import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { ClientServicesController } from './services.controller';
import { ClientServicesService } from './services.service';
import { CloudService } from 'src/services/cloud/cloud.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientServicesController],
  providers: [ClientServicesService, CloudService]
})
export class ClientServicesModule {}