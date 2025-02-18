import { EventResult } from "../../../types/Events";
import { Store } from "../Store";
import SettingsHttpProvider from "./Settings.HttpProvider";
import { SettingsContent } from "./Settings.Types";


export default class SettingsStore extends Store<SettingsContent> {
	
	private _provider: SettingsHttpProvider;

	constructor() {
		super();
		this._provider = new SettingsHttpProvider();
	}

	protected get provider(): SettingsHttpProvider {
		return this._provider as SettingsHttpProvider;
	}

	protected getData(): Promise<SettingsContent> {
		return this.provider.load();
	}

	public async update(settings: SettingsContent) : Promise<EventResult<SettingsContent | null>> {
		try {
			let updated = await this.provider.update(settings);

			return {
				success: true,
				message: "Settings successfully updated",
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
}