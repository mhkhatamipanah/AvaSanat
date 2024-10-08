"use client"

// react
import { useContext, useEffect, useState } from "react"
// nextui
import { Button } from "@nextui-org/react";
// icon
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
// component
import RadioBTN from "./RadioBTN";
import TabComponent from "./Tabs";
// api
import { addToCart, decreaseItemCount, removeFromCart, getItemCount } from "@/src/utils/Cookie"

import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link";


import { InvoiceContext } from "@/src/components/useContextProvider/ContextProvider";
import CarouselSlider from "./CarouselSlider";

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
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)


  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
      detailProduct: subId

    };

    getApi(`/api/product?${(new URLSearchParams(data)).toString()}`, setData)
    // getApi("/api/category", setData)
  }, [
    page, perPage
    //  , rerender
  ])


  const [selectedValues, setSelectedValues] = useState({});

  // تابع برای دریافت مقدار از RadioBTN
  const handleRadioChange = (title, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [title]: value
    }));
  };

  return (
    <>
      <section className=' flex justify-center w-full mb-20  min-h-screen '>

        <div className='max-w-[1500px] w-full'>
          {data && data.data && data.file &&
            <section className="w-full grid grid-cols-7 rounded mt-3">
              <div className="w-full col-span-3 p-2 rounded-xl">
                <div className="w-full grid grid-cols-4 gap-4 overflow-hidden">
                  <img className="boxShadow w-full rounded-xl col-span-4 " src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="boxShadow2 rounded-lg col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="boxShadow2 rounded-lg col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="boxShadow2 rounded-lg col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="boxShadow2 rounded-lg col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />



                </div>

              </div>
              <div className="w-full col-span-4 p-3">


                <h1 className="vazirDemibold text-2xl mt-6">
                  {data.data.title}
                </h1>
                <h3 className="vazirMedium text-lg text-gray-700 mt-2">
                  {data.data.subtitle}
                </h3>
                <div className="border border-b my-3"></div>
                <p className="vazirMedium text-md text-gray-700">
                  توضیح بلند درباره محصول
                </p>

                <div className="vazirLight">
                  دسته بندی : <Link href={`/product/${data.data.routeCategory}`}> {data.data.titleCategory}</Link>
                </div>
                <div className="vazirLight">
                  برند : {data.data.brand}
                </div>
                <div className="border border-b my-3"></div>
                {(data && data.data.feature && data.data.feature.map((e, i) => {
                  return (
                    <div className="vazirLight" key={i}>

                      <RadioBTN title={e.title} data={e.values} onChange={(value) => handleRadioChange(e.title, value)} />
                    </div>
                  )
                }))}


                <div className="border border-b my-3"></div>

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

                    className=" bg-green-700 vazirMedium text-white">
                    افزودن به  پیش فاکتور
                  </Button>
                }


              </div>
              {/* <button onClick={() => {
                console.log("Selected radio values:", selectedValues);
              }}> click</button> */}

            </section>
          }
          {data && data.data && <section className="mt-6">
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