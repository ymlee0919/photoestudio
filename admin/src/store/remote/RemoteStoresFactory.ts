import AccountsStore from "./accounts/Accounts.Store";
import DashboarStore from "./dashboard/Dashboard.Store";
import GalleryStore from "./gallery/Gallery.Store";
import {OffersStore, SingleOfferStore} from "./offers/Offers.Store";
import SettingsStore from "./settings/Settings.Store";
import ServicesStore from "./services/Services.Store";
import CategoriesStore from "./categories/Categories.Store";

/**
 * Class to provide all stores
 */
export default class RemoteStoresFactory {

    // Private fields
    private _settingsStore: SettingsStore | null = null;

    private _accountsStore: AccountsStore | null = null;

    private _offersStore: OffersStore | null = null;

    private _singleOffersStore: SingleOfferStore | null = null;

    private _galleryStore: GalleryStore | null = null;

    private _dashboardStore: DashboarStore | null = null;

    private _servicesStore: ServicesStore | null = null;
    
    private _categoriesStore: CategoriesStore | null = null;
    
    // Public properties
    public get settingsStore() : SettingsStore {
        if(this._settingsStore == null)
            this._settingsStore = new SettingsStore();

        return this._settingsStore;
    }

    public get accountsStore() : AccountsStore {
        if(this._accountsStore == null)
            this._accountsStore = new AccountsStore();

        return this._accountsStore;
    }

    public get offersStore() : OffersStore {
        if(this._offersStore == null)
            this._offersStore = new OffersStore();

        return this._offersStore;
    }

    public get singleOffersStore() : SingleOfferStore {
        if(this._singleOffersStore == null)
            this._singleOffersStore = new SingleOfferStore();

        return this._singleOffersStore;
    }

    public get galleryStore() : GalleryStore {
        if(this._galleryStore == null)
            this._galleryStore = new GalleryStore();

        return this._galleryStore;
    }

    public get dashboardStore() : DashboarStore {
        if(this._dashboardStore == null)
            this._dashboardStore = new DashboarStore();

        return this._dashboardStore;
    }

    public get servicesStore(): ServicesStore {
         if(this._servicesStore == null)
            this._servicesStore = new ServicesStore();
        return this._servicesStore;
    }

    public get categoriesStore(): CategoriesStore {
        if(this._categoriesStore == null)
           this._categoriesStore = new CategoriesStore();
       return this._categoriesStore;
   }
}