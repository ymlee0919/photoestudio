import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { Service, ServiceInfo, ClientServicesService } from './services.service'
import { Public } from 'src/api/admin/auth/guard/public.guard';
import { CloudService } from 'src/services/cloud/cloud.service';

@Controller('client/services')
export class ClientServicesController {

    constructor(
        private readonly manager: ClientServicesService,
        private readonly cloudService: CloudService
    ){}

    @Public()
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getServices(): Promise<Array<ServiceInfo>>{
        let result = await this.manager.getList();
        return result;
    }

    @Public()
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<Service>>{
        let result = await this.manager.getTinyList();
        return result ?? [];
    }
    
}
