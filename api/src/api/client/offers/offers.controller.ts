import { BadRequestException,
    Controller,
    Get,
    HttpStatus,
    HttpCode,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { Offer, ClientOffersService, OfferTinyInfo } from './offers.service';
import { Public } from 'src/api/admin/auth/guard/public.guard';

@Controller('client/offers')
export class ClientOffersController {

    constructor(private readonly manager: ClientOffersService){}

    @Public()
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<Array<Offer>>{
        let result = await this.manager.getAll();
        return result ?? [];
    }

    @Public()
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<OfferTinyInfo>>{
        let result = await this.manager.getList();
        return result ?? [];
    }

    @Public()
    @Get('/home')
    @HttpCode(HttpStatus.OK)
    async getHomeList(): Promise<Array<Offer>>{
        let result = await this.manager.getHomeList();
        return result ?? [];
    }
}