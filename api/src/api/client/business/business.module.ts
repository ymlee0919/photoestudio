import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { ClientBusinessController } from './business.controller';
import { ClientBusinessService } from './business.service';
@Module({
  imports: [DatabaseModule],
  controllers: [ClientBusinessController],
  providers: [ClientBusinessService]
})
export class ClientBusinessModule { }
