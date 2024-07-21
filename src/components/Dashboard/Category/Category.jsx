"use client"
import postFile from "@/src/utils/Frontend/api/formData/PostFile"
import { Input, Button } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"



const Category = () => {

    const [arrayImmages, setArrayImmages] = useState([])
    const [preview, setPreview] = useState([]);

    const [categoryInput, setCategoryInput] = useState("");
    const [textInput, setTextInput] = useState("");



    const handleImageChange = (e) => {
        const files = e.target.files;
        const newPreviews = [];
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newImages.push(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);

                // Once all files are read, update the state
                if (newPreviews.length === files.length) {
                    setPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
                    setArrayImmages((prevImages) => [...prevImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const createCategory = () => {

        const formData = new FormData();
        formData.append("title", categoryInput);
        formData.append("description", textInput);
        formData.append("file", arrayImmages[0]);
        // arrayImmages.forEach((file, index) => {
        //     formData.append(`file${index}`, file);
        // });

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
                        <p>hi</p>
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
                        <p>hi</p>
                    }
                />
              

                <div className="flex items-center justify-center w-full col-span-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100  ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 "> PNG, JPG یا</p>
                        </div>
                        <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                {preview.length !== 0 && (
                    preview.map((e, i) => {
                        {
                            return (
                                <div className="mt-4 " key={i}>
                                    <img src={e} alt="Preview" className="max-w-full h-auto aspect-square w-full object-cover border-2 rounded-md border-gray-100 border-solid " />
                                </div>
                            )
                        }
                    })

                )}


            </div>
            <Button onClick={createCategory} color="primary">
                Button
            </Button>
        </>

    )
}

export default Category