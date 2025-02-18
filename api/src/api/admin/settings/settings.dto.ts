import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SettingsInfoDTO {
    @IsString()
    @IsNotEmpty({ message: 'You must provide the business name' })
    @MinLength(5, { message: 'The name must contains at least 5 characters' })
    readonly businessName: string;

    @IsString()
    @IsNotEmpty({ message: 'Addres can not be empty' })
    @MinLength(8, { message: 'The address must contains at least 8 characters' })
    readonly address: string;

    @IsString()
    @IsNotEmpty({ message: 'Phone can not be empty' })
    readonly phone: string;

    @IsString()
    @IsNotEmpty({ message: 'Email can not be empty' })
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty({ message: 'Currency can not be empty' })
    @MinLength(3, { message: 'The currency must contains 3 characters' })
    @MaxLength(3, { message: 'The currency must contains 3 characters' })
    readonly currency: string;
}