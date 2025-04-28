import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as twig from 'twig';

export function setupTwig(app: NestExpressApplication) {
    console.log(__dirname);
    app.setBaseViewsDir(join(__dirname, 'views')); // Ruta de tus plantillas
    app.setViewEngine('twig');
    
    // Opcional: Configuración adicional de Twig
    twig.cache(false); // Desactiva cache en desarrollo
}