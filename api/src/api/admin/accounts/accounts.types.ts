
export interface AccountCredentials {
    user: string;
    password?: string;
}

export interface AccountCreation {
    name: string;
    user: string;
    password: string;
}

export interface AccountInfo {
    userId: number;
    user: string;
    name: string;
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
    updatedAt: Date;
}
