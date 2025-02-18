import { Injectable } from "@nestjs/common";
import { InvalidOperationError } from "src/api/common/errors/invalid.error";
import { CategoryInfo, CreatedCategory, UpdatedCategory } from "./categories.types";
import { DatabaseService } from "src/services/database/database.service";

/**
 * category categories
 */
@Injectable()
export class CategoriesService {

    
    /**
     * Constructor of the class
     * @param database Database provider category
     */
    constructor(
        private readonly database:DatabaseService
    ){}

    /**
     * Get the list categories
     * 
     * @returns List of categories
     */
    async getList() : Promise<Array<CategoryInfo>|null>
    {
        let list = await this.database.categories.findMany({orderBy: {
            position: 'asc'
        }, select: {
            categoryId: true, category: true, position: true
        }});

        return list;
    }

    private async existsCategory(categoryName: string) : Promise<boolean> {
        let categories = await this.database.categories.count({
            where: {
                category: {
                    equals: categoryName.toLowerCase(),
                    mode: 'insensitive'
                }
            }
        });

        return categories > 0;
    }

    /**
     * Add new category to database
     * 
     * @param categoryName New category name
     * @returns True if success, otherwise throw an exception
     */
    async addCategory(categoryName: string) : Promise<CreatedCategory>
    {
        // Validate if new category exists
        let exists = await this.existsCategory(categoryName);
        if(exists)
            throw new InvalidOperationError(`The category ${categoryName} already exists`);

        let count = await this.database.categories.count();

        // Create the newone
        let created = await this.database.categories.create({
            data : {
                category: categoryName,
                position: count + 1
            }, select : {
                categoryId: true, category: true, position: true, createdAt: true
            }
        });

        return created;
    }

    /**
     * Update the category information
     * 
     * @param categoryId category id to update
     * @param newCategoryName New category name
     * @returns True if value is updated
     */
    async updatecategory(categoryId: number, newCategoryName: string) : Promise<UpdatedCategory> 
    {
        let currentCategory = await this.database.categories.findFirst({where : {
            categoryId : categoryId
        }});

        // Validate the category exists
        if(!currentCategory)
            throw new InvalidOperationError('The category you want to update do not exist');

        // Validate the new category name do not exists
        if(currentCategory.category.toLowerCase() != newCategoryName.toLowerCase()){
            let exists = await this.existsCategory(newCategoryName);
            if(exists)
                throw new InvalidOperationError(`The category ${newCategoryName} already exists`);
        }

        let updated = await this.database.categories.update({
            where: { categoryId },
            data: { category: newCategoryName, updatedAt: new Date() },
            select : {
                categoryId: true, category: true, position: true, updatedAt: true
            }
        })
        
        return updated;
    }

    /**
     * Move a category a step up
     * 
     * @param categoryId Category identifier to move up
     * @returns True if was moved, false otherwise
     */
    async stepUp(categoryId: number) : Promise<boolean>
    {
        let current = await this.database.categories.findUnique({
            where: {
                categoryId
            }
        });

        if(!current)
            return false;

        // Find previous
        let prev = await this.database.categories.findFirst({
            where: {
                position: current.position - 1
            }
        });

        if(!prev)
            return false;

        // Update positions
        await this.database.$transaction(async (database) => {
            await database.categories.update({
                where: {categoryId: current.categoryId},
                data: {position: current.position - 1}
            });

            await database.categories.update({
                where: {categoryId: prev.categoryId},
                data: {position: prev.position + 1}
            })
        });

        return true;
    }

    /**
     * Move a category a step down
     * 
     * @param categoryId Category identifier to move down
     * @returns True if was moved, false otherwise
     */
    async stepDown(categoryId: number) : Promise<boolean>
    {
        let current = await this.database.categories.findUnique({
            where: {
                categoryId
            }
        });

        if(!current)
            return false;

        // Find previous
        let prev = await this.database.categories.findFirst({
            where: {
                position: current.position + 1
            }
        });

        if(!prev)
            return false;

        // Update positions
        await this.database.$transaction(async (database) => {
            await database.categories.update({
                where: {categoryId: current.categoryId},
                data: {position: current.position + 1}
            });

            await database.categories.update({
                where: {categoryId: prev.categoryId},
                data: {position: prev.position - 1}
            })
        });

        return true;
    }

    /**
     * Remove a category given the id
     * 
     * @param categoryId Id category to be deleted
     * @returns True if the record was deleted. Throw exception if the Id do not exists or there are any offer with this category.
     * @throws InvalidOperationError
     */
    async deleteCategory(categoryId: number) : Promise<CategoryInfo> 
    {
        // Validate there are not offers into this category
        let count = await this.database.offers.count({where: {
            categoryId
        }});

        if(count > 0)
            throw new InvalidOperationError('There are offers with this category, can not be deleted');

        let deleted = await this.database.categories.delete({ where: { categoryId }});
        if(!deleted)
            throw new InvalidOperationError('category not foud');

        return deleted;
    }

}