import { MouseEvent, useState, useEffect, useRef } from "react";
import { MdDelete, MdEditSquare, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineAdd } from "react-icons/md";

import useStores from "../hooks/useStores";
import { StoreStatus } from "../store/remote/Store";

import Loading from "../components/Loading";
import Error  from "../components/Error";
import Breadcrumbs from "../components/Breadcrumbs";

import { CategoryContent } from "../store/remote/categories/Categories.Types";
import NewCategoryDialog from "./categories/NewCategoryDialog";
import EditCategoryDialog from "./categories/EditCategoryDialog";
import DeleteCategoryDialog from "./categories/DeleteCategoryDialog";
import toast from "react-hot-toast";


const Categories =() => {

    let [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING);
    let [selectedItem, setSelectedItem] = useState<CategoryContent|undefined>();

    const addModalRef = useRef<HTMLDialogElement>(null);
    const editModalRef = useRef<HTMLDialogElement>(null);
    const deleteModalRef = useRef<HTMLDialogElement>(null);

    const stores = useStores();

    const reload = () => {
        setStatus(StoreStatus.LOADING);
		setSelectedItem(undefined);
        
        stores.categoriesStore.load(null).then(
			(newStatus: StoreStatus) => {
				setStatus(newStatus);
			}
		);
    }

	const moveUp = async () => {
		if(selectedItem){
			let loadingToast = toast.loading("Moving category...");
			let result = await stores.categoriesStore.moveUp(selectedItem.categoryId);
			toast.dismiss(loadingToast);

			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}

			reload();
		}
	};

	const moveDown = async () => {
		if(selectedItem){
			let loadingToast = toast.loading("Moving category...");
			let result = await stores.categoriesStore.moveDown(selectedItem.categoryId);
			toast.dismiss(loadingToast);

			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}

			reload();
		}
	};

	console.log((stores.categoriesStore.content?.length));
	console.log((selectedItem));
    
	useEffect(() => {
		reload();
		return () => {stores.categoriesStore.release()}
	}, []);

    return (
		<>
			<Breadcrumbs
				pages={[
					{ url: "/", label: "Dashboard" },
					{ url: ".", label: "Categories" },
				]}
			/>

			{status == StoreStatus.LOADING ? <Loading /> : ""}
			{status == StoreStatus.ERROR ? <Error text={stores.categoriesStore.lastError} /> : ""}

			{status == StoreStatus.READY ? (
				/** Main component */
				<>
					<div className="panel">
						<div className="panel-header">
							<span className="title">Categories</span>
						</div>
						<div className="panel-content no-padding">
							<div className="overflow-x-auto">
								<div className="border-2 border-solid border-gray-300">
									<div className="navbar bg-gray-300 min-h-1 p-1">
										<div className="flex-1">
											<a
												className="btn btn-ghost text-slate-500 btn-sm text-sm mr-2 rounded-none"
												onClick={() => {
													addModalRef.current?.showModal();
												}}
											>
												<MdOutlineAdd /> Add
											</a>

											<a
												className={`btn btn-ghost text-slate-500 btn-sm text-sm mx-2 rounded-none ${
													selectedItem ?? "btn-disabled"
												}`}
												onClick={() => {
													editModalRef.current?.showModal();
												}}
											>
												<MdEditSquare /> Edit
											</a>

											<a
												className={`btn btn-ghost text-slate-500 btn-sm text-sm mx-2 rounded-none ${
													selectedItem ?? "btn-disabled"
												}`}
												onClick={() => {
													deleteModalRef.current?.showModal();
												}}
											>
												<MdDelete /> Delete
											</a>
										</div>
										<div className="flex-none">
											<a
												className={`btn btn-ghost text-slate-500 btn-sm text-sm mx-2 rounded-none ${
													(!!selectedItem && selectedItem.position > 1)   ? '' : "btn-disabled"
												}`}
												onClick={moveUp}
											>
												<MdKeyboardArrowUp />
											</a>

											<a
												className={`btn btn-ghost text-slate-500 btn-sm text-sm mx-2 rounded-none ${
													(!!selectedItem && !!stores.categoriesStore.content && selectedItem.position < stores.categoriesStore.content.length) ? '' : "btn-disabled"
												}`}
												onClick={moveDown}
											>
												<MdKeyboardArrowDown />
											</a>
										</div>
									</div>
									<table className="table table-grid">
										{/* head */}
										<thead>
											<tr>
												<th>Categories</th>
											</tr>
										</thead>
										<tbody>
											{/* rows */}
											{stores.categoriesStore.content?.length == 0 ? (
												<tr aria-rowspan={2} className="text-center">
													<td data-label="User">No categories registered</td>
												</tr>
											) : (
												stores.categoriesStore.content?.map((category) => (
													<tr
														className={`hover ${
															category.categoryId == selectedItem?.categoryId ? "active" : ""
														}`}
														data-id={category.categoryId}
														key={category.categoryId}
														onClick={(e: MouseEvent<HTMLTableRowElement>) => {
															setSelectedItem(
																stores.categoriesStore.get(
																	parseInt(
																		e.currentTarget.getAttribute("data-id") ?? "0"
																	)
																)
															);
														}}
													>
														<td data-label="Category">{category.category}</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<NewCategoryDialog
						ref={addModalRef}
						onChange={async (category: string) => {
							let result = await stores.categoriesStore.addCategory(category);
							if (result.success) reload();
							return result;
						}}
					/>

					<EditCategoryDialog
						ref={editModalRef}
						category={selectedItem?.category ?? ""}
						onChange={async (category: string) => {
							let result = await stores.categoriesStore.updateCategory(selectedItem?.categoryId ?? 0, category);
							if (result.success) reload();
							return result;
						}}
					/>

					<DeleteCategoryDialog
						ref={deleteModalRef}
						category={selectedItem?.category ?? ""}
						onChange={async () => {
							let result = await stores.categoriesStore.delete(selectedItem?.categoryId ?? 0);
							if (result.success) reload();
							return result;
						}}
					/>
				</>
			) : (
				/** END OF Main component */

				""
			)}
		</>
	);
}

export default Categories;