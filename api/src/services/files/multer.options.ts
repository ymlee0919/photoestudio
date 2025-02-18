import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
    localGalleryDest: `${process.env.UPLOAD_ROOT}${process.env.UPLOAD_GALLERY_LOCATION}`,
    galleryDest: process.env.UPLOAD_GALLERY_LOCATION,
    localServicesDest: `${process.env.UPLOAD_ROOT}${process.env.UPLOAD_SERVICES_LOCATION}`,
    servicesDest: process.env.UPLOAD_SERVICES_LOCATION,
};

// Multer upload options
export const MulterOptions = {
    // Enable file size limits
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) * 1024 * 1024,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${path.extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: memoryStorage(),
};