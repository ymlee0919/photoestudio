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
import { ServicesService } from './services.service'
import { CreatedService, ServiceInfo, UpdatedService } from "./services.types";
import { InvalidOperationError } from 'src/api/common/errors/invalid.error';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions, multerConfig } from 'src/services/files/multer.options';
import { ServiceDTO } from './services.dto';
import { FileService } from 'src/services/files/file.services';
import { CropFilePipe } from 'src/services/pipes/cropFile.pipe';
import { CloudService } from 'src/services/cloud/cloud.service';

interface UploadedFileType { 
    originalname: string; 
    filename: string;
}

@Controller('api/services')
export class ServicesController {

    constructor(
        private readonly manager: ServicesService,
        private readonly fileService: FileService,
        private readonly cloudService: CloudService
    ){}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<ServiceInfo>>{
        let result = await this.manager.getList();

        let items = result.map(async (value: ServiceInfo) => {
            let url = await this.cloudService.getSharedLink(value.image, 72000)
            return {...value, remoteUrl: url };
        });
        let results = await Promise.all(items);
        
        return results;
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image', MulterOptions))
    async addImage(
        @UploadedFile(
            new ParseFilePipe({ fileIsRequired: true}),
            new CropFilePipe(multerConfig.localServicesDest, 600, 400, false)
        ) file: string,
       @Body() service: ServiceDTO) : Promise<CreatedService> 
    {
        let fileName = `${multerConfig.servicesDest}${file}`;

        try {
            // Upload to cloud
            let remoteUrl = await this.cloudService.uploadFile(fileName);
            
            // Add record to database
            let created = await this.manager.addService(service.service, {
                imageUrl: fileName, remoteUrl
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

    @Patch('/:serviceId')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('image', MulterOptions))
    async updateImage(
        @Param('serviceId', ParseIntPipe) serviceId: number,
        @Body() service: ServiceDTO,
        @UploadedFile( 
            new ParseFilePipe({ fileIsRequired: false}),
            new CropFilePipe(multerConfig.localServicesDest, 600, 400, false)
        ) file?: string) : Promise<UpdatedService> 
    {

        let fileName = (!!file) ? `${multerConfig.servicesDest}${file}` : null;

        try {
            let remoteUrl : string | null = null;

            // Upload to dropbox
            if(file)
                remoteUrl = await this.cloudService.uploadFile(fileName);

            let updated = await this.manager.updateService(serviceId, service.service, (!!file) ? {
                imageUrl: fileName, remoteUrl
            } : null);

            return updated;
        } 
        catch (error) {
            // Delete the uploaded image
            if(file)
            {
                this.fileService.deleteFile(fileName);
                this.cloudService.deleteFile(fileName);
            }
                
            // Treat the error
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
        
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) serviceId: number) : Promise<any> {

        try {
            let deleted = await this.manager.deleteService(serviceId);

            if (deleted) {
                // Delete the uploaded images
                this.fileService.deleteFile(deleted.image);
                this.cloudService.deleteFile(deleted.image);

                return;
            }
        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }

        throw new BadRequestException('Unable to move the image');
    }
    
}
