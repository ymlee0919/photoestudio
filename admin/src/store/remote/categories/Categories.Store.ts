import { Store } from "../Store";
import { EventResult } from "../../../types/Events";

import { CreatedCategory, UpdatedCategory, CategoryContent } from "./Categories.Types";
import CategoriesHttpProvider from "./Categories.HttpProvider";

export default class CategoriesStore extends Store<Array<CategoryContent>> {
	private _provider: CategoriesHttpProvider;

	constructor() {
		super();
		this._provider = new CategoriesHttpProvider();
	}

	protected getData(): Promise<Array<CategoryContent>> {
		return this._provider.load();
	}

	protected get provider(): CategoriesHttpProvider {
		return this._provider as CategoriesHttpProvider;
	}

	get(categoryId: number): CategoryContent | undefined {
		return this._content?.find((item: CategoryContent) => {
			return item.categoryId == categoryId;
		});
	}

	async addCategory(category: string): Promise<EventResult<CreatedCategory | null>> {
		try {
			let created = await this.provider.addCategory(category);

			return {
				success: true,
				message: "Category successfully created",
				info: created,
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async updateCategory(categoryId: number, category: string): Promise<EventResult<UpdatedCategory | null>> {
		try {
			let updated = await this.provider.updateCategory(categoryId, category);

			return {
				success: true,
				message: "Category successfully updated",
				info: updated,
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async moveUp(categoryId: number): Promise<EventResult> {
		try {
			await this.provider.moveUp(categoryId);

			return {
				success: true,
				message: "Category successfully moved",
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async moveDown(categoryId: number): Promise<EventResult> {
		try {
			await this.provider.moveDown(categoryId);

			return {
				success: true,
				message: "Category successfully moved",
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async delete(categoryId: number): Promise<EventResult> {
		try {
			await this.provider.delete(categoryId);

			return {
				success: true,
				message: "Category successfully deleted",
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}
}

