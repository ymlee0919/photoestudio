import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { InvalidOperationError } from "src/api/common/errors/invalid.error";
import { Prisma } from "@prisma/client";
import { InternalDatabaseError } from "src/api/common/errors/database.error";
import { ImageInfo, CreatedImage, UpdatedImage } from "./gallery.types";
import { ImageRef } from "src/api/common/types/common.types";
import { CloudService } from 'src/services/cloud/cloud.service';

/**
 * Service for gallery
 */
@Injectable()
export class GalleryService {

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
     * Add new image to database
     * 
     * @param image Image URL
     * @returns True if success, otherwise throw an exception
     */
    async addImage(image: ImageRef) : Promise<CreatedImage>
    {
        // Validate gallery limit
        let settings = await this.database.settings.findFirst({
            select: {
                galleryLimit: true
            }
        });

        let count = await this.database.gallery.count();

        if( count >= settings.galleryLimit)
            throw new InvalidOperationError('You have reach the maximun allowed images');

        // Get the last image position
        let lastImage = await this.database.gallery.findFirst({
            orderBy: {
                position: "desc"
            }
        });
        let newPosition = (!!lastImage) ? lastImage.position + 1 : 1;

        // Create the newone
        let created = await this.database.gallery.create({
            data : {
                imageUrl: image.imageUrl,
                remoteUrl: image.remoteUrl,
                expiry: image.expiry,
                position: newPosition
            }, select : {
                imageId: true, imageUrl: true, remoteUrl: true, position: true, createdAt: true
            }
        });

        return created;
    }

    /**
     * Update the url of an image
     * 
     * @param imageId Image id to update
     * @param newImage New url of the image
     * @returns True if value is updated
     */
    async updateImage(imageId: number, newImage: ImageRef) : Promise<UpdatedImage> 
    {
        // Delete the old image
        let oldImg = await this.database.gallery.findFirst({where: {imageId}});

        // Update the image url
        let updated = await this.database.gallery.update({
            where: {imageId},
            data: {
                imageUrl: newImage.imageUrl,
                remoteUrl: newImage.remoteUrl,
                updatedAt: new Date(),
                expiry: newImage.expiry,
            }, select : {
                imageId: true, imageUrl: true, remoteUrl: true, position: true, updatedAt: true
            }
        })

        return {old: oldImg, ...updated};
    }

    /**
     * Move an image from one position to another
     * 
     * @param from Position to move
     * @param to Destination position
     * @returns True if movement was successfull
     * @throws InvalidOperationError, InternalDatabaseError
     */
    async moveImage(target: number, destiny: number) : Promise<boolean> 
    {
        if(target == destiny) return true;

        // Get the target image
        let img = await this.database.gallery.findFirst({where:{imageId:target}});
        if(!img)
            throw new InvalidOperationError('Invalid selected image');
        
        // Get target position
        let from = img.position;

        // Get destiny image
        img = await this.database.gallery.findFirst({where:{imageId:destiny}});
        if(!img)
            throw new InvalidOperationError('Invalid destiny image');
        
        let to = img.position;

        // Validate from and to are inside the number of the images
        let lastImage = await this.database.gallery.findFirst({
            orderBy: {
                position: "desc"
            }
        });

        if(from > lastImage.position || to > lastImage.position)
            throw new InvalidOperationError('Invalid movement');

        // Move images
        let movedImages = await this.database.$transaction( async (database) => 
        {
            let selected = await this.database.gallery.findFirst({
                where: { position: from }
            });
            
            // Update position of range
            let moved: Prisma.BatchPayload;
            if(from < to)
                moved = await database.gallery.updateMany({ where: { 
                    AND: [ 
                        { position: { gt: from } }, 
                        { position: { lte: to } } 
                    ] 
                }, data: {
                        position: { decrement: 1 },
                        updatedAt: new Date()
                    }
                });
            else
                moved = await database.gallery.updateMany({ where: { 
                    AND: [ 
                        { position: { lt: from } }, 
                        { position: { gte: to } } 
                    ] 
                }, data: {
                        position: { increment: 1 },
                        updatedAt: new Date()
                    }
                });
            
            if(moved.count == 0)
                throw new InternalDatabaseError("Unable to update images positions");
            
            // Update position of from element
            let updated = await database.gallery.update({
                where: {imageId : selected.imageId},
                data: { position: to, updatedAt: new Date()}
            });

            if(!updated)
                throw new InternalDatabaseError("Unable to update image position");
            
            return moved.count + 1;
        });

        return movedImages > 0;
    }

    /**
     * Remove an image given the id
     * 
     * @param imageId Id image to be deleted
     * @returns True if the record was deleted. Throw exception if the imageId do not exists
     * @throws InvalidOperationError
     */
    async deleteImage(imageId: number) : Promise<ImageInfo> 
    {
        let deletedImage = await this.database.$transaction( async (database) => 
        {    
            let deleted = await database.gallery.delete({ where: { imageId }});
            if(!deleted)
                throw new InvalidOperationError('Image not foud');

            await database.gallery.updateMany({
                 where: { 
                    position: { 
                        gt: deleted.position 
                    } 
                }, data: { 
                    position: { 
                        decrement: 1 
                    } 
                }
            });

            return deleted;
        });
        
        return deletedImage;
    }

}