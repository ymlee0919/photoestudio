import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database/database.service";
import { crypt } from "src/services/crypt/crypt.service";
import { InvalidOperationError } from "src/api/common/errors/invalid.error";
import { AccountInfo, AccountCreation, CreatedAccount, UpdatedAccount, AccountCredentials } from "./accounts.types";

/**
 * Servie for accounts
 */
@Injectable()
export class AccountsService {

    /**
     * Constructor of the class
     * @param database Database provider service
     */
    constructor(private readonly database:DatabaseService){}

    async getList() : Promise<Array<AccountInfo>|null>
    {
        let list = await this.database.accounts.findMany({select: {
            userId: true, user: true, name: true
        }});

        return list;
    }

    private async existsAccount(user: string) : Promise<boolean> 
    {
        let accounts = await this.database.accounts.count({where: {user}})
        return accounts > 0;
    }

    async createAccount(account: AccountCreation) : Promise<CreatedAccount>
    {
        // Validate account do not exists
        let exists = await this.existsAccount(account.user);
        if(exists)
            throw new InvalidOperationError("The new user already exists");

        // Create a account
        account.password = crypt(account.password);
        let created = await this.database.accounts.create({
            data: account,
            select: {
                userId: true,
                user: true,
                name: true,
                createdAt: true,
            }
        });

        return created;
    }

    async update(userId: number, newName: string) : Promise<UpdatedAccount> {

        // Validate the account already exists
        let accounts = await this.database.accounts.count({where: {userId}});
        if(!accounts)
            throw new InvalidOperationError("The account you want to update do not exists");

        let updated = await this.database.accounts.update({
            data: { name: newName, updatedAt: new Date() }, 
            where : { userId },
            select: {
                userId: true,
                user: true,
                name: true,
                updatedAt: true,
            }
        })

        return updated;
    }

    async updateCredentials(userId: number, newCredentials: AccountCredentials) : Promise<UpdatedAccount> {
        
        // Validate the selected account exists
        let account = await this.database.accounts.findFirst({where: {userId}});
        if(!account)
            throw new InvalidOperationError("The account you want to update do not exists");

        // Validate the new user is not in use
        if(account.user != newCredentials.user)
        {
            let existsAccount = await this.existsAccount(newCredentials.user);
            if(existsAccount)
                throw new InvalidOperationError("The new user already exists. Please, provide another identifier.");
        }

        // Crypt password
        if(newCredentials.password)
            newCredentials.password = crypt(newCredentials.password);

        // Update the account
        let updatedAccount = await this.database.accounts.update({
            where: { userId },
            data: {updatedAt:new Date(), ...newCredentials},
            select: {
                userId: true,
                user: true,
                name: true,
                updatedAt: true,
            }
        });

        return updatedAccount;
    }

    async deleteAccount(userId: number) : Promise<boolean> {
        // Validate the selected account exists
        let account = await this.database.accounts.findFirst({where: {userId}});
        if(!account)
            throw new InvalidOperationError("The account you want to delete do not exists");

        let deleted = await this.database.accounts.delete({where: {userId}});

        return !!deleted;
    }

}