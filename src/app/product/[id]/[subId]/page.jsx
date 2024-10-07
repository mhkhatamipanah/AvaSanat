"use client"

// react
import { useEffect, useState } from "react"
// nextui
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
// icon
import { ChevronLeft, PlusCircle, Trash } from "lucide-react";
// component
import RadioBTN from "./RadioBTN";
import TabComponent from "./Tabs";
// api
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link";
const Page = ({ params }) => {

  const { subId } = params

  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  const [countInvoice, setCountInvoice] = useState(null)

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
                      <p>انتخاب {e.title} : </p>
                      <RadioBTN data={e.values} />
                    </div>
                  )
                }))}


                <div className="border border-b my-3"></div>

                {countInvoice ? <div className="mt-3 flex items-center">
                  <Button
                    onClick={() => {
                      setCountInvoice(countInvoice - 1)
                    }}
                    className="px-0 min-w-10 h-10 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                    variant="light"
                    color="primary"
                  >
                    <Trash className="w-5 text-red-600" size={24} />
                  </Button>
                  <div className="w-10 h-10 flex justify-center items-center">

                    <p className="vazirMedium">
                      {countInvoice}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setCountInvoice(countInvoice + 1)
                    }}
                    className="px-0 min-w-10 h-10 bg-green-100 shadow border border-solid border-green-200 hover:!bg-green-300"
                    variant="light"
                    color="primary"
                  >
                    <PlusCircle className="w-5 text-green-600" size={24} />
                  </Button>
                </div> : <Button
                  onClick={() => {
                    setCountInvoice(countInvoice + 1)
                  }}

                  className=" bg-green-700 vazirMedium text-white">
                  افزودن به  پیش فاکتور
                </Button>
                }


              </div>

            </section>
          }
          {data && data.data && <section className="mt-6">
            <TabComponent
              description={data.data.description}
              specifications={data.data.specifications} />
          </section>}

        </div>

      </section>

    </>
  )
}

export default Page