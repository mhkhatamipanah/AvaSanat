"use client";

// react
import { useContext, useEffect, useState } from "react";
// nextui
import { Button, Input, Spinner } from "@nextui-org/react";
// icon
import { Ellipsis, FileDown } from "lucide-react";
// component
import RadioBTN from "./RadioBTN";
import TabComponent from "./Tabs";
// api
import { addToCart, getItemCount } from "@/src/utils/Cookie";

import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi";
import Link from "next/link";

import { InvoiceContext } from "@/src/hooks/useContextProvider/ContextProvider";
import CarouselSlider from "./CarouselSlider";
import ModalGallery from "@/src/components/Main/ModalGallery/ModalGallery";
import Image from "next/image";
import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import { toast } from "sonner";

const DetailProduct = ({ dataServer, subId }) => {
  const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);
  const rerenderBTN_Invoice = () => {
    setUpdateInvoice(!updateInvoice);
  };

  const [countInvoice, setCountInvoice] = useState(null);

  const [countData, setCountData] = useState("1");

  const getCountInvoice = () => {
    const count = getItemCount(subId);
    setCountInvoice(count);
  };
  useEffect(() => {
    getCountInvoice();
  }, []);

  const [data, setData] = useState([]);

  const getData = () => {
    let data = {
      detailProduct: subId,
    };
    getApi(`/api/product?${new URLSearchParams(data).toString()}`, setData);
  };
  useEffect(() => {
    getData();
    setData(dataServer);
  }, []);

  const [resetRadio, setResetRadio] = useState(false); // تعریف متغیر resetRadio

  const [selectedValues, setSelectedValues] = useState({});

  // تابع برای دریافت مقدار از RadioBTN
  const handleRadioChange = (title, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const [mainImage, setMainImage] = useState(null);
  const [bottomImages, setBottomImages] = useState(null);

  const mainImageHandler = () => {
    if (data && data.image) {
      const mainImage = data.image.find((e) => e.type === "main_image");
      setMainImage(mainImage);
      // فیلتر کردن تصاویر فرعی
      const bottomImages = data.image.filter((e) => e.type === "bottom_image");
      setBottomImages(bottomImages);
      bottomImages.unshift(mainImage);
    }
  };
  useEffect(() => {
    mainImageHandler();
  }, [data]);

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
  );

  const { downloadPdf } = ApiActions();
  return (
    <>
      <ModalGallery
        idProduct={subId}
        isModalOpen={isOpen}
        onModalOpenChange={onModalOpenChange}
      />
      <section className=" flex flex-col items-center  w-full mb-20 min-h-screen ">
        {data && data.length === 0 && LoadingState()}
        <div className="max-w-[1500px] w-full">
          {data && data.data && (
            <section className="w-full grid grid-cols-3 rounded mt-3 px-2 sm:px-4">
              <div className="w-full max-[768px]:col-span-3 col-span-1 p-2 rounded-xl">
                <div className="w-full grid grid-cols-4 gap-2.5 overflow-hidden max-[768px]:px-3">
                  {
                    <div
                      className="product-image relative overflow-hidden rounded-xl col-span-4 border border-gray-300 border-solid"
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        width={500}
                        height={500}
                        className="w-full zoom-image aspect-square object-cover"
                        src={
                          mainImage?.image
                            ? `data:image/webp;base64,${mainImage.image}`
                            : `/images/placeholder.jpg`
                        }
                        alt="Main"
                        style={{
                          transform: isHovered ? `scale(1.2)` : `scale(1)`,
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  }

                  {bottomImages &&
                    bottomImages.map((e, i) => (
                      <div className="aspect-square p-[3px]" key={`image-${i}`}>
                        <Image
                          onClick={() => {
                            setMainImage(e);
                          }}
                          width={500}
                          height={500}
                          className="rounded-lg col-span-1 cursor-pointer aspect-square boxShadow2 object-cover"
                          src={
                            e?.image
                              ? `data:image/webp;base64,${e.image}`
                              : `/images/placeholder.jpg`
                          }
                          alt={`Bottom Image ${i + 1}`}
                        />
                      </div>
                    ))}
                  {bottomImages && bottomImages.length > 0 && (
                    <div
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="col-span-1 bg-white cursor-pointer p-[3px] aspect-square"
                    >
                      <div className="boxShadow2 w-full h-full  flex justify-center items-center rounded-lg">
                        <Ellipsis size={30} />
                      </div>
                    </div>
                  )}
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
                    <p className="text-base sm:text-xl">دسته بندی:&nbsp;</p>
                    <Link
                      className="hover:underline hover:text-blue-500 text-blue-600 transition-all text-sm sm:text-lg md:text-lg"
                      href={`/product/${data.data.routeCategory}`}
                    >
                      {" "}
                      {data.data.titleCategory}
                    </Link>
                  </div>
                </div>
                <div className="vazirLight mt-4 flex items-center">
                  <p className="text-base sm:text-xl">برند:&nbsp;</p>
                  <p className="text-sm sm:text-lg md:text-lg">
                    {data.data.brand}
                  </p>
                </div>
                <div className="border border-b my-4"></div>
                {data &&
                  data.data.feature &&
                  data.data.feature.map((e, i) => {
                    return (
                      <div className="vazirLight" key={`feature-${i}`}>
                        <RadioBTN
                          title={e.title}
                          data={e.values}
                          reset={resetRadio} // اضافه کردن prop reset
                          onChange={(value) =>
                            handleRadioChange(e.title, value)
                          }
                        />
                      </div>
                    );
                  })}

                <div className="w-32 vazirLight m-4">
                  <Input
                    type="number"
                    label="تعداد:"
                    placeholder="0"
                    className="numberNextUiInput"
                    labelPlacement="outside-left"
                    value={countData}
                    onChange={(e) => {
                      if (e.target.value > 0) {
                        setCountData(e.target.value);
                      }
                    }}
                  />
                </div>

                {/* {data.data.feature.length > 0 && <div className="border border-b my-3"></div>} */}

                <div className="border border-b my-3"></div>

                <div className="flex flex-col gap-4 w-min">
                  <Button
                    onClick={() => {
                      const isAllSelected = data.data.feature.every(
                        (feature) => selectedValues[feature.title]
                      );
                      if (!isAllSelected) {
                        toast.error("لطفا ویژگی را وارد کنید");
                        return; // اگر ویژگی انتخاب نشده باشد، تابع متوقف می‌شود
                      }
                      const resultAddToCart = addToCart(
                        data.data.id_Product,
                        JSON.stringify({
                          id: data.data.id_Product,
                          feature: selectedValues,
                          count: countData,
                        })
                      );
                      if (resultAddToCart) {
                        rerenderBTN_Invoice();
                        setCountInvoice(countInvoice + 1);
                        toast.success("محصول به پیش فاکتور اضافه شد");
                        setSelectedValues({});
                        setResetRadio(true); // فعال کردن reset
                        setTimeout(() => setResetRadio(false), 0); // غیرفعال کردن reset
                        setCountData(1);
                      } else {
                        toast.error(
                          "محصول تکراری، قبلا در پیش فاکتور ثبت شده "
                        );
                      }
                    }}
                    className=" bg-green-700 vazirMedium text-white text-[12px] sm:text-sm"
                  >
                    افزودن به پیش فاکتور
                  </Button>
                  {data.data.pdfFile && (
                    <Button
                      onClick={() => {
                        downloadPdf(
                          `/api/product/download/${subId}`,
                          JSON.stringify({}, subId)
                        ).then((res) => {});
                      }}
                      className=" bg-green-700 vazirMedium text-white text-[12px] sm:text-sm"
                    >
                      <FileDown />
                      دانلود کاتالوگ
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}
          {data && data.data && (
            <section className="mt-6 px-4">
              <TabComponent
                descriptionSpecifications={data.data.descriptionSpecifications}
                description={data.data.description}
                specifications={data.data.specifications}
              />
            </section>
          )}

          <section>
            {data && data.data && (
              <CarouselSlider
                id={subId}
                routeCategory={data.data.routeCategory}
              />
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default DetailProduct;
