import { useRef, useImperativeHandle, forwardRef } from "react";
import { CommonProps } from "../../types/Common";
import toast from "react-hot-toast";
import { EventResult } from "../../types/Events";

export interface DeleteCategoryDialogProps extends CommonProps {
    category: string;
    onChange: () => Promise<EventResult>;
}

const DeleteCategoryDialog = forwardRef( (props : DeleteCategoryDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        return {
            showModal: () => {
                if(!!modalRef.current)
                    modalRef.current.showModal();
            }
        }
    });

    const onDelete = async () => {
        let loadingToast = toast.loading('Deleting category...');
        let result = await props.onChange();
        toast.dismiss(loadingToast);

        if(result.success)
        {
            modalRef.current?.close();
            toast.success(result.message);
        }
        else {
            toast.error(result.message);
        }
    }

    return <>
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete category</h3>
                <br></br>
                <p>Are you sure you want to delete the category <span className="italic">{props.category}</span>?</p>
                <div className="modal-action">
                    <a className="btn btn-info btn-sm mr-5" onClick={onDelete}>Yes, delete</a>
                    <a className="btn btn-sm" onClick={()=>modalRef.current?.close()}>No, close</a>
                </div>
            </div>
        </dialog>
    </>
});

export default DeleteCategoryDialog;