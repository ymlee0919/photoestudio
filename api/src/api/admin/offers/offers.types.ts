
export interface OfferItem {
    offerItemId: number;
    itemName: string;
    itemDetails?: string;
}

export interface Offer {
    offerId: number;
    type: string;
    categoryId: number;
    name: string;
    price: number;
    showHome: boolean;
    main: boolean;
    Category: {
        category: string;
    };
    Items: Array<OfferItem>;
}

export interface OfferItemInfo {
    itemName: string;
    itemDetails?: string;
}

export interface OfferInfo {
    name: string;
    type: string;
    categoryId: number;
    Category: {
        category: string;
    };
    price: number;
    showHome: boolean;
    main: boolean;
}

export interface CreatedOffer {
    offerId: number;
    type: string;
    categoryId: number;
    Category: {
        category: string;
    };
    name: string;
    price: number;
    showHome: boolean;
    main: boolean;
    createdAt: Date;
}

export interface UpdatedOffer {
    offerId: number;
    type: string;
    categoryId: number;
    Category: {
        category: string;
    };
    name: string;
    price: number;
    showHome: boolean;
    main: boolean;
    updatedAt: Date;
}
