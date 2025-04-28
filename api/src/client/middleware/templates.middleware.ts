import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientOffersService } from '../services/offers.service';
import { ClientServicesService } from '../services/services.service';
import { ClientBusinessService } from '../services/business.service';

@Injectable()
export class TemplateMiddleware implements NestMiddleware {

    constructor(
        private readonly offersService: ClientOffersService,
        private readonly servicesService: ClientServicesService,
        private readonly businessService: ClientBusinessService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        // Get all data
        let [offersList, servicesList, business] = await Promise.all([
            this.offersService.getList(),
            this.servicesService.getTinyList(),
            this.businessService.getBusinessInfo()
        ])
        
        res.locals = { offersList, servicesList, business}

        next();
    }
}