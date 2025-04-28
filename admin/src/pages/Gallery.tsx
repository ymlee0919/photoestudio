import { useEffect, useState, MouseEvent, useRef } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { StoreStatus } from "../store/remote/Store";
import useStores from "../hooks/useStores";
import { MdOutlineFileDownload, MdClose,  MdOutlineAdd, MdEdit, MdDelete, MdOutlineSwapHoriz } from "react-icons/md";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import Error  from "../components/Error";
import NewImageDialog from "./gallery/NewImageDialog";
import { ImageContent } from "../store/remote/gallery/Gallery.Types";
import DeleteImageDialog from "./gallery/DeleteImageDialog";
import UpdateImageDialog from "./gallery/UpdateImageDialog";

import { setImages } from "../store/local/slices/globalSlice";
import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "../store/local/store";

enum GalleryAction {
    None, Moving
}

const Gallery = () => {
    const [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING);
    const dispatch = useDispatch();
    
    let [action, setAction] = useState<GalleryAction>(GalleryAction.None);
    let [selected, setSelected] = useState<ImageContent|undefined>(undefined);
    let [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const galleryLimit = useSelector((state: RootState) => state.global.galleryLimit);
    
    let addModalRef = useRef<HTMLDialogElement>();
    let updateModalRef = useRef<HTMLDialogElement>();
    let deleteModalRef = useRef<HTMLDialogElement>();

    const stores = useStores();

    let selectImage = (imageId: number | string) => {
        let id = (typeof imageId == "string") ? parseInt(imageId) : imageId;
        let img = stores.galleryStore.get(id);
        setSelected(img);
    }

    let handleEditBtnClick = (e : MouseEvent<HTMLButtonElement>) => {
        selectImage(e.currentTarget.getAttribute('data-img') ?? '0');
        updateModalRef.current?.showModal()
    }

    let handleDeleteBtnClick = (e : MouseEvent<HTMLButtonElement>) => {
        selectImage(e.currentTarget.getAttribute('data-img') ?? '0');
        deleteModalRef.current?.showModal()
    }

    let handleMoveBtnClick = (e : MouseEvent<HTMLButtonElement>) => {
        toast('Select the place you want to move the selected image');

        selectImage(e.currentTarget.getAttribute('data-img') ?? '0');
        setSelectedIndex(parseInt(e.currentTarget.getAttribute('data-index') ?? '-1'));
        setAction(action == GalleryAction.None ? GalleryAction.Moving : GalleryAction.None);
    }

    let handleSetPositionBtnClick = async (e : MouseEvent<HTMLAnchorElement>) => {
        let destiny = parseInt(e.currentTarget.getAttribute('data-target') ?? '0');

        if(destiny && !!selected)
        {
            toast.dismiss();
            let loadingToast = toast.loading('Moving image...');
            let result = await stores.galleryStore.moveImage(selected.imageId ?? 0, destiny);
            toast.dismiss(loadingToast);

            if(result.success)
            {
                reload();
                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
        }
        
    }

    const reload = () => {
        setStatus(StoreStatus.LOADING);
        selectImage(0);
        setSelectedIndex(0);
        setAction(GalleryAction.None);
        
        stores.galleryStore.load(null).then(
            (newStatus: StoreStatus) => {
                setStatus(newStatus);
                if(newStatus == StoreStatus.READY && stores.galleryStore.content)
                    dispatch(setImages(stores.galleryStore.content.length))
            }
        );
    }
    
    useEffect(() => {
        reload();
        return () => {stores.galleryStore.release()}
    }, []);

    let addImage = async (data: FormData) => {
        let loadingToast = toast.loading("Uploading image...");
        let result = await stores.galleryStore.addImage(data);
        toast.dismiss(loadingToast);

        if (result.success) {
            addModalRef.current?.close();
            toast.success(result.message);
            reload();
        } else {
            toast.error(result.message);
        }
    }

    let updateImage = async (data: FormData) => {
        if(selected){
            let loadingToast = toast.loading("Updating image...");
            let result = await stores.galleryStore.updateImage(selected.imageId, data);
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

    let deleteImage = async () => {
        if(selected) {
            let loadingToast = toast.loading("Deleting image...");
            let result = await stores.galleryStore.delete(selected.imageId);
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
    
    return <>
        <Breadcrumbs pages={[
            {url: '/', label: 'Dashboard' },
            {url: '.', label: 'Gallery'}
        ]} />

        {status == StoreStatus.LOADING ? <Loading /> : ''}
        {status == StoreStatus.ERROR ? <Error text={stores.galleryStore.lastError} /> : ''}

        {status == StoreStatus.READY ? 
            /** Main component */
            <>
            <div className="flex pb-5 mb-2">
                <div className="flex-1 pl-3 mt-2">
                    Photos: <strong>{stores.galleryStore.content?.length}</strong> / {galleryLimit}<br></br>
                    <small className="italic">*Note: Only the fisrt 8 will be shown in home page</small>
                </div>
                <div className="flex-none">
                    {  // Display cancel button when moving, otherwise the add button
                        action == GalleryAction.None && stores.galleryStore.content && stores.galleryStore.content.length <= galleryLimit
                        ?
                        <a className="btn btn-primary btn-sm"
                            onClick={() => {addModalRef.current?.showModal()}}
                        >
                            <MdOutlineAdd className="text-xl" /> Add
                        </a> 
                        : 
                        <><a className="btn btn-info btn-sm" onClick={() => {
                            setAction(GalleryAction.None)
                            selectImage(0);
                            setSelectedIndex(-1);
                        }}>
                            <MdClose  className="text-xl" /> Cancel
                        </a>
                        
                        </>
                    }
                </div>  
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-3 gap-3">
                {stores.galleryStore.content?.length == 0 ? <>
					<br></br>
					<br></br>
                    <br></br>
					<p className="text-center">No images registered</p>
                </> :
                stores.galleryStore.content?.map((photo: ImageContent, index: number) => {
                    return (
                        <div key={photo.imageId} className={`card bg-base-100 shadow-xl ${selected?.imageId != photo.imageId || 'bg-slate-200'} ${action != GalleryAction.Moving || 'mx-6'}`}>
                            {!(action == GalleryAction.Moving && index < selectedIndex) || <>
                                <a 
                                    data-target={photo.imageId}
                                    className="btn btn-sm btn-ghost absolute top-12 -left-9 rounded-none"
                                    onClick={handleSetPositionBtnClick}
                                >
                                    <MdOutlineFileDownload className="text-3xl"/>
                                </a>
                            </>}

                            <figure className="p-3 flex items-center justify-center">
                                <img src={photo.remoteUrl} alt="Image"></img>
                            </figure>

                            {!(action == GalleryAction.Moving && index > selectedIndex) || <>
                                <a 
                                    data-target={photo.imageId}
                                    className="btn btn-sm btn-ghost absolute top-12 -right-9 rounded-none"
                                    onClick={handleSetPositionBtnClick}
                                >
                                    <MdOutlineFileDownload className="text-3xl"/>
                                </a>
                            </>}
                            <div className="card-body p-4">
                                <div className="card-actions min-h-2 justify-end absolute bottom-4 right-4 left-1">
                                {
                                    // Hide buttons when moving
                                    action == GalleryAction.Moving 
                                    ? <></> 
                                    :<>
                                        <div className="absolute left-1">
                                            <button 
                                                data-img={photo.imageId} 
                                                data-index={index} 
                                                className="btn btn-xs" 
                                                onClick={handleMoveBtnClick}
                                            > <MdOutlineSwapHoriz className="text-lg"/> </button>
                                        </div>
                                        <button 
                                            data-img={photo.imageId} 
                                            className="btn btn-info btn-xs btn-outline btn-ghost"
                                            onClick={handleEditBtnClick}
                                        >
                                            <MdEdit className="text-lg"/>
                                        </button>
                                        <button 
                                            data-img={photo.imageId} 
                                            className="btn btn-error btn-xs btn-outline btn-ghost"
                                            onClick={handleDeleteBtnClick}
                                        >
                                            <MdDelete className="text-lg" />
                                        </button>
                                        </>
                                }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <NewImageDialog 
                ref={addModalRef}
                onChange={addImage}
            />

            <UpdateImageDialog 
                ref={updateModalRef}
                imageUrl={selected?.remoteUrl}
                onChange={updateImage}
            />

            <DeleteImageDialog 
                ref={deleteModalRef}
                imageUrl={selected?.remoteUrl}
                onChange={deleteImage}
            />

            </>
            /** END OF Main component */
        :''}
    </>
}

export default Gallery;