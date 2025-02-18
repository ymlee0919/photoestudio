import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

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
        private readonly database:DatabaseService
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

        return list;
    }

}