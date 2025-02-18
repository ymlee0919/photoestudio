import { Body, 
    Controller, 
    Delete,
    Get,
    HttpStatus,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe, 
    Patch,
    BadRequestException} from '@nestjs/common';
import { GalleryService } from './gallery.service'
import { CreatedImage, ImageInfo, UpdatedImage } from "./gallery.types";
import { InvalidOperationError } from 'src/api/common/errors/invalid.error';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions, multerConfig } from 'src/services/files/multer.options';
import { MoveImagesDTO } from './gallery.dto';
import { FileService } from 'src/services/files/file.services';
import { CloudService } from 'src/services/cloud/cloud.service';
import { CropFilePipe } from 'src/services/pipes/cropFile.pipe';

interface UploadedFileType { 
    originalname: string; 
    filename: string;
}

@Controller('api/gallery')
export class GalleryController {

    constructor(
        private readonly manager: GalleryService,
        private readonly fileService: FileService,
        private readonly cloudService: CloudService
    ){}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<ImageInfo>>{
        let result = await this.manager.getList();
        
        let items = result.map(async (value: ImageInfo) => {
            let url = await this.cloudService.getSharedLink(value.imageUrl, 72000)
            return {...value, remoteUrl: url };
        });
        let results = await Promise.all(items);
        
        return results;
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image', MulterOptions))
    async addImage(@UploadedFile(
        new ParseFilePipe({ fileIsRequired: true}),
        new CropFilePipe(multerConfig.localGalleryDest, 900, 600, true)
      ) file: string) : Promise<CreatedImage> 
    {
        let fileName = `${multerConfig.galleryDest}${file}`;

        try {    
            // Upload to cloud
            let remoteUrl = await this.cloudService.uploadFile(fileName);
            
            // Add record to database
            let created = await this.manager.addImage({
                imageUrl: fileName,
                remoteUrl: remoteUrl
            });

            return created;
        } catch (error) {
            
            // Delete the uploaded images
            this.fileService.deleteFile(fileName);
            this.cloudService.deleteFile(fileName);

            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }

    @Patch('/:imageId')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('image', MulterOptions))
    async updateImage(
        @Param('imageId', ParseIntPipe) 
            imageId: number,
        @UploadedFile( 
            new ParseFilePipe({ fileIsRequired: true}),
            new CropFilePipe(multerConfig.localGalleryDest, 900, 600, true)
        ) 
            file: string) : Promise<UpdatedImage> 
    {
        let fileName = `${multerConfig.galleryDest}${file}`;

        try {    
            // Upload to dropbox
            let remoteUrl = await this.cloudService.uploadFile(fileName);

            // Update the database
            let updated = await this.manager.updateImage(imageId, {
                imageUrl: fileName, remoteUrl
            });

            // Delete old local and remote images
            this.fileService.deleteFile(updated.old.imageUrl);
            await this.cloudService.deleteFile(updated.old.imageUrl);
            
            return updated;
        } 
        catch (error) {
            // Delete the uploaded images
            this.fileService.deleteFile(fileName);
            this.cloudService.deleteFile(fileName);

            // Treat the error
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
        
    }

    @Patch('/:imageId/move')
    @HttpCode(HttpStatus.NO_CONTENT)
    async moveImages(
        @Param('imageId', ParseIntPipe) 
            target: number,
        @Body() params: MoveImagesDTO
    ) : Promise<any> {
        try {
            let success = await this.manager.moveImage(target, params.destiny);
            if (success) return;
        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
        throw new BadRequestException('Unable to move the image');
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) imageId: number) : Promise<any> {

        try {
            let deleted = await this.manager.deleteImage(imageId);
            if (deleted) {
                // Delete the uploaded images
                this.fileService.deleteFile(deleted.imageUrl);
                this.cloudService.deleteFile(deleted.imageUrl);

                return;
            }
        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }

        throw new BadRequestException('Unable to delete the image');
    }
    
}
