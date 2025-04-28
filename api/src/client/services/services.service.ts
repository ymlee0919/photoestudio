import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { CloudService } from 'src/services/cloud/cloud.service';

export interface ServiceInfo {
    serviceId: number;
    service: string;
    image: string;
}

export interface Service {
    serviceId: number;
    service: string;
}

/**
 * Service for gallery
 */
@Injectable()
export class ClientServicesService {

    
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor( 
        private readonly database:DatabaseService,
        private readonly cloudService: CloudService
    ){}

    /**
     * Get the list of services
     * 
     * @returns List of services
     */
    async getList() : Promise<Array<ServiceInfo>|null>
    {
        let list = await this.database.services.findMany({orderBy: {
            service: 'asc'
        }, select: {
            serviceId: true, service: true, image: true, remoteUrl: true, expiry: true
        }});

        // Update remote url if expires in less than 1 hour
        let now = Math.round(Date.now() / 60000);
        for(let i = 0; i < list.length; i++)
        {
            if(list[i].expiry - now < 3600)
            {
                let remoteUrl = await this.cloudService.getSharedLink(list[i].image);
                await this.database.services.update({
                    where: {
                        serviceId: list[i].serviceId
                    }, data : {
                        remoteUrl, expiry: now + 72000
                    }
                });

                list[i].image = remoteUrl;
            }
            else
                list[i].image = list[i].remoteUrl;
        }

        return list;
    }

    /**
     * Get the list of images
     * 
     * @returns List of images
     */
    async getTinyList() : Promise<Array<Service>|null>
    {
        let list = await this.database.services.findMany({orderBy: {
            service: 'asc'
        }, select: {
            serviceId: true, service: true
        }});

        return list;
    }


}