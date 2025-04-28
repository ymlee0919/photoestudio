import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientOffersService } from './services/offers.service';
import { ClientServicesService } from './services/services.service';
import { ClientBusinessService } from './services/business.service';
import { ClientGalleryService } from './services/gallery.service';
import { Public } from 'src/api/admin/auth/guard/public.guard';

@Controller()
export class ClientsController {

    constructor(
        private readonly offersService: ClientOffersService,
        private readonly servicesService: ClientServicesService,
        private readonly businessService: ClientBusinessService,
        private readonly galleryService: ClientGalleryService
    ){}

    @Public()
    @Get('/home')
    async home(@Res() res: Response) {
        let [images, offers, services] = await Promise.all([
            this.galleryService.getHomeList(),
            this.offersService.getHomeList(),
            this.servicesService.getList()
        ]);

        res.render('home.html.twig', { 
            images, offers, services
        });
    }
}