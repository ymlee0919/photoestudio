import { BadRequestException, Body, ConsoleLogger, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDTO } from "./auth.dto";
import { JwtService } from '@nestjs/jwt';
import { AccountInfo } from "../accounts/accounts.types";
import { Public } from "./guard/public.guard";
import { InvalidOperationError } from "src/api/common/errors/invalid.error";

export interface AuthResponse {
    account: AccountInfo;
    accessToken: string;
}

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly manager: AuthService,
        private readonly jwtService: JwtService
    ){}

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async login(@Body() credentials: CredentialsDTO) : Promise<AuthResponse> 
    {
        try {
            let account = await this.manager.login(credentials);
            if(!account)
                throw new BadRequestException('Invalid credentials');

            const accessToken = this.jwtService.sign(account, {
                secret: process.env.JWT_SECRET
            });
            return {
                account, accessToken
            }
        }
        catch(error:any) {
            console.log(error);
            if(error instanceof InvalidOperationError)
                throw new BadRequestException(error.message);
            else
                throw new BadRequestException(error);
        }
    }

}