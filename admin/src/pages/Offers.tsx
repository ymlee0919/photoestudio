import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdCopyAll, MdDelete, MdEdit, MdOutlineAdd } from "react-icons/md";

import useStores from "../hooks/useStores";

import { IOfferItem } from "../store/remote/offers/OfferInfo";
import { StoreStatus } from "../store/remote/Store";

import Breadcrumbs from "../components/Breadcrumbs";
import Loading from "../components/Loading";
import Error  from "../components/Error";
import toast from "react-hot-toast";

import { setOffers } from "../store/local/slices/globalSlice";
import { useDispatch } from "react-redux"; 
import { useSelector } from 'react-redux'; 
import { RootState } from "../store/local/store"; 
import { OfferContent } from "../store/remote/offers/Offers.Types";

export interface OfferInfoForm {
	price: number,
	type: string,
	categoryId: number,
	name: string,
	showHome: boolean,
	items: number,
	main: boolean
}

type OfferSelection = {
	offerId: number;
	price: number;
}

const Offers = () => {

    let [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING);
	let [selected, setSelected] = useState<OfferSelection|null>(null);
	const currency = useSelector((state: RootState) => state.global.currency);

	const dispatch = useDispatch();
	const stores = useStores();
	let modalRef = useRef<HTMLDialogElement>(null);

	let reload = () => {
		setStatus(StoreStatus.LOADING);
		stores.offersStore.load(null).then(
			(newStatus: StoreStatus) => { 
				setStatus(newStatus);
				if (newStatus == StoreStatus.READY && stores.offersStore.content)
					dispatch(setOffers(stores.offersStore.content.length));
			}
		);

		stores.categoriesStore.load(null);
	}

	useEffect(() => {
		reload();
		return () => { stores.offersStore.release() }
	}, []);

	const onDelete = async () => {
		if(selected) {
			let loadingToast = toast.loading("Deleting offer...");
			let result = await stores.offersStore.delete(selected.offerId);
			toast.dismiss(loadingToast);

			if (result.success) {
				modalRef.current?.close();
				toast.success(result.message);
				reload();
			} else {
				toast.error(result.message);
			}
		}
			
	}

    return (
		<>
			<Breadcrumbs
				pages={[
					{ url: "/", label: "Dashboard" },
					{ url: ".", label: "Offers" },
				]}
			/>

			{status == StoreStatus.LOADING ? <Loading /> : ''}
			{status == StoreStatus.ERROR ? <Error text={stores.offersStore.lastError} /> : ''}
			{status == StoreStatus.READY ? 
				/** Main component */
				<>
				<div className="flex pb-5 mb-2">
					<div className="flex-1 pl-3 mt-2">
						<small className="italic">Note: Please, select only 3 or 4 to show in home page</small>
					</div>
					<div className="flex-none">
						<NavLink to={"/offers/new"} className="btn btn-primary btn-sm">
							<MdOutlineAdd className="text-xl" /> New offer
						</NavLink>
					</div>
				</div>
				<br></br>
				
				{stores.offersStore.content?.length == 0 ? <>
					<br></br>
					<br></br>
					<br></br>
					<p className="text-center">No offers registered</p>
					</> :
				
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-7">
						{ stores.offersStore.content?.map((offer: OfferContent) => {
							return (
								<div key={offer.offerId} className={`card ${offer.main ? 'bg-amber-100' : 'bg-base-100'} shadow-xl ${offer.showHome ? 'indicator w-full' : ''}`}>
									{!offer.showHome || <span className="indicator-item badge badge-success"></span>}
									<div className="card-body mb-8">
										<div className="text-center">
											<h3 className="text-xl pt-0 mt-0">{offer.Category.category}</h3>
										</div>
										<div className="flex border-b">
											<div className="flex-1">
												<h2 className={`card-title  ${offer.main ? 'border-b-amber-200' : ''}`}>{offer.name}</h2>
											</div>
											<div className="flex-none">
												<h2 className="text-right text-xl">{offer.price} {currency}</h2>
											</div>
										</div>
										<h3 className="text-sm italic text-success text-right">{offer.type}</h3>
										
										<div>
											{offer.Items.map((item: IOfferItem) => {
												return <p key={item.offerItemId}>{item.itemName}</p>;
											})}
										</div>
										<div className="card-actions absolute w-11/12 bottom-3 left-3 right-2">
											<div className="flex-1">
												<NavLink to={`/offers/${offer.offerId}/copy`} className="btn btn-info btn-outline btn-sm">
													<MdCopyAll/>
												</NavLink>
											</div>
											<div className="flex-none">
												<NavLink to={`/offers/${offer.offerId}/edit`} className="btn btn-success btn-outline btn-sm mx-2">
													<MdEdit/>
												</NavLink>
												<a className="btn btn-error btn-outline btn-sm"
													onClick={() => {
														setSelected({offerId: offer.offerId, price: offer.price});
														modalRef.current?.showModal();
													}}
												>
													<MdDelete/>
												</a>
											</div>
										</div>
									</div>
								</div>
								
							);
						})
					}
					</div>
				}
				

				<dialog ref={modalRef} className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Delete offer</h3>
						<br></br>
						<p className="italic">{selected?.price} USD</p>
						<br></br>
						<p>Are you sure you want to delete the selected offer?</p>
						<div className="modal-action">
							<a className="btn btn-info btn-sm mr-5" onClick={onDelete}>Yes, delete</a>
							<a className="btn btn-sm" onClick={()=>modalRef.current?.close()}>No, close</a>
						</div>
					</div>
				</dialog>

				</>
				/** END OF Main component */
			:''}
		</>
	);
}

export default Offers;