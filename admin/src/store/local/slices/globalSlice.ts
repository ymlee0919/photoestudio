import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
    user: string;
    userName: string;
    businessName: string;
    currency: string;
    accounts: number;
    images: number;
    offers: number;
    services: number;
    galleryLimit: number;
    
    loaded: boolean;
}

interface InitialGlobalState {
    businessName: string;
    currency: string;
    accounts: number;
    images: number;
    offers: number;
    services: number;
    galleryLimit: number;
}

interface UserInfo {
    user: string;
    userName: string;
}

const initialState: GlobalState = {
    user: '',
    userName: '',
    businessName: '',
    accounts: -1,
    images: -1,
    offers: -1,
    services: -1,
    currency: '',
    galleryLimit: -1,
    loaded: false
};

let isStateComplete = (state: GlobalState) : boolean => {
	for(const key in state){
		if (initialState.hasOwnProperty(key) && state.hasOwnProperty(key)){
			if (state[key as keyof GlobalState] == initialState[key as keyof GlobalState]) {
				return false;
			}
		}
	}
	return true;
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAccounts: (state, action: PayloadAction<number>) => {
            state.accounts = action.payload;
			state.loaded = isStateComplete(state);
        },
        setImages: (state, action: PayloadAction<number>) => {
            state.images = action.payload;
			state.loaded = isStateComplete(state);
        },
        setOffers: (state, action: PayloadAction<number>) => {
            state.offers = action.payload;
			state.loaded = isStateComplete(state);
        },
        setServices: (state, action: PayloadAction<number>) => {
            state.services = action.payload;
			state.loaded = isStateComplete(state);
        },
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currency = action.payload;
			state.loaded = isStateComplete(state);
        },
        setBusinessName: (state, action: PayloadAction<string>) => {
            state.businessName = action.payload;
			state.loaded = isStateComplete(state);
        },
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.user = action.payload.user;
            state.userName = action.payload.userName;
			state.loaded = isStateComplete(state);
        },
        setData: (state, action: PayloadAction<InitialGlobalState>) => {
            Object.assign(state, action.payload);
			state.loaded = true;
        }
    },
});

export const { 
    setAccounts, 
    setImages, 
    setOffers, 
    setServices,
    setCurrency, 
    setData, 
    setBusinessName,
    setUser
} = globalSlice.actions;

export default globalSlice.reducer;
