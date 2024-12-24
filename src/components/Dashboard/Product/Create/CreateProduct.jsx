"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react"

import { ApiActions } from "@/src/utils/Frontend/ApiActions"

// NextUI
import { Input, Button, SelectItem, Select, Spinner, Textarea  , Checkbox } from "@nextui-org/react"
// Icon
import { CaseUpper, CircleFadingPlus, Download, FileCheck, SpellCheck, Trash2Icon, X, } from "lucide-react"

// Imoort Components
import FeatureValue from "./FeatureValue"
import SpecificationsValue from "./SpecificationsValue"
import ProductCode from "./ProductCode";

import { toast } from "sonner";
import ModalDelete from '@/src/components/Dashboard/ModalDelete/ModalDelete';


const CreateProduct = () => {
    const router = useRouter();

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

    const [categoryValue, setCategoryValue] = useState(null)
    const [categoryInput, setCategoryInput] = useState("")
    const [brand, setBrand] = useState("")



    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('ondrag');

    const onDragLeave = () => wrapperRef.current.classList.remove('ondrag');

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapperRef.current.classList.remove('ondrag')
        const files = e.nativeEvent.dataTransfer.files;
        if (files && files.length > 0) {
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
                        setPreview((preview) => [...preview, ...newPreviews]);
                        setArrayImmages((arrayImmages) => [...arrayImmages, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };
    const [titleInput, setTitleInput] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionSpecifications, setDescriptionSpecifications] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const [arrayImmages, setArrayImmages] = useState([])
    const [preview, setPreview] = useState([]);
    const [previewBase64, setPreviewBase64] = useState([]);
    const [mainImage, setMainImage] = useState(null)
    const [indexLastImage, setIndexLastImage] = useState(0)

    const [isShowCodeProduct, setIsShowCodeProduct] =useState(false);

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
                    setPreview((preview) => [...preview, ...newPreviews]);
                    setArrayImmages((arrayImmages) => [...arrayImmages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };





    // ModalDelete
    const { delete_Image_Product } = ApiActions()

    const [idDelete, setIdDelete] = useState(null);
    const [rerender, setRerender] = useState(false);
    const toggleRerender = () => {
        setRerender(!rerender)
    }
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const onModalOpenChange = () => {
        setIsOpen(false);
    };

    const deleteEventHandler = async () => {
        if (idDelete >= previewBase64.length) {

            let indexToDelete = idDelete - previewBase64.length;
            // کپی از آرایه‌ها
            let updatedArrayImmages = [...arrayImmages];
            let updatedPreview = [...preview];

            // حذف عنصر از آرایه‌ها
            updatedArrayImmages.splice(indexToDelete, 1);
            updatedPreview.splice(indexToDelete, 1);

            // تنظیم حالت‌ها با آرایه‌های جدید
            setArrayImmages(updatedArrayImmages);
            setPreview(updatedPreview);
        }
        else {
            await delete_Image_Product(idProduct, idDelete).then((res => {
                console.log(res)
                if (res) {
                    toggleRerender()
                }
            }))

        }


    };

    const searchParams = useSearchParams();

    const idProduct = searchParams.get("id");

    const { get_OneProduct, get_CategoryProduct } = ApiActions()

    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(() => {
        let data = {
            allId: true
        };
        get_CategoryProduct(data).then((res) => {
            if (res?.data) {
                setCategoryValue(res.data)
                if (idProduct) {
                    get_OneProduct(idProduct).then((res => {
                        if (res?.success) {
                            const data = res?.results

                            const { pdfFileName, pdfFile, title, description, subtitle, brand, specifications, feature, category, indexMainImage, descriptionSpecifications  , isShowCodeProduct} = data[0]
                            setTitleInput(title)
                            if (description) {
                                setDescription(description)
                            }
                            setSubtitle(subtitle)
                            setPreviewBase64(res.images)
                            setMainImage(indexMainImage)
                            setDescriptionSpecifications(descriptionSpecifications)
                        
                            const newFeatureArray = feature.map((item, index) => {
                                return {
                                    id: index,
                                    title: item.title,
                                    values: item.values
                                };
                            });
                            setInputs(newFeatureArray)
                            const newSpecificationsArray = specifications.map((item, index) => {
                                return {
                                    id: index,
                                    title: item.title,
                                    value: item.value
                                };
                            });
                            setInputsSpecifications(newSpecificationsArray)
                            setCategoryInput(new Set([category]))
                            setBrand(new Set([brand]))
                            if (pdfFile) {
                                setHasPdf(true)
                            }
                            if (pdfFileName) {
                                setPdfName(pdfFileName)
                            }
                            setProductLoaded(true)
                            if(isShowCodeProduct){
                                setIsShowCodeProduct(isShowCodeProduct)
                            }
                            

                        }
                    }))
                }
            }
        })




    }, [rerender])


    const { create_Product, edit_Product } = ApiActions()

    const createNewProduct = () => {
        if (!categoryInput) {
            toast.error("دسته بندی را وارد کنید")
            return
        }
        let categoryInputValue = categoryInput.values().next().value;

        if (!brand) {
            toast.error(" برند را وارد کنید")
            return
        }
        let brandValue = brand.values().next().value;

        if (!titleInput) {
            toast.error(" تیتر را وارد کنید")
            return
        }

        const productData = inputs.map(input => ({
            title: input.title,
            values: input.values
        }));
        const jsonProductData = JSON.stringify(productData);

        let newSpecifications = inputsSpecifications.map(item => {
            let { id, ...rest } = item;
            return rest;
        });

        const jsonSpecificationsData = JSON.stringify(newSpecifications);

        const formData = new FormData();
        formData.append("feature", jsonProductData);
        formData.append("specifications", jsonSpecificationsData);

        formData.append("title", titleInput);
        if (description) {
            formData.append("description", description);
        }
        if (descriptionSpecifications) {
            formData.append("descriptionSpecifications", descriptionSpecifications);
        }
        formData.append("subtitle", subtitle);
        formData.append("brand", brandValue);


        formData.append("category", categoryInputValue);
        
        formData.append("isShowCodeProduct", isShowCodeProduct);



        if (pdfFile) {
            formData.append("pdfFile", pdfFile);
        }

        arrayImmages.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
        if (mainImage || mainImage === 0) {
            formData.append("indexMainImage", mainImage);

        }
        if (idProduct) {
            if (arrayImmages.length !== 0) {
                formData.append("changeImage", true);

            }
            console.log(formData);

            edit_Product(`/api/product/${idProduct}`, formData).then((res) => {
                if (res) {
                    // changeRoute
                    router.push("/dashboard/product")

                }
            })
        } else {
            console.log(formData);

            create_Product("/api/product", formData).then((res) => {
                if (res) {
                    // changeRoute
                    router.push("/dashboard/product")

                }
            })
        }

    }


    const [inputs, setInputs] = useState([]);

    const createElement = () => {
        setInputs([
            ...inputs,
            {
                id: `element${Date.now()}`,
                title: "",
                values: []
            }
        ]);
    };


    const [inputsSpecifications, setInputsSpecifications] = useState([]);


    const createSpecifications = () => {
        setInputsSpecifications([
            ...inputsSpecifications,
            {
                id: `element${Date.now()}`,
                title: "",
                value: ""
            }
        ]);
    };

    

    const { downloadPdf, deleteFile } = ApiActions()

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfName, setPdfName] = useState(null);
    const [hasPdf, setHasPdf] = useState(false);

    const downloadFile = () => {
        downloadPdf(`/api/product/download/${idProduct}`, JSON.stringify({}, idProduct)).then((res) => {

        })
    }
    const removeFile = () => {
        deleteFile(`/api/product/download/${idProduct}`, JSON.stringify({})).then((res) => {

        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 15 * 1024 * 1024) {
            // اگر فایل بزرگ‌تر از 15 مگابایت بود
            toast.error("اندازه فایل باید کمتر از 15 مگابایت باشد!");
            return; // فایل را ست نمی‌کنیم
        }
        if (file) {
            setPdfFile(file);
            console.log("Selected file:", file);
        }
    };


    const LoadingState = () => (
        <div className="w-full h-[600px] flex justify-center items-center">
            <Spinner />
        </div>
    )

    const getTitleById = (categoryInput, categoryValue) =>
        categoryInput && categoryValue
            ? categoryValue.find(obj => obj._id === Array.from(categoryInput)[0])?.title
            : null;
    return (
        <Suspense>
            <ModalDelete
                title={title}
                text={text}
                idDelete={idDelete}
                isModalOpen={isOpen}
                showId={false}
                onModalOpenChange={onModalOpenChange}
                deleteEventHandler={deleteEventHandler}
            />
            {(idProduct && !productLoaded) ? LoadingState() :
                <>
                    <div className="grid gap-4 gap-y-10 md:grid-cols-2 2xl:grid-cols-4 mb-10">
                        <Input
                            value={titleInput}
                            onChange={(e) => { setTitleInput(e.target.value) }}
                            className="labelRight"
                            label=" نام محصول"
                            placeholder="دسته بندی را وارد کنید"
                            labelPlacement="outside"
                            endContent={
                                <SpellCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            value={subtitle}
                            onChange={(e) => { setSubtitle(e.target.value) }}
                            className="labelRight"
                            label="توضیح کوتاه"
                            placeholder="توضیح کوتاه را وارد کنید"
                            labelPlacement="outside"
                            endContent={
                                <CaseUpper className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />


                        <div className="w-full h-full flex flex-col justify-end pb-[2px]">
                            <div className="w-full flex justify-end">
                                <p className="text-sm text-gray-800 pb-1.5 pl-1">{categoryInput && categoryValue && getTitleById(categoryInput, categoryValue)}</p>
                            </div>
                            <Select
                                value={categoryInput}
                                onSelectionChange={(e) => {
                                    setCategoryInput(e);
                                }}
                                variant="faded"
                                label="دسته بندی را انتخاب کنید"
                                className="selectNextUi w-full"
                            >
                                {categoryValue && categoryValue.map((e) => {
                                    return (
                                        <SelectItem className="vazirMedium" value={e._id} key={e._id}>
                                            {e.title}
                                        </SelectItem>
                                    )
                                })}
                                {categoryValue === null &&

                                    <SelectItem>
                                        <div className="flex items-center gap-2">
                                            <Spinner size="sm" />
                                            <p className="vazirLight">
                                                در حال پردازش اطلاعات
                                            </p>
                                        </div>
                                    </SelectItem>

                                }
                            </Select>
                        </div>
                        <div className="w-full h-full flex flex-col justify-end pb-[2px]">
                            <div className="w-full flex justify-end">
                                <p className="text-sm text-gray-800 pb-1.5 pl-1">{brand}</p>
                            </div>
                            <Select
                                value={brand}
                                onSelectionChange={(e) => {
                                    setBrand(e);
                                }}
                                variant="faded"
                                label=" برند را انتخاب کنید"
                                className="selectNextUi w-full"
                            >
                                <SelectItem className="vazirMedium" value={"Enda"} key={"Enda"}>
                                    Enda
                                </SelectItem>
                                <SelectItem className="vazirMedium" value={"Siemens"} key={"Siemens"}>
                                    Siemens
                                </SelectItem>
                                <SelectItem className="vazirMedium" value={"Eaton"} key={"Eaton"}>
                                    Eaton
                                </SelectItem>
                                <SelectItem className="vazirMedium" value={"Schrack"} key={"Schrack"}>
                                    Schrack
                                </SelectItem>
                                <SelectItem className="vazirMedium" value={"GMT CNT"} key={"GMT CNT"}>
                                    GMT CNT
                                </SelectItem>
                                <SelectItem className="vazirMedium" value={"Chint"} key={"Chint"}>
                                    Chint
                                </SelectItem>
                            </Select>

                        </div>

                        <div className="flex items-center justify-center w-full md:col-span-2 xl:col-span-2 2xl:col-span-4  ">
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



                    </div>


                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">

                        {preview && preview.length !== 0 &&
                            preview.map((e, i) => {
                                return (
                                    <div className="relative my-4 group" key={i}>
                                        <img src={e} alt="Preview" className={
                                            `max-w-full h-auto aspect-square w-full object-cover border-2 rounded-md border-gray-100 border-solid ${indexLastImage === 0 ? mainImage == i : mainImage == i + indexLastImage + 1 ? "p-1 !border-blue-600" : ""}`} />

                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                            <div className="flex gap-2">
                                                <span
                                                    className="text-red-600 text-3xl rounded-full bg-gray-100 p-[10px] cursor-pointer"
                                                    onClick={() => {
                                                        setIdDelete(i + previewBase64.length)
                                                        setTitle("عکس محصول")
                                                        setText(`عکس محصول`)
                                                        setIsOpen(true)
                                                    }}
                                                >
                                                    <Trash2Icon size={28} />
                                                </span>
                                                <span
                                                    className="text-indigo-600 text-3xl rounded-full bg-gray-100 p-[10px] cursor-pointer"
                                                    onClick={() => {
                                                        setMainImage(
                                                            indexLastImage === 0 ? i : i + indexLastImage + 1
                                                        )

                                                    }}
                                                >
                                                    <FileCheck size={28} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }

                        {previewBase64 && previewBase64.length !== 0 &&
                            previewBase64.map((e, i) => {
                                if (e.index > indexLastImage) {
                                    setIndexLastImage(e.index)
                                }
                                return (
                                    <div className="relative my-4 group" key={i}>
                                        <img className={`max-w-full h-auto aspect-square w-full object-cover border-2 rounded-md border-gray-100 border-solid ${mainImage === e.index ? "p-1 !border-blue-600" : ""}`} src={`data:image/webp;base64,${e?.thumbnailBase64}`} alt="" />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                            <div className="flex gap-2">
                                                <span
                                                    className="text-red-600 text-3xl rounded-full bg-gray-100 p-[10px] cursor-pointer"
                                                    onClick={() => {
                                                        setIdDelete(i)
                                                        setTitle("عکس محصول")
                                                        setText(`عکس محصول `)
                                                        setIsOpen(true)
                                                    }}
                                                >
                                                    <Trash2Icon size={28} />
                                                </span>
                                                <span
                                                    className="text-indigo-600 text-3xl rounded-full bg-gray-100 p-[10px] cursor-pointer"
                                                    onClick={() => {
                                                        setMainImage(e.index)

                                                    }}
                                                >
                                                    <FileCheck size={28} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="mb-5">

                        <Button onClick={createElement} endContent={<CircleFadingPlus />} className="bg-blue-600 text-white">
                            افزودن ویژگی
                        </Button>
                    </div>
                    {inputs.map((data, i) => (
                        <FeatureValue
                            key={i}
                            inputs={inputs}
                            setInputs={setInputs}
                            data={data}
                            
                        />
                    ))}
                    <div className="mb-5">

                        <Button onClick={createSpecifications} endContent={<CircleFadingPlus />} className="bg-blue-600 text-white">
                            افزودن مشخصات
                        </Button>
                    </div>
                    {inputsSpecifications.map((data, i) => (
                        <SpecificationsValue
                            key={i}
                            inputs={inputsSpecifications}
                            setInputs={setInputsSpecifications}
                            data={data}
                        />
                    ))}
                   
                  
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Textarea
                            value={descriptionSpecifications}
                            onChange={(e) => {
                                setDescriptionSpecifications(e.target.value);
                            }}
                            id="descriptionSpecifications"
                            // isRequired={true}
                            label="توضیح مشخصات فنی"
                            placeholder="توضیح مشخصات فنی را وارد کنید..."
                            className="w-full mb-6 textAreaNextUi"
                        />
                    </div>
                    <div className="my-10 flex items-center">

                        <div>
                            <label
                                htmlFor="file-input"
                                className="cursor-pointer bg-blue-600 text-white py-2.5 px-3.5 rounded-lg shadow-sm text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                انتخاب فایل
                            </label>
                            <input
                                onChange={handleFileChange}
                                id="file-input"
                                type="file"
                                className="sr-only"
                            />
                        </div>
                        {pdfFile && (
                            <div className="mx-3 text-sm">
                                <p className="text-base vazirMedium">فایل انتخاب شده: {pdfFile.name}</p>
                                <p className="text-base vazirMedium">اندازه: {(pdfFile.size / 1024).toFixed(2)} KB</p>
                                <p className="text-base vazirMedium">نوع: {pdfFile.type}</p>
                            </div>
                        )}
                        {hasPdf && <div className="mr-3">
                            <Button className="min-w-0 bg-transparent px-1.5" id="downloadFile">
                                <Download size={28} className="text-green-700 cursor-pointer" onClick={downloadFile} />
                            </Button>

                        </div>}
                        {hasPdf && <div className="mr-3">
                            <Button className="min-w-0 bg-transparent px-1.5" id="downloadFile">
                                <X size={28} className="text-red-700 cursor-pointer" onClick={removeFile} />
                            </Button>

                        </div>}

                        {pdfName && <p className="mx-2"> نام :  {pdfName}</p>}


                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Textarea
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            id="textarea"
                            // isRequired={true}
                            label="توضیح تکمیلی"
                            placeholder="توضیح تکمیلی را وارد کنید..."
                            className="w-full mb-6 textAreaNextUi"
                        />
                    </div>
                    <Button onClick={createNewProduct} className={`${idProduct ? "bg-blue-600" : "bg-green-700"}  text-white`}>
                        {idProduct ? "ادیت" : "ساخت"} محصول جدید
                    </Button>
                </>
            }

        </Suspense>

    )
}

export default CreateProduct