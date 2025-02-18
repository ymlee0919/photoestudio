import { IsBoolean, IsInt, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";

class OfferItemDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message : 'The name of an offer item must be at least 5 characters lenght'})
    itemName: string;

    @IsString()
    itemDetails?: string;
}

export class OfferInfoDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    type: string;

    @IsNotEmpty({message: 'You must provide the category of the offer'})
    @IsInt()
    categoryId: number;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    showHome: boolean;

    @IsBoolean()
    main?: boolean;

    @IsNotEmpty()
    @ValidateNested()
    @MinLength(1, { message: 'The offer must have at least one item'})
    items: OfferItemDTO[];
}