import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommonProps } from "../../types/Common";
import { MdOutlineCloudUpload } from "react-icons/md";

type FormValues = { file: FileList; };

export interface NewImageDialogProps extends CommonProps {
    onChange: (data: FormData) => void;
}

const NewImageDialog = forwardRef( (props: NewImageDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);
    const { register, handleSubmit, watch } = useForm<FormValues>();
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
						<h3 className="font-bold text-lg">Add new image</h3>
						<br></br>
						<div className="indicator">
							<span className="indicator-item indicator-bottom">
								<label
									htmlFor="addServiceUpload"
									className="flex  bg-slate-700 hover:bg-slate-500 text-sm text-white px-2 py-1 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
								>
									<MdOutlineCloudUpload className="text-2xl pr-2" />
									Upload
									<input
										type="file"
										id="addServiceUpload"
										{...register("file", { required: true })}
										accept="image/*"
										className="hidden"
									/>
								</label>
							</span>

							{!!preview ? (
								<div className="avatar">
									<div className="w-32 rounded">
										<img src={preview} />
									</div>
								</div>
							) : (
								<div className="bg-base-300 grid h-32 w-32 place-items-center">No image</div>
							)}
						</div>
						<div className="modal-action">
							<button type="submit" disabled={!preview} className="btn btn-info btn-sm mr-5">
								Add
							</button>
							<a className="btn btn-sm" onClick={() => modalRef.current?.close()}>
								Close
							</a>
						</div>
					</div>
				</dialog>
			</form>
		</>
	);

})

export default NewImageDialog;