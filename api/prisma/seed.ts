import { PrismaClient } from '@prisma/client';
import { crypt } from "./../src/services/crypt/crypt.service";

const prisma = new PrismaClient();

async function main() {
    // Basic settings
    let count = await prisma.settings.count();
    if(count == 0)
        await prisma.settings.create({
            data: {
                businessName: 'PhotoStudio',
                address: 'Cuba',
                phone: '+5353123456',
                currency: 'USD',
                email: 'sample@email.com'
            }
        });
    // Basic account
    count = await prisma.accounts.count();
    if(count == 0)
        await prisma.accounts.create({
            data: {
                user: 'admin',
                name: 'Administrator',
                password: crypt('Admin.2025')
            }
        })
}

main()
    .catch(e => { throw e; })
    .finally(async () => {
        await prisma.$disconnect(); 
});