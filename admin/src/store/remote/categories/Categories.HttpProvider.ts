import HttpProvider from "../HttpProvider";
import { AxiosProvider } from "../Provider";
import { CreatedCategory, CategoryContent, UpdatedCategory, CategoryInfo } from "./Categories.Types";

export default class CategoriesHttpProvider extends AxiosProvider<Array<CategoryContent>> {
	async load(): Promise<Array<CategoryContent>> {
		try {
			return await HttpProvider.get<null, Array<CategoryContent>>("/categories");
		} catch (error: any) {
			this.errorCode = error.response ? error.response.code : 0;
			throw Error(error.response ? error.response.message : "Unable to load the categories");
		}
	}

	async addCategory(category: string): Promise<CreatedCategory | null> {
		try {
			let created = await HttpProvider.post<CategoryInfo, CreatedCategory>("/categories", {
				category
			});
			return created;
		} catch (error: any) {
			this.handleError(error, "Unable to create the category");
		}
		return null;
	}

	async updateCategory(categoryId: number, newCategory: string): Promise<UpdatedCategory | null> {
		try {
			let updated = await HttpProvider.patch<CategoryInfo, UpdatedCategory>(`/categories/${categoryId}`, {
				category: newCategory
			});
			return updated;
		} catch (error: any) {
			this.handleError(error, "Unable to update the category");
		}
		return null;
	}

	async moveUp(categoryId: number): Promise<boolean | null> {
		try {
			await HttpProvider.patch<any, any>(`/categories/${categoryId}/moveUp`);
		} catch (error: any) {
			this.handleError(error, "Unable to move the category");
		}
		return true;
	}

	async moveDown(categoryId: number): Promise<boolean | null> {
		try {
			await HttpProvider.patch<any, any>(`/categories/${categoryId}/moveDown`);
		} catch (error: any) {
			this.handleError(error, "Unable to move the category");
		}
		return true;
	}

	async delete(categoryId: number): Promise<boolean> {
		try {
			await HttpProvider.delete<any, any>(`/categories/${categoryId}`);
		} catch (error: any) {
			this.handleError(error, "Unable to delete the category");
		}
		return true;
	}
}