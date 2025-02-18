import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

export interface BusinessInfo {
    businessName: string;
    address: string;
    phone: string;
    currency: string;
    email: string;
}

/**
 * Class to manage the unique settings record of the business
 */
@Injectable()
export class ClientBusinessService {
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(private readonly database: DatabaseService) {}


    async getBusinessInfo(): Promise<BusinessInfo | null> {
        let settings = await this.database.settings.findFirst({
            select: {
                businessName: true,
                address: true,
                phone: true,
                currency: true,
                email: true
            }
        });

        return settings;
    }
}