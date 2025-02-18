import { Store } from "../Store";
import { EventResult } from "../../../types/Events";
import OffersHttpProvider from "./Gallery.HttpProvider";
import { CreatedImage, ImageContent, UpdatedImage } from "./Gallery.Types";

export default class GalleryStore extends Store<Array<ImageContent>> {
	private _provider: OffersHttpProvider;

	constructor() {
		super();
		this._provider = new OffersHttpProvider();
	}

	protected getData(): Promise<Array<ImageContent>> {
		return this._provider.load();
	}

	protected get provider(): OffersHttpProvider {
		return this._provider as OffersHttpProvider;
	}

	get(imageId : number) : ImageContent | undefined {
		return this._content?.find((item: ImageContent) => {return item.imageId == imageId});
	}

	async addImage(data: FormData): Promise<EventResult<CreatedImage | null>> {
		try {
			let created = await this.provider.addImage(data);

			return {
				success: true,
				message: "Image successfully uploaded",
				info: created
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async updateImage(imageId: number, data: FormData): Promise<EventResult<UpdatedImage | null>> {
		try {
			let updated = await this.provider.updateImage(imageId, data);

			return {
				success: true,
				message: "Image successfully updated",
				info: updated
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async moveImage(target: number, destiny: number): Promise<EventResult> {
		try {
			await this.provider.move(target, destiny);

			return {
				success: true,
				message: "Image successfully moved",
			};
		} catch (error) {
			return {
				success: false,
				errorCode: this.provider.lastErrorCode ?? 0,
				message: String(error),
			};
		}
	}

	async delete(imageId: number): Promise<EventResult> {
		try {
			await this.provider.delete(imageId);

			return {
				success: true,
				message: "Image successfully deleted",
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

