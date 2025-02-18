import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

export interface SettingsInfo {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    currency: string;
}

export interface SettingsUpdated {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    currency: string;
    updatedAt: Date;
}

/**
 * Class to manage the unique settings record of the business
 */
@Injectable()
export class SettingsService {
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(private readonly database: DatabaseService) {}

    async get(): Promise<SettingsInfo | null> {
        let settings = await this.database.settings.findFirst({
            select: {
                address: true,
                businessName: true,
                currency: true,
                email: true,
                phone: true,
            }
        });

        return settings;
    }

    async update(newSettings: SettingsInfo) : Promise<SettingsUpdated> {
        // Add settings if not found, update otherwise
        let count = await this.database.settings.count();
        
        if(count) {
            let updated = await this.database.settings.update({
                where: {settingsId : 1},
                data: { updatedAt: new Date(),  ...newSettings },
                select: {
                    businessName: true,
                    address: true,
                    phone: true,
                    email: true,
                    currency: true,
                    updatedAt: true
                }
            });
            return updated;
        }
        else {
            let created = await this.database.settings.create({
              data: { settingsId: 1, updatedAt: new Date(), ...newSettings },
              select: {
                    businessName: true,
                    address: true,
                    phone: true,
                    email: true,
                    currency: true,
                    updatedAt: true
                }
            });
            return created;
        }
    }
}