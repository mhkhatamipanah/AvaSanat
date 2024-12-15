import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,

} from "@nextui-org/react";
const ModalGallery = ({ isModalOpen, onModalOpenChange, idProduct, }) => {

    const [data, setData] = useState(null)

    const fetchData = async () => {
        let data = {
            gallery: true
        };
        const res = await fetch(`/api/product/${idProduct}?${(new URLSearchParams(data)).toString()}`);
        const result = await res.json();
        if (result?.data.length > 0) {
            setData(result?.data[0])
            setMainImage(result?.data[0]?.image_gallery[0]?.thumbnailBase64)
        }

    }
    useEffect(() => {
        fetchData()
    }, [])



    // حالت برای ذخیره تصویر اصلی
    const [mainImage, setMainImage] = useState(null);

    // تابع برای تغییر تصویر اصلی
    const handleImageClick = (imgUrl) => {
        setMainImage(imgUrl);
    };
    return (
        <>

            <Modal
                isOpen={isModalOpen}
                onOpenChange={onModalOpenChange}
                className="vazirMedium exitPlaceIcon max-w-[600px]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalHeader>
                                <div className="mt-1 vazirMedium font-normal">گالری</div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center">
                                    {/* عکس اصلی */}
                                    {mainImage && <div className="w-full mb-4">

                                        <img
                                            src={`data:image/webp;base64,${mainImage}`}
                                            alt="Main"
                                            className="w-full h-auto rounded-lg object-cover max-h-[700px] border border-solid border-gray-300"
                                        />
                                    </div>}

                                    {/* تصاویر کوچک با قابلیت اسکرول */}
                                    <div className="w-full flex gap-2 overflow-x-auto space-x-4 pb-3 overflow-auto mb-4">

                                        {data && data.image_gallery.map((imgUrl, index) => (
                                            <img
                                                key={index}
                                                src={`data:image/webp;base64,${imgUrl.thumbnailBase64}`}
                                                alt={`Gallery ${index + 1}`}
                                                className="!w-28 !h-28  border border-solid border-gray-300 rounded-lg cursor-pointer object-cover !m-0"
                                                onClick={() => handleImageClick(imgUrl.thumbnailBase64)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    )
}

export default ModalGallery
