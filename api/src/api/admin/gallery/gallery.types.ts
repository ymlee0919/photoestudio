
export interface ImageInfo {
    imageId: number;
    imageUrl: string;
    remoteUrl: string;
    position: number;
}



export interface CreatedImage {
    imageId: number;
    imageUrl: string;
    remoteUrl: string;
    position: number;
    createdAt: Date;
}

export interface UpdatedImage {
    imageId: number;
    imageUrl: string;
    remoteUrl: string;
    position: number;
    updatedAt: Date;
    old: ImageInfo;
}
