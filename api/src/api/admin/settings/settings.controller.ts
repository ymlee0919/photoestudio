import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { InvalidOperationError } from 'src/api/common/errors/invalid.error';
import { SettingsService, SettingsInfo, SettingsUpdated } from './settings.service';
import { SettingsInfoDTO } from './settings.dto';

@Controller('api/settings')
export class SettingsController {
    constructor(private readonly manager: SettingsService) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<SettingsInfo | Object>
    {
        let result = await this.manager.get();
        return result ?? {};
    }

    @Put('/')
    @HttpCode(HttpStatus.OK)
    async set( @Body() settings: SettingsInfoDTO): Promise<SettingsUpdated>
    {
        try {
            let updated = await this.manager.update(settings);
            return updated;
        } catch (error) {
            if (error instanceof InvalidOperationError) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }
}
