
export interface CategoryInfo {
    categoryId: number;
    category: string;
    position: number;
}

export interface CreatedCategory extends CategoryInfo {
    createdAt: Date;
}

export interface UpdatedCategory extends CategoryInfo {
    updatedAt: Date;
}
