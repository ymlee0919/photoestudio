import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";

export interface OfferItem {
    offerItemId: number;
    itemName: string;
    itemDetails?: string;
}

export interface OfferCategory {
    category: string;
}

export interface Offer {
    offerId: number;
    name: string;
    price: number;
    showHome: boolean;
    main: boolean;
    Category: OfferCategory;
    Items: Array<OfferItem>
}

export interface OfferTinyInfo {
    name: string;
    price: number;
}

/**
 * Class to manage the unique settings record of the business
 */
@Injectable()
export class ClientOffersService {
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(private readonly database: DatabaseService) {}


    async getHomeList(): Promise<Offer[] | null> {
        let offers = await this.database.offers.findMany({
            where : { showHome: true },
            orderBy : { price: 'asc' },
            take: 4,
            include : {
                Items: true,
                Category: true
            }
        })
        return offers;
    }

    async getAll(): Promise<Offer[] | null> {
        let offers = await this.database.offers.findMany({
            orderBy : [
                { Category: { position: 'asc'}},
                { price: 'asc' }
            ],
            include : {
                Category : true,
                Items: {
                    select : {
                        itemName: true,
                        itemDetails: true,
                        offerItemId: true
                    }
                }
            }
        })
        return offers;
    }

    async getList(): Promise<OfferTinyInfo[] | null> {
        
        // Get the offers
        let offers = await this.database.offers.findMany({
            orderBy : [
                { Category: { position: 'asc'}},
                { price: 'asc' }
            ],
            select : {
                name: true,
                price: true
            }
        })
        
        return offers;
    }
}