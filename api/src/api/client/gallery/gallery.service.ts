import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { CloudService } from 'src/services/cloud/cloud.service';

export interface ImageInfo {
    imageId: number;
    imageUrl: string;
    position: number;
}

/**
 * Service for gallery
 */
@Injectable()
export class ClientGalleryService {

    
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(
        private readonly database:DatabaseService,
        private readonly cloudService: CloudService
    ){}

    /**
     * Get the list of images
     * 
     * @returns List of images
     */
    async getList() : Promise<Array<ImageInfo>|null>
    {
        let list = await this.database.gallery.findMany({orderBy: {
            position: 'asc'
        }});

        // Update remote url if expires in less than 1 hour
        let now = Math.round(Date.now() / 60000);
        for(let i = 0; i < list.length; i++)
        {
            if(list[i].expiry - now < 3600)
            {
                let remoteUrl = await this.cloudService.getSharedLink(list[i].imageUrl);
                await this.database.gallery.update({
                    where: {
                        imageId: list[i].imageId
                    }, data : {
                        remoteUrl, expiry: now + 72000
                    }
                });

                list[i].remoteUrl = remoteUrl;
            }
        }

        return list;
    }

    /**
     * Get the list of images to display at home page
     * 
     * @returns List of images
     */
    async getHomeList() : Promise<Array<ImageInfo>|null>
    {
        let list = await this.database.gallery.findMany({
            orderBy: {
                position: 'asc'
            },
            take: 8
        });

        // Update remote url if expires in less than 1 hour
        let now = Math.round(Date.now() / 60000);
        for(let i = 0; i < list.length; i++)
        {
            if(list[i].expiry - now < 3600)
            {
                let remoteUrl = await this.cloudService.getSharedLink(list[i].imageUrl);
                await this.database.gallery.update({
                    where: {
                        imageId: list[i].imageId
                    }, data : {
                        remoteUrl, expiry: now + 72000
                    }
                });

                list[i].remoteUrl = remoteUrl;
            }
        }

        return list;
    }

}