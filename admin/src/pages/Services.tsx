import { useEffect, useState, MouseEvent, useRef } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { StoreStatus } from "../store/remote/Store";
import useStores from "../hooks/useStores";
import { MdOutlineAdd, MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import Error  from "../components/Error";

import NewServiceDialog from "./services/NewServiceDialog";
import DeleteServiceDialog from "./services/DeleteServiceDialog";
import UpdateServiceDialog from "./services/UpdateServiceDialog";

import { useDispatch } from "react-redux"; 
import { ServiceContent } from "../store/remote/services/Services.Types";
import { setServices } from "../store/local/slices/globalSlice";

interface HTMLEditServiceDialogElement extends HTMLDialogElement {
    showDialog : (service: string) => void;
}

const Services = () => {
    const [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING);
    const dispatch = useDispatch();
    
    let [selected, setSelected] = useState<ServiceContent | undefined>(undefined);
    
    let addModalRef = useRef<HTMLDialogElement>();
    let updateModalRef = useRef<HTMLEditServiceDialogElement>();
    let deleteModalRef = useRef<HTMLDialogElement>();

    const stores = useStores();

    let selectService = (serviceId: number | string) : ServiceContent | undefined => {
        let id = (typeof serviceId == "string") ? parseInt(serviceId) : serviceId;
        let service = stores.servicesStore.get(id);
        setSelected(service);
        return service;
    }

    let handleEditBtnClick = (e : MouseEvent<HTMLButtonElement>) => {
        let selected = selectService(e.currentTarget.getAttribute('data-img') ?? '0');
        updateModalRef.current?.showDialog(selected?.service || '');
    }

    let handleDeleteBtnClick = (e : MouseEvent<HTMLButtonElement>) => {
        selectService(e.currentTarget.getAttribute('data-img') || '0');
        deleteModalRef.current?.showModal()
    }

    const reload = () => {
        setStatus(StoreStatus.LOADING);
        selectService(0);
        
        stores.servicesStore.load(null).then(
            (newStatus: StoreStatus) => {
                setStatus(newStatus);
                if(newStatus == StoreStatus.READY && stores.servicesStore.content)
                    dispatch(setServices(stores.servicesStore.content.length))
            }
        );
    }
    
    useEffect(() => {
        reload();
        return () => {stores.servicesStore.release()}
    }, []);

    let addService = async (data: FormData) => {
        let loadingToast = toast.loading("Creating service...");
        let result = await stores.servicesStore.addService(data);
        toast.dismiss(loadingToast);

        if (result.success) {
            addModalRef.current?.close();
            toast.success(result.message);
            reload();
        } else {
            toast.error(result.message);
        }
    }

    let updateService = async (data: FormData) => {
        if(selected){
            let loadingToast = toast.loading("Updating service...");
            let result = await stores.servicesStore.updateService(selected.serviceId, data);
            toast.dismiss(loadingToast);

            if (result.success) {
                updateModalRef.current?.close();
                toast.success(result.message);
                reload();
            } else {
                toast.error(result.message);
            }
        }
    }

    let deleteService = async () => {
        if(selected) {
            let loadingToast = toast.loading("Deleting service...");
            let result = await stores.servicesStore.delete(selected.serviceId);
            toast.dismiss(loadingToast);

            if (result.success) {
                deleteModalRef.current?.close();
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
					{ url: ".", label: "Services" },
				]}
			/>

			{status == StoreStatus.LOADING ? <Loading /> : ""}
			{status == StoreStatus.ERROR ? <Error text={stores.servicesStore.lastError} /> : ""}

			{status == StoreStatus.READY ? (
				/** Main component */
				<>
					<div className="text-right">
						<a
							className="btn btn-primary btn-sm"
							onClick={() => {
								addModalRef.current?.showModal();
							}}
						>
							<MdOutlineAdd className="text-xl" /> Add
						</a>
						<br></br>
						<br></br>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {
                        stores.servicesStore.content?.length == 0 ? <>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p className="text-center">No services registered</p>
                        </> :

                        stores.servicesStore.content?.map((service: ServiceContent) => {
							return (
								<div key={service.serviceId} className="card card-compact bg-base-100 shadow-xl">
									<figure>
										<img
											src={service.remoteUrl}
											alt={service.service}
										></img>
									</figure>
									<div className="card-body">
										<h2 className="card-title">{service.service}</h2>
										<div className="card-actions justify-end">
											<button
												data-img={service.serviceId}
												className="btn btn-info btn-xs btn-outline btn-ghost"
												onClick={handleEditBtnClick}
											>
												<MdEdit className="text-lg" />
											</button>
											<button
												data-img={service.serviceId}
												className="btn btn-error btn-xs btn-outline btn-ghost"
												onClick={handleDeleteBtnClick}
											>
												<MdDelete className="text-lg" />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<NewServiceDialog ref={addModalRef} onChange={addService} />

					<UpdateServiceDialog
						ref={updateModalRef}
						imageUrl={selected?.remoteUrl}
						onChange={updateService}
					/>

					<DeleteServiceDialog
						ref={deleteModalRef}
						service={selected?.service}
						imageUrl={selected?.remoteUrl}
						onChange={deleteService}
					/>
				</>
			) : (
				/** END OF Main component */
				""
			)}
		</>
	);
}

export default Services;