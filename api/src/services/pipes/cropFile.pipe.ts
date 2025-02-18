import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CropFilePipe implements PipeTransform<Express.Multer.File, Promise<string>> {

    constructor(
        private readonly destPath : string,
        private readonly width: number = 900,
        private readonly height: number = 600,
        private readonly autoOrientation = true
    ) {}

    async transform(image: Express.Multer.File): Promise<string> {
        if (!image) {
            return '';
        }

        const filename = `${uuid()}.jpg`;
        const uploadPath = path.join(process.cwd(), './', this.destPath);

        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }

        const img = sharp(image.buffer);
        
        let width = this.width;
        let height = this.height;

        if(this.autoOrientation){
            
            const metadata = await img.metadata();
            
            if (metadata.orientation && (metadata.orientation >= 5 && metadata.orientation <= 8) || (metadata.width < metadata.height)) {
                // Image is vertical
                width = 600;
                height = 900;
            }
        }

        await img.resize(width, height, {
            fit: 'cover',
            position: 'center',
        })
        .jpeg({
            quality: 80, // Reduce quality to 80 for web optimization
            progressive: true, // Progressive JPEG for better web performance
            chromaSubsampling: '4:2:0' // Use chroma subsampling for further compression
        })
        .toFile(path.join(uploadPath, filename));

        return filename;
    }
}
