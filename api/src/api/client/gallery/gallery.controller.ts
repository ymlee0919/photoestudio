import { Controller, Get, HttpStatus, HttpCode} from '@nestjs/common';
import { ClientGalleryService, ImageInfo } from './gallery.service'
import { Public } from 'src/api/admin/auth/guard/public.guard';
import { CloudService } from 'src/services/cloud/cloud.service';

@Controller('client/gallery')
export class ClientGalleryController {

    constructor( 
        private readonly manager: ClientGalleryService,
        private readonly cloudService: CloudService
    ) {}

    @Public()
    @Get('/home')
    @HttpCode(HttpStatus.OK)
    async getHomeList(): Promise<Array<ImageInfo>>{
        let result = await this.manager.getHomeList();
        return result;
    }
    
    @Public()
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<ImageInfo>>{
        let result = await this.manager.getList();
        return result;
    }
}
