
export interface ServiceContent {
	readonly serviceId: number;
	readonly image: string;
	readonly remoteUrl: string;
	readonly service: string;
}

export interface CreatedService extends ServiceContent {
	readonly createdAt: Date;
}

export interface UpdatedService extends ServiceContent {
	readonly updatedAt: Date;
}