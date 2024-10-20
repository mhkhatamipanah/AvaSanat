"use client"

// react
import { useContext, useEffect, useState } from "react"
// nextui
import { Button, Spinner } from "@nextui-org/react";
// icon
import { Ellipsis, MinusCircle, PlusCircle, Trash } from "lucide-react";
// component
import RadioBTN from "./RadioBTN";
import TabComponent from "./Tabs";
// api
import { addToCart, decreaseItemCount, removeFromCart, getItemCount } from "@/src/utils/Cookie"

import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link";


import { InvoiceContext } from "@/src/hooks/useContextProvider/ContextProvider";
import CarouselSlider from "./CarouselSlider";
import ModalGallery from "@/src/components/Main/ModalGallery/ModalGallery";

const Page = ({ params }) => {
  const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);
  const rerenderBTN_Invoice = () => {
    setUpdateInvoice(!updateInvoice)
  }

  const { subId } = params

  const [countInvoice, setCountInvoice] = useState(null)


  useEffect(() => {
    const count = getItemCount(subId)
    setCountInvoice(count)
  }, [])

  const [data, setData] = useState([])

  useEffect(() => {
    let data = {
      detailProduct: subId
    };
    getApi(`/api/product?${(new URLSearchParams(data)).toString()}`, setData)
  }, [])


  const [selectedValues, setSelectedValues] = useState({});

  // تابع برای دریافت مقدار از RadioBTN
  const handleRadioChange = (title, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [title]: value
    }));
  };

  const [mainImage, setMainImage] = useState(null)
  const [bottomImages, setBottomImages] = useState(null)

  useEffect(() => {
    if (data && data.image) {
      const mainImage = data.image.find((e) => e.type === "main_image");
      setMainImage(mainImage)
      // فیلتر کردن تصاویر فرعی
      const bottomImages = data.image.filter((e) => e.type === "bottom_image");
      setBottomImages(bottomImages)
    }

  }, [data])


  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // مقدار پیش‌فرض
  const [isHovered, setIsHovered] = useState(false); // وضعیت هاور

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // محاسبه موقعیت نسبی موس نسبت به تصویر
    const x = ((clientX - left) / width) * 100; // درصد افقی
    const y = ((clientY - top) / height) * 100; // درصد عمودی

    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  const [isOpen, setIsOpen] = useState(false);
  const onModalOpenChange = () => {
    setIsOpen(false);
  };

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )

  return (
    <>
      <ModalGallery
        idProduct={subId}
        isModalOpen={isOpen}
        onModalOpenChange={onModalOpenChange}
      />
      <section className=' flex flex-col items-center  w-full mb-20 min-h-screen '>

        {data && data.length === 0 && LoadingState()}
        <div className='max-w-[1500px] w-full'>
          {data && data.data &&
            <section className="w-full grid grid-cols-3 rounded mt-3 px-4">
              <div className="w-full max-[768px]:col-span-3 col-span-1 p-2 rounded-xl">
                <div className="w-full grid grid-cols-4 gap-4 overflow-hidden max-[768px]:px-3">
                  {mainImage && (
                    <div
                      className="product-image relative overflow-hidden rounded-xl col-span-4 "
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        className="boxShadow w-full zoom-image"
                        src={`data:image/webp;base64,${mainImage.image}`}
                        alt="Main"
                        style={{
                          transform: isHovered ? `scale(1.2)` : `scale(1)`,
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>
                  )}
                  {bottomImages && bottomImages.map((e, i) => (
                    <img
                      key={`image-${i}`}
                      className="boxShadow2 rounded-lg col-span-1"
                      src={`data:image/webp;base64,${e.image}`}
                      alt={`Bottom Image ${i + 1}`}
                    />
                  ))}
                  {bottomImages && bottomImages.length > 0 && <div
                    onClick={() => { setIsOpen(true) }}
                    className="  col-span-1 bg-white  cursor-pointer p-[2px]"
                  >
                    <div className="boxShadow w-full h-full  flex justify-center items-center rounded-lg">
                      <Ellipsis size={30} />

                    </div>
                  </div>}




                </div>

              </div>
              <div className="w-full max-[768px]:col-span-3 col-span-2 p-3">


                <h1 className="vazirDemibold text-base sm:text-xl md:text-3xl lg:text-4xl mt-3">
                  {data.data.title}
                </h1>
                <h3 className="vazirMedium text-sm sm:text-lg md:text-xl lg:text-2xl  text-gray-700 mt-4">
                  {data.data.subtitle}
                </h3>
                <div className="border border-b my-3"></div>


                <div className="vazirLight">
                  <div className="vazirMedium text-gray-600 mt-4 flex items-center">
                    <p className="text-base sm:text-xl">
                      دسته بندی: &nbsp;
                    </p>
                    <Link className="hover:underline hover:text-blue-500 text-blue-600 transition-all text-sm sm:text-lg md:text-lg" href={`/product/${data.data.routeCategory}`}> {data.data.titleCategory}</Link>

                  </div>
                </div>
                <div className="vazirLight mt-4 flex items-center">
                  <p className="text-base sm:text-xl">
                    برند:  &nbsp;
                  </p>
                  <p className="text-sm sm:text-lg md:text-lg">
                    {data.data.brand}
                  </p>

                </div>
                <div className="border border-b my-4"></div>
                {(data && data.data.feature && data.data.feature.map((e, i) => {
                  return (
                    <div className="vazirLight" key={`feature-${i}`}>

                      <RadioBTN title={e.title} data={e.values} onChange={(value) => handleRadioChange(e.title, value)} />
                    </div>
                  )
                }))}

                {data.data.feature.length > 0 && <div className="border border-b my-3"></div>}


                {countInvoice ? <div className="mt-3 flex items-center">
                  {countInvoice == 1 ?
                    <Button
                      onClick={() => {

                        removeFromCart(data.data.id_Product)
                        setCountInvoice(countInvoice - 1)
                        rerenderBTN_Invoice()
                      }}
                      className="px-0 min-w-10 h-10 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                      variant="light"
                      color="primary"
                    >
                      <Trash className="w-5 text-red-600" size={24} />
                    </Button>
                    :
                    <Button
                      onClick={() => {
                        decreaseItemCount(data.data.id_Product)
                        setCountInvoice(countInvoice - 1)
                        rerenderBTN_Invoice()
                      }}
                      className="px-0 min-w-10 h-10 bg-gray-100 shadow border border-solid border-gray-200 hover:!bg-gray-300"
                      variant="light"
                      color="primary"
                    >
                      <MinusCircle className="w-5 text-gray-600" size={24} />
                    </Button>
                  }

                  <div className="w-10 h-10 flex justify-center items-center">

                    <p className="vazirMedium">
                      {countInvoice}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(data.data.id_Product, JSON.stringify({ id: data.data.id_Product, feature: selectedValues }))
                      setCountInvoice(countInvoice + 1)
                      rerenderBTN_Invoice()
                    }}
                    className="px-0 min-w-10 h-10 bg-green-100 shadow border border-solid border-green-200 hover:!bg-green-300"
                    variant="light"
                    color="primary"
                  >
                    <PlusCircle className="w-5 text-green-600" size={24} />
                  </Button>
                </div> :
                  <Button
                    onClick={() => {
                      addToCart(data.data.id_Product, JSON.stringify({ id: data.data.id_Product, feature: selectedValues }))
                      setCountInvoice(countInvoice + 1)
                      rerenderBTN_Invoice()
                    }}

                    className=" bg-green-700 vazirMedium text-white text-[12px] sm:text-sm">
                    افزودن به  پیش فاکتور
                  </Button>
                }


              </div>


            </section>
          }
          {data && data.data && <section className="mt-6 px-4">
            <TabComponent
              description={data.data.description}
              specifications={data.data.specifications} />
          </section>}


          <section>
            {data && data.data && <CarouselSlider id={subId} routeCategory={data.data.routeCategory} />}
          </section>
        </div>

      </section>

    </>
  )
}

export default Page