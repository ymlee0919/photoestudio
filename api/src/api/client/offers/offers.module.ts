import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/services/database/database.module';
import { ClientOffersController } from './offers.controller';
import { ClientOffersService } from './offers.service';
@Module({
  imports: [DatabaseModule],
  controllers: [ClientOffersController],
  providers: [ClientOffersService]
})
export class ClientOffersModule {}
