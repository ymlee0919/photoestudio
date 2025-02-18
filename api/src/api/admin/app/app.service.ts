import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

export interface DashboardInfo {
    accounts: number;
    offers: number;
    services: number;
    images: number;
    galleryLimit: number;
    currency: string;
    businessName: string;
}

/**
 * Service for gallery
 */
@Injectable()
export class AppService {

    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(
        private readonly database:DatabaseService
    ){}

    /**
     * Get general app information
     * 
     * @returns General information
     */
    async getDashboardInfo() : Promise<DashboardInfo>
    {
        let [accounts, services, offers, images, settings] = await Promise.all([
            this.database.accounts.count(),
            this.database.services.count(),
            this.database.offers.count(),
            this.database.gallery.count(),
            this.database.settings.findFirst({select: {
                currency: true, businessName: true, galleryLimit: true
            }})
        ]);

        return {
            accounts, 
            offers, 
            services,
            images, 
            galleryLimit: settings.galleryLimit,
            currency : settings.currency, 
            businessName: settings.businessName
        };
    }

}