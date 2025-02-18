import HttpProvider from "../HttpProvider";
import { AxiosProvider } from "../Provider";
import { CreatedService, ServiceContent, UpdatedService } from "./Services.Types";

export default class ServicesHttpProvider extends AxiosProvider<Array<ServiceContent>> {
	async load(): Promise<Array<ServiceContent>> {
		try {
			return await HttpProvider.get<null, Array<ServiceContent>>("/services");
		} catch (error: any) {
			this.errorCode = error.response ? error.response.code : 0;
			throw Error(error.response ? error.response.message : "Unable to load the services");
		}
	}

	async addService(data: FormData): Promise<CreatedService | null> {
		try {
			let created = await HttpProvider.post<FormData, CreatedService>("/services", data);
			return created;
		} catch (error: any) {
			this.handleError(error, "Unable to create the service");
		}
		return null;
	}

	async updateService(serviceId: number, data: FormData): Promise<UpdatedService | null> {
		try {
			let updated = await HttpProvider.patch<FormData, UpdatedService>(`/services/${serviceId}`, data);
			return updated;
		} catch (error: any) {
			this.handleError(error, "Unable to update the service");
		}
		return null;
	}

	async delete(serviceId: number): Promise<boolean> {
		try {
			await HttpProvider.delete<any, any>(`/services/${serviceId}`);
		} catch (error: any) {
			this.handleError(error, "Unable to delete the service");
		}
		return true;
	}
}