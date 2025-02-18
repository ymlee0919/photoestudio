import HttpProvider from "../HttpProvider";
import { AxiosProvider } from "../Provider";
import { SettingsContent } from "./Settings.Types";



export default class SettingsHttpProvider extends AxiosProvider<SettingsContent> {
	async load(): Promise<SettingsContent> {
		try {
			return await HttpProvider.get<null, SettingsContent>("/settings");
		} catch (error: any) {
			this.errorCode = error.response ? error.response.code : 0;
			throw Error(error.response ? error.response.message : "Unable to load settings");
		}
	}

	async update(newSettings: SettingsContent): Promise<SettingsContent|null> {
		try {
			let updated = await HttpProvider.put<SettingsContent, SettingsContent>(`/settings`, newSettings);
			return updated;
		} catch (error: any) {
			this.handleError(error, "Unable to update the settings");
		}

		return null;
	}
}