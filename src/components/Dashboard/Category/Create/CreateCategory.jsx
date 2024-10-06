"use client"
import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react"
import { CaseUpper, SpellCheck, Text } from "lucide-react"

import { ApiActions } from "@/src/utils/Frontend/ApiActions";


const CreateCategory = () => {

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
                setPreviewBase64(null)

            };

            reader.readAsDataURL(file);
        }
    };


    const [arrayImmages, setArrayImmages] = useState([])
    const [preview, setPreview] = useState(null);

    const [categoryInput, setCategoryInput] = useState("");
    const [description, setDescription] = useState("");
    const [urlInput, setUrlInput] = useState("");

    const [previewBase64, setPreviewBase64] = useState("");


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setArrayImmages([file]);
            setPreviewBase64(null)
        };
        reader.readAsDataURL(file);

    };
    const searchParams = useSearchParams();

    const idCategory = searchParams.get("id");
    
    const { create_Category  , edit_Category} = ApiActions()

    const createNewCategory = () => {

        const formData = new FormData();
        formData.append("title", categoryInput);
        formData.append("description", description);
        formData.append("route", urlInput);

        formData.append("file", arrayImmages[0]);
        
        if(idCategory){
            
            edit_Category(`/api/category/${idCategory}`, formData).then((res) => {
                console.log(res)
                if (res) {
                    // changeRoute
                }
            })
        }else{
            create_Category("/api/category", formData).then((res) => {
                console.log(res)
                if (res) {
                    // changeRoute
                }
            })
        }
     
    }




    const { get_OneCategory } = ApiActions()

    useEffect(() => {
        get_OneCategory(idCategory).then((res => {
            if (res?.success) {
                const data = res.results
                const { title, description, route, } = data
                setCategoryInput(title)
                setDescription(description)
                setUrlInput(route)
                setPreviewBase64(res.images)
                setPreview(null)
            }
        }))
    }, [])
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
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
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
                {previewBase64 &&
                    <div className="mt-4 " >
                        <img src={`data:image/webp;base64,${previewBase64}`} alt="previewBase64" className="max-w-full h-auto aspect-square w-full object-cover border-2 rounded-md border-gray-100 border-solid " />
                    </div>
                }



            </div>
            <Button onClick={createNewCategory} className={`${idCategory ? "bg-blue-600" : "bg-green-700"}  text-white`}>
                {idCategory ? "ادیت" : "ساخت"} دسته بندی 
            </Button>
         
        </>

    )
}

export default CreateCategory