import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommonProps } from "../../types/Common";
import { MdOutlineCloudUpload } from "react-icons/md";

type ServiceFromValues = { service: string; file: FileList; };

export interface NewServiceDialogProps extends CommonProps {
    onChange: (data: FormData) => void;
}

const NewServiceDialog = forwardRef( (props: NewServiceDialogProps, ref) => {

    let modalRef = useRef<HTMLDialogElement>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ServiceFromValues>();
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

    const onSubmit: SubmitHandler<ServiceFromValues> = async (data) => { 
        const formData = new FormData(); 
		if (file) {
            formData.append('image', file[0]);
        }
		formData.append('service', data.service);
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
						<h3 className="font-bold text-lg">Add new service</h3>
						<br></br>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Service</span>
							</div>
							<input
								{...register("service", {
									required: 'The service name is required',
									minLength: {
										value: 5,
										message: "The service name must contains 5 characters minimun",
									},
								})}
								type="text"
								placeholder="Service name"
								className="input input-bordered w-full max-w-xs"
							/>

							{errors.service && (
								<div className="label">
									<span className="label-text text-red-500 text-sm">{errors.service.message}</span>
								</div>
							)}
						</label>
						<br></br>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Image <span className="text-gray-500 text-xs">(600px x 400px)</span></span>
							</div>
						</label>
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

export default NewServiceDialog;