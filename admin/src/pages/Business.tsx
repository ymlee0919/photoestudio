import { MdOutlineCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { StoreStatus } from "../store/remote/Store";

import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import Error  from "../components/Error";
import useStores from "../hooks/useStores";
import { SettingsContent } from "../store/remote/settings/Settings.Types";
import toast from "react-hot-toast";

import { setCurrency, setBusinessName } from "../store/local/slices/globalSlice";
import { useDispatch } from "react-redux"; 

const Business = () => {

    const [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING);
	const stores = useStores();
	const dispatch = useDispatch();

	const {register, setValue, handleSubmit, formState: { errors }} = useForm<SettingsContent>()

	const onSubmit = async (data : SettingsContent) => {
		let loadingToast = toast.loading("Updating settings...");
		let result = await stores.settingsStore.update(data);
		toast.dismiss(loadingToast);

		if (result.success){
			toast.success(result.message);
			if(result.info){
				dispatch(setCurrency(result.info.currency))
				dispatch(setBusinessName(result.info.businessName))
			}
				
		}
		else 
			toast.error(result.message);
		
	}

    useEffect(() => {
        setStatus(StoreStatus.LOADING);
        stores.settingsStore.load(null).then(
			(newStatus: StoreStatus) => {
				setStatus(newStatus)
				if(newStatus == StoreStatus.READY) {
					setValue("businessName", stores.settingsStore.content?.businessName ?? '');
					setValue("address", stores.settingsStore.content?.address ?? '');
					setValue("phone", stores.settingsStore.content?.phone ?? '');
					setValue("currency", stores.settingsStore.content?.currency ?? '');
					setValue("email", stores.settingsStore.content?.email ?? '');
				}
			}
		);
		return () => {stores.settingsStore.release}
    }, []);

    return (
		<>
			<Breadcrumbs
				pages={[
					{ url: "/", label: "Dashboard" },
					{ url: ".", label: "Business" },
				]}
			/>

            {status == StoreStatus.LOADING ? <Loading /> : ''}
        	{status == StoreStatus.ERROR ? <Error text={stores.galleryStore.lastError} /> : ''}
			
			{status == StoreStatus.READY ? 
			/** Main component */
			<>
			<form id="main-form" method="post" onSubmit={handleSubmit(onSubmit)}>
				<div className="panel">
					<div className="panel-header">
						<span className="title">Business</span>
					</div>
					<div className="panel-content">
						<div className="flex flex-wrap gap-3">
							<div className="w-full md:w-3/12 sm:w-4/12">
								<label className="form-control w-full max-w-xs">
									<div className="label">
										<span className="label-text">Business name</span>
									</div>
									<input
                                        {...register("businessName", {required: true})}
										type="text"
										placeholder="Your business name"
										className="input input-bordered w-full max-w-xs"
									/>
									{errors.businessName && 
									<div className="label">
										<span className="label-text text-red-500 text-sm">The business name is required</span>
									</div>}
								</label>
							</div>
							<div className="w-full md:w-6/12 sm:w-7/12">
								<label className="form-control w-full min-w-full">
									<div className="label">
										<span className="label-text">Address</span>
									</div>
									<input
                                        {...register("address", {required: true})}
										type="text"
										placeholder="Your address"
										className="input input-bordered w-full min-w-full"
									/>
									{errors.address && 
									<div className="label">
										<span className="label-text text-red-500 text-sm">You must provide your business address</span>
									</div>}
								</label>
							</div>
							<div className="w-full md:w-3/12 sm:w-5/12">
								<label className="form-control w-full max-w-xs">
									<div className="label">
										<span className="label-text">Phone</span>
									</div>
									<input
                                        {...register("phone", {required: true})}
										type="text"
										placeholder="Your contact phone"
										className="input input-bordered w-full max-w-xs"
									/>
									{errors.phone && 
									<div className="label">
										<span className="label-text text-red-500 text-sm">Your contact phone is required</span>
									</div>}
								</label>
							</div>
							<div className="w-full md:w-4/12 sm:w-6/12">
								<label className="form-control w-full max-w-xs">
									<div className="label">
										<span className="label-text">Email</span>
									</div>
									<input
                                        {...register("email", {required: true})}
										type="email"
										placeholder="Business email"
										className="input input-bordered w-full max-w-xs"
									/>
									{errors.email && 
									<div className="label">
										<span className="label-text text-red-500 text-sm">The business email is required</span>
									</div>}
								</label>
							</div>
							<div className="w-full md:w-2/12 sm:w-4/12">
								<label className="form-control w-full max-w-xs">
									<div className="label">
										<span className="label-text">Currency</span>
									</div>
									<input
                                        {...register("currency", {
											required: true, 
											minLength : {
												value: 3,
												message: 'The currency must hava 3 characters'
											},
											maxLength : {
												value: 3,
												message: 'The currency can only have 3 characters'
											}
										})
										}
										type="text"
										placeholder="Payment currency"
										className="input input-bordered w-full max-w-xs"
									/>
									{errors.currency && 
									<div className="label">
										<span className="label-text text-red-500 text-sm">The currency is required</span>
									</div>}
								</label>
							</div>
						</div>
					</div>
					<div className="panel-footer text-right">
						<button className="btn btn-primary btn-sm" type="submit">
							<MdOutlineCheck className="text-xl" />
							Apply
						</button>
					</div>
				</div>
			</form>
		</>
		/** END OF Main component */

		: ''}
		</>
	);
}

export default Business;