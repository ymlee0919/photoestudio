import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommonProps } from "../../types/Common";
import { MdOutlineCloudUpload } from "react-icons/md";

type FormValues = { file: FileList; };

export interface UpdateImageDialogProps extends CommonProps {
    imageUrl: string | undefined;
    onChange: (data: FormData) => void;
}

const UpdateImageDialog = forwardRef( (props: UpdateImageDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);
    const { register, handleSubmit, watch, reset } = useForm<FormValues>();
	const [preview, setPreview] = useState<string | null>(null);
	const file = watch("file");

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
    
    const onSubmit: SubmitHandler<FormValues> = async () => { 
        const formData = new FormData(); 
        if (file) {
            formData.append('image', file[0]);
        }
        props.onChange(formData);           
    };

	useEffect(() => {
		if (file && file.length > 0) {
			const selectedFile = file[0];
			if (selectedFile && selectedFile.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(selectedFile);
			} else {
				setPreview(null);
			}
		}
	}, [file]);

    return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<dialog ref={modalRef} className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Update image</h3>
						<br></br>
						<div className="indicator">
							<span className="indicator-item indicator-bottom z-50">
								<label
									htmlFor="editServiceUpload"
									className="flex  bg-slate-700 hover:bg-slate-500 text-sm text-white px-2 py-1 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
								>
									<MdOutlineCloudUpload className="text-2xl pr-2" />
									Upload
									<input
										type="file"
										id="editServiceUpload"
										{...register("file", { required: true })}
										accept="image/*"
										className="hidden"
									/>
								</label>
							</span>
							<div className="stack">
								{preview && (
									<div className="avatar">
										<div className="w-32 rounded">
											<img src={preview} className="opacity-95" />
										</div>
									</div>
								)}
								<div className="avatar">
									<div
										className="w-32 rounded"
										style={
											preview
												? {
														transform: "translateY(7%) translateX(7%) scale(100%)",
													}
												: {}
										}
									>
										<img
											src={
												props.imageUrl &&
												`http://localhost:3000/images/gallery/${props.imageUrl}`
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-action">
							<button type="submit" disabled={!preview} className="btn btn-info btn-sm mr-5">
								Apply
							</button>
							<a
								className="btn btn-sm"
								onClick={() => {
									reset();
									setPreview(null);
									modalRef.current?.close();
								}}
							>
								Close
							</a>
						</div>
					</div>
				</dialog>
			</form>
		</>
	);

})

export default UpdateImageDialog;