import { Body, 
    Controller, 
    Delete,
    Get,
    HttpStatus,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe, 
    Patch,
    BadRequestException} from '@nestjs/common';
import { InvalidOperationError } from 'src/api/common/errors/invalid.error';
import { CategoriesService } from './categories.service';
import { CategoryInfo, CreatedCategory, UpdatedCategory } from './categories.types';
import { CategoryDTO } from './categories.dto';

@Controller('api/categories')
export class CategoriesController {

    constructor(
        private readonly manager: CategoriesService
        
    ){}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getList(): Promise<Array<CategoryInfo>>{
        let result = await this.manager.getList();        
        return result;
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    
    async addCategory(
       @Body() category: CategoryDTO) : Promise<CreatedCategory> 
    {

        try {       
            // Add record to database
            let created = await this.manager.addCategory(category.category);
            return created;
        } catch (error) {
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }

    @Patch('/:categoryId')
    @HttpCode(HttpStatus.OK)
    async updateCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
        @Body() category: CategoryDTO) : Promise<UpdatedCategory> 
    {
        try {
            
            let updated = await this.manager.updatecategory(categoryId, category.category);
            return updated;
        } 
        catch (error) {    
            // Treat the error
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
        
    }

    @Patch('/:categoryId/moveUp')
    @HttpCode(HttpStatus.OK)
    async moveUp(
        @Param('categoryId', ParseIntPipe) categoryId: number) : Promise<boolean> 
    {
        try {
            
            let updated = await this.manager.stepUp(categoryId);
            return updated;
        } 
        catch (error) {    
            // Treat the error
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }

    @Patch('/:categoryId/moveDown')
    @HttpCode(HttpStatus.OK)
    async moveDown(
        @Param('categoryId', ParseIntPipe) categoryId: number) : Promise<boolean> 
    {
        try {
            
            let updated = await this.manager.stepDown(categoryId);
            return updated;
        } 
        catch (error) {    
            // Treat the error
            if(error instanceof InvalidOperationError){
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) categoryId: number) : Promise<any> {

        try {
            let deleted = await this.manager.deleteCategory(categoryId);
            if (deleted) return;
        } catch (error) {
            if (error instanceof InvalidOperationError) {
              throw new BadRequestException(error.message);
            }
            throw new BadRequestException(error);
        }

        throw new BadRequestException('Unable to delete the category');
    }
    
}
