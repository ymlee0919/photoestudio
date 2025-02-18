import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ServiceDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly service: string;
}