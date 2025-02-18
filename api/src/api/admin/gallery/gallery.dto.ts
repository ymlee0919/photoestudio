import { IsInt, IsNotEmpty } from "class-validator";


export class MoveImagesDTO {
    @IsInt()
    @IsNotEmpty()
    readonly destiny: number;
}