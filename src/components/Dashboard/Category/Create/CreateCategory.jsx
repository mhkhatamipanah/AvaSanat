"use client"
import postFile from "@/src/utils/Frontend/sendApiToBackend/formData/PostFile"
import { Input, Button } from "@nextui-org/react"
import { CaseUpper, SpellCheck, Text } from "lucide-react"
import { useEffect } from "react"
import { useState, useRef } from "react"



const   CreateCategory = () => {

    useEffect(() => {
        const handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('drop', handleDrop);
        return () => {
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('drop', handleDrop);
        };
    }, []);

    const wrapperRef = useRef(null);

    const onDragEnter = () => {
        wrapperRef.current.classList.add('ondrag')
    };

    const onDragLeave = () => wrapperRef.current.classList.remove('ondrag');

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapperRef.current.classList.remove('ondrag')

        const files = e.nativeEvent.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
    
                setPreview(reader.result);
    
                setArrayImmages([file]);
    
            };
    
            reader.readAsDataURL(file);
        }
    };

    //     const onFileDrop = (e) => {
    // console.log(2)

    //         const newFile = e.target.files[0];
    //         if (newFile) {
    //             const updatedList = [...fileList, newFile];
    //             setFileList(updatedList);
    //             props.onFileChange(updatedList);
    //         }
    //     }

    // const fileRemove = (file) => {
    //     const updatedList = [...fileList];
    //     updatedList.splice(fileList.indexOf(file), 1);
    //     setFileList(updatedList);
    //     props.onFileChange(updatedList);
    // }

    const [arrayImmages, setArrayImmages] = useState([])
    const [preview, setPreview] = useState(null);

    const [categoryInput, setCategoryInput] = useState("");
    const [textInput, setTextInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setArrayImmages([file]);
        };
        reader.readAsDataURL(file);

    };
    const createCategory = () => {

        const formData = new FormData();
        formData.append("title", categoryInput);
        formData.append("description", textInput);
        formData.append("route", urlInput);

        formData.append("file", arrayImmages[0]);
       
        postFile("/api/category", formData)
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-10">
                <Input
                    value={categoryInput}
                    onChange={(e) => { setCategoryInput(e.target.value) }}
                    className="labelRight"
                    label="دسته بندی"
                    placeholder="دسته بندی را وارد کنید"
                    labelPlacement="outside"
                    endContent={
                        <SpellCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    value={textInput}
                    onChange={(e) => { setTextInput(e.target.value) }}
                    className="labelRight"
                    label="توضیح کوتاه"
                    placeholder="توضیح کوتاه را وارد کنید"
                    labelPlacement="outside"
                    endContent={
                        <CaseUpper className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                      <Input
                    value={urlInput}
                    onChange={(e) => { setUrlInput(e.target.value) }}
                    className="labelRight"
                    label=" route (بدون اسلش و فاصله)"
                    placeholder="URL را وارد کنید"
                    labelPlacement="outside"
                    endContent={
                        <Text className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
              


                <div className="flex items-center justify-center w-full md:col-span-2 xl:col-span-3 2xl:col-span-4  ">
                    <label ref={wrapperRef}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#ededed] hover:bg-gray-100 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6" style={{ pointerEvents: 'none' }}>
                            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 "> PNG, JPG یا</p>
                        </div>
                        <input onChange={handleImageChange} value="" id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                {preview &&
                    <div className="mt-4 " >
                        <img src={preview} alt="Preview" className="max-w-full h-auto aspect-square w-full object-cover border-2 rounded-md border-gray-100 border-solid " />
                    </div>

                }


            </div>
            <Button onClick={createCategory} color="primary">
                Button
            </Button>
        </>

    )
}

export default CreateCategory