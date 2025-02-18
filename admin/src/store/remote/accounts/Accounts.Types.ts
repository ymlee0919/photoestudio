export interface AccountContent {
	readonly userId: number;
	readonly user: string;
	readonly name: string;
}

export interface AccountCreationDTO {
	readonly name: string;
	readonly user: string;
	readonly password: string;
}

export interface AccountUpdateDTO {
	readonly name: string;
}

export interface AccountCredentialsUpdateDTO {
	readonly user: string;
	readonly password?: string;
}

export interface CreatedAccount {
	userId: number;
	user: string;
	name: string;
	createdAt: Date;
}

export interface UpdatedAccount {
    userId: number;
    user: string;
    name: string;
    updatedAt: Date
}
