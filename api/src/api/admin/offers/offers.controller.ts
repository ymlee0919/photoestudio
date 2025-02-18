import { BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreatedOffer, Offer, UpdatedOffer } from "./offers.types";
import { OfferInfoDTO } from './offers.dto';
import { InvalidOperationError } from 'src/api/common/errors/invalid.error';

@Controller('api/offers')
export class OffersController {

    constructor(private readonly manager: OffersService){}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<Offer>>{
        let result = await this.manager.getList();
        return result ?? [];
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id', ParseIntPipe) offerId: number): Promise<Offer>{
        let offer = await this.manager.get(offerId);
        if(!!offer)
            return offer;

        throw new BadRequestException({
            success: false,
            errorCode: HttpStatus.BAD_REQUEST,
            message: 'Unable to find the requested offer'
        })
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() offer: OfferInfoDTO
    ): Promise<CreatedOffer>{
        try {
            let createdOffer = await this.manager.createOffer({main : offer.main ?? false, ...offer}, offer.items)
            return createdOffer;
        } catch (error) {
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
            
        }
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) offerId: number,
        @Body() offer: OfferInfoDTO
    ): Promise<UpdatedOffer>{
        try {
            let updated = await this.manager.updateOffer(offerId, {main : offer.main ?? false, ...offer}, offer.items)
            return updated;
        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe) offerId: number
    ): Promise<void>{
        try {
            let success = await this.manager.deleteOffer(offerId)
            if (success) return;

        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }

        throw new BadRequestException('Unable to delete the offer');
    }
}