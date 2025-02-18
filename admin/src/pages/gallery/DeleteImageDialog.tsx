import { forwardRef, useRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { CommonProps } from "../../types/Common";

export interface DeleteImageDialogProps extends CommonProps {
    imageUrl: string | undefined;
    onChange: () => void;
}

const DeleteImageDialog = forwardRef( (props: DeleteImageDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);
    const { handleSubmit } = useForm();

    useImperativeHandle(ref, () => {
            return {
                showModal: () => {
                    modalRef.current?.showModal();
                },
                close: () => {
                    modalRef.current?.close();
                }
            }
        });

        const onSubmit = async () => { 
            props.onChange();           
        };

    return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<dialog ref={modalRef} className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Delete image</h3>
						<br></br>
						<div className="avatar">
							<div className="w-32 rounded">
								<img src={props.imageUrl && `http://localhost:3000/images/gallery/${props.imageUrl}`} />
							</div>
						</div>
						<br></br>
						<br></br>
						<p>Are you sure you want to delete the image?</p>
						<div className="modal-action">
							<button type="submit" className="btn btn-error btn-sm mr-5">
								Yes, delete
							</button>
							<a className="btn btn-sm" onClick={() => modalRef.current?.close()}>
								No, close
							</a>
						</div>
					</div>
				</dialog>
			</form>
		</>
	);

})

export default DeleteImageDialog;