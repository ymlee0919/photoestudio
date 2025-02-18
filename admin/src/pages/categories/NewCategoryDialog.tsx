import { useRef, useImperativeHandle, forwardRef } from "react";
import { CommonProps } from "../../types/Common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EventResult } from "../../types/Events";
import { CategoryInfo } from "../../store/remote/categories/Categories.Types";

export interface NewCategoryDialogProps extends CommonProps {
    onChange: (category: string) => Promise<EventResult>;
}

const NewCategoryDialog = forwardRef( (props : NewCategoryDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);

    const {register, reset, handleSubmit, formState: { errors }} = useForm<CategoryInfo>({
        defaultValues: {
            category: ''
        }
    });

    useImperativeHandle(ref, () => {
        return {
            showModal: () => {
                reset();
                modalRef.current?.showModal();
            }
        }
    });

    let onSubmit = async (data: CategoryInfo) => {
		let loadingToast = toast.loading("Creating category...");
		let result = await props.onChange(data.category);
		toast.dismiss(loadingToast);

		if (result.success) {
			modalRef.current?.close();
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg pb-5">New category</h3>
                    <label className="form-control w-full max-w-xs">
                        <input 
                            {...register("category", {
                                required: true, 
                                minLength: {
                                    value: 5, message: 'The name must contains 5 characters minimun'}
                                }
                            )} 
                            type="text" 
                            placeholder="Offer category" 
                            className="input input-bordered w-full max-w-xs" />

                        {errors.category && 
                            <div className="label">
                                <span className="label-text text-red-500 text-sm">{errors.category.message}</span>
                            </div>}
                    </label>
                    
                    <div className="modal-action">
                        <button type="submit" className="btn btn-info btn-sm mr-5">Add</button>
                        <a className="btn btn-sm" onClick={()=>modalRef.current?.close()}>Close</a>
                    </div>
                </div>
            </dialog>
        </form>
    </>
});

export default NewCategoryDialog;