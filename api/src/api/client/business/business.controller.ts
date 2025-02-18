import { 
    Controller,
    Get,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import { BusinessInfo, ClientBusinessService } from './business.service';
import { Public } from 'src/api/admin/auth/guard/public.guard';

@Controller('client/business')
export class ClientBusinessController {

    constructor(private readonly manager: ClientBusinessService){}

    @Public()
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<BusinessInfo>{
        let result = await this.manager.getBusinessInfo();
        return result;
    }
}