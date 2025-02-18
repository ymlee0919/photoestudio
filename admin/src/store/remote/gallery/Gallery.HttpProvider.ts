import HttpProvider from "../HttpProvider";
import { AxiosProvider } from "../Provider";
import { CreatedImage, ImageContent, UpdatedImage } from "./Gallery.Types";

export default class GalleryHttpProvider extends AxiosProvider<Array<ImageContent>> {
	async load(): Promise<Array<ImageContent>> {
		try {
			return await HttpProvider.get<null, Array<ImageContent>>("/gallery");
		} catch (error: any) {
			this.errorCode = error.response ? error.response.code : 0;
			throw Error(error.response ? error.response.message : "Unable to load the images");
		}
	}

	async addImage(data: FormData): Promise<CreatedImage | null> {
		try {
			let created = await HttpProvider.post<FormData, CreatedImage>("/gallery", data);
			return created;
		} catch (error: any) {
			this.handleError(error, "Unable to add the image");
		}
		return null;
	}

	async updateImage(imageId: number, data: FormData): Promise<UpdatedImage|null> {
		try {
			let updated = await HttpProvider.patch<FormData, UpdatedImage>(`/gallery/${imageId}`, data);
			return updated;
		} catch (error: any) {
			this.handleError(error, "Unable to update the image");
		}
		return null;
	}

	async move(target: number, destiny: number): Promise<boolean> {
		try {
			await HttpProvider.patch<any, any>(`/gallery/${target}/move`, {
				destiny,
			});
		} catch (error: any) {
			this.handleError(error, "Unable to move the image");
		}
		return true;
	}

	async delete(imageId: number): Promise<boolean> {
		try {
			await HttpProvider.delete<any, any>(`/gallery/${imageId}`);
		} catch (error: any) {
			this.handleError(error, "Unable to delete the image");
		}
		return true;
	}
}