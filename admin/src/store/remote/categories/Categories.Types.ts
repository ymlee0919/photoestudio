
export interface CategoryContent {
	readonly categoryId: number;
	readonly category: string;
	readonly position: number;
}

export interface CategoryInfo {
	readonly category: string;
}

export interface CreatedCategory extends CategoryContent {
	readonly createdAt: Date;
}

export interface UpdatedCategory extends CategoryContent {
	readonly updatedAt: Date;
}