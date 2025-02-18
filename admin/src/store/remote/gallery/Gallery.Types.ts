
export interface ImageContent {
	readonly imageId: number;
	readonly imageUrl: string;
	readonly remoteUrl: string;
	readonly position: number;
}

export interface CreatedImage {
	readonly imageId: number;
	readonly imageUrl: string;
	readonly position: number;
	readonly createdAt: Date;
}

export interface UpdatedImage {
	readonly imageId: number;
	readonly imageUrl: string;
	readonly position: number;
	readonly updatedAt: Date;
}