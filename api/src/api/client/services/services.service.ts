import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

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
    constructor( private readonly database:DatabaseService){}

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
            serviceId: true, service: true, image: true
        }});

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