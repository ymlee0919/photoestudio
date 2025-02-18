import { Store } from "../Store";
import { EventResult } from "../../../types/Events";

import { CreatedService, ServiceContent, UpdatedService } from "./Services.Types";
import ServicesHttpProvider from "./Services.HttpProvider";

export default class ServicesStore extends Store<Array<ServiceContent>> {
	private _provider: ServicesHttpProvider;

	constructor() {
		super();
		this._provider = new ServicesHttpProvider();
	}

	protected getData(): Promise<Array<ServiceContent>> {
		return this._provider.load();
	}

	protected get provider(): ServicesHttpProvider {
		return this._provider as ServicesHttpProvider;
	}

	get(serviceId: number): ServiceContent | undefined {
		return this._content?.find((item: ServiceContent) => {
			return item.serviceId == serviceId;
		});
	}

	async addService(data: FormData): Promise<EventResult<CreatedService | null>> {
		try {
			let created = await this.provider.addService(data);

			return {
				success: true,
				message: "Service successfully created",
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

	async updateService(serviceId: number, data: FormData): Promise<EventResult<UpdatedService | null>> {
		try {
			let updated = await this.provider.updateService(serviceId, data);

			return {
				success: true,
				message: "Service successfully updated",
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

	async delete(imageId: number): Promise<EventResult> {
		try {
			await this.provider.delete(imageId);

			return {
				success: true,
				message: "Service successfully deleted",
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

