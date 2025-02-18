import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { Offer, OfferItemInfo, CreatedOffer, UpdatedOffer } from "./offers.types";
import { OfferInfoDTO } from "./offers.dto";

/**
 * Class to manage the unique settings record of the business
 */
@Injectable()
export class OffersService {
    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(private readonly database: DatabaseService) {}


    async getList(): Promise<Offer[] | null> {
        let offers = await this.database.offers.findMany({
            include : {
                Items: {
                    select : {
                        itemName: true,
                        offerItemId: true
                    }
                },
                Category: true
            },
            orderBy : [
                { Category: { position: 'asc'}},
                { price: 'asc' }
            ]
        })
        return offers;
    }

    async get(offerId: number) : Promise<Offer | null> {
        return await this.database.offers.findFirst({
            where: {offerId}, 
            include: {
                Items : true,
                Category: true,
            }
        });
    }

    async createOffer(offer: OfferInfoDTO, items: Array<OfferItemInfo>) : Promise<CreatedOffer>{

        let created = await this.database.offers.create({
            data: {
                price: offer.price,
                type: offer.type,
                categoryId: parseInt(offer.categoryId.toString()),
                name: offer.name,
                showHome: offer.showHome,
                main: offer.showHome && offer.main,
                Items: {
                    createMany:{
                        data: items
                    }
                }},
            include: {
                Category: true
            }
        });

        return created;
    }

    async updateOffer(offerId: number, 
        newOffer: OfferInfoDTO, 
        items: Array<OfferItemInfo>
    ) : Promise<UpdatedOffer> {

        // Delete frist the items and insert them again
        let updated = await this.database.$transaction(async (database) => {
            await database.offerItems.deleteMany({where: {
                offerId
            }});

            let record = await database.offers.update({
                where: { offerId },
                data: {
                    name: newOffer.name,
                    type: newOffer.type,
                    categoryId: parseInt(newOffer.categoryId.toString()),
                    price: newOffer.price,
                    showHome: newOffer.showHome,
                    main: !!newOffer.showHome && !!newOffer.main,
                    updatedAt: new Date(),
                    Items: {
                        createMany: {
                            data: items,
                        },
                    },
                },
                include: {
                    Category: true
                }
            });

            // If main is set, update all other to false
            if(!!newOffer.showHome && !!newOffer.main) {
                database.offers.updateMany({data: {
                    main: false
                }});

                database.offers.update({
                    where: {
                        offerId: offerId
                    },
                    data: {
                        main: true
                    }
                });
            }

            return record;

        });

        return updated;
    }

    async deleteOffer(offerId: number) : Promise<boolean>{

        let deleted = await this.database.$transaction(async (database) => {
            await database.offerItems.deleteMany({
                where: {
                    offerId
                }
            });

            return await database.offers.deleteMany({
                where : {
                    offerId
                }
            })
        });

        return !!deleted;
    }
}