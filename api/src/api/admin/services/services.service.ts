import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { InvalidOperationError } from "src/api/common/errors/invalid.error";

import { ImageRef } from "src/api/common/types/common.types";
import { ServiceInfo, CreatedService, UpdatedService, UpdatedServiceInfo } from "./services.types";
import { CloudService } from 'src/services/cloud/cloud.service';

/**
 * Service for gallery
 */
@Injectable()
export class ServicesService {

    
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

                list[i].remoteUrl = remoteUrl;
            }
        }

        return list;
    }

    private async existsService(serviceName: string) : Promise<boolean> {
        let services = await this.database.services.count({
            where: {
                service: {
                    equals: serviceName.toLowerCase(),
                    mode: 'insensitive'
                }
            }
        });

        return services > 0;
    }

    /**
     * Add new service to database
     * 
     * @param serviceName New service name
     * @param image Image URL
     * @returns True if success, otherwise throw an exception
     */
    async addService(serviceName: string, image: ImageRef) : Promise<CreatedService>
    {
        // Validate if new service exists
        let exists = await this.existsService(serviceName);
        if(exists)
            throw new InvalidOperationError(`The service ${serviceName} already exists`);

        // Create the newone
        let created = await this.database.services.create({
            data : {
                service: serviceName,
                image: image.imageUrl,
                remoteUrl: image.remoteUrl,
                expiry: image.expiry
            }, select : {
                serviceId: true, service: true, image: true, remoteUrl: true, createdAt: true
            }
        });

        return created;
    }

    /**
     * Update the service information
     * 
     * @param serviceId Service id to update
     * @param newServiceName New service name
     * @param newImageUrl New url of the image
     * @returns True if value is updated
     */
    async updateService(serviceId: number, newServiceName: string, newImage?: ImageRef) : Promise<UpdatedService> 
    {
        let currentService = await this.database.services.findFirst({where : {
            serviceId : serviceId
        }});

        // Validate the service exists
        if(!currentService)
            throw new InvalidOperationError('The service you want to update do not exist');

        // Validate the new service name do not exists
        if(currentService.service.toLowerCase() != newServiceName.toLowerCase()){
            let exists = await this.existsService(newServiceName);
            if(exists)
                throw new InvalidOperationError(`The service ${newServiceName} already exists`);
        }

        let updated: UpdatedServiceInfo;

        if(newImage) {
            updated = await this.database.services.update({
                where: {
                    serviceId: currentService.serviceId
                },
                data: {
                    service: newServiceName,
                    image: newImage.imageUrl,
                    remoteUrl: newImage.remoteUrl,
                    expiry: newImage.expiry,
                    updatedAt: new Date()
                },
                select: {
                    serviceId: true, service: true, image: true, remoteUrl: true, updatedAt: true
                }
            })
        }
        else {
            updated = await this.database.services.update({
                where: {
                    serviceId: currentService.serviceId
                },
                data: {
                    service: newServiceName,
                    updatedAt: new Date()
                },
                select: {
                    serviceId: true, service: true, image: true, remoteUrl: true, updatedAt: true
                }
            })
        }

        return {old: currentService, ...updated};
    }

    /**
     * Remove a service given the id
     * 
     * @param serviceId Id image to be deleted
     * @returns True if the record was deleted. Throw exception if the imageId do not exists
     * @throws InvalidOperationError
     */
    async deleteService(serviceId: number) : Promise<ServiceInfo> 
    {
        let deleted = await this.database.services.delete({ where: { serviceId }});
        if(!deleted)
            throw new InvalidOperationError('Service not foud');

        return deleted;
    }

}