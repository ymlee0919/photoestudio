import { Controller, Get, Req} from '@nestjs/common';
import { AppService} from './app.service';
import { AuthRequestContext } from '../auth/context/auth.context';
import { Request } from 'express';

export interface ApplicationInfo {
    accounts: number;
    offers: number;
    images: number;
    currency: string;
    businessName: string;
    user: string;
    userName: string;
}

@Controller('api/app')
export class AppController {

    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(
        private readonly manager: AppService
    ){}

    @Get('/')
    async getList(@Req() request: Request): Promise<ApplicationInfo> {
        let authContext = request['authContext'] as AuthRequestContext;
        let result = await this.manager.getDashboardInfo();
        return {...result, ...authContext.Obj};
    }

}