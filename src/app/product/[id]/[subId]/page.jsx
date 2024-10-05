"use client"
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import { useEffect, useState } from "react"
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import RadioBTN from "./RadioBTN";
const Page = ({ params }) => {

  const { subId } = params

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
                <div className=" mb-2 p-3">
                  <Breadcrumbs separator={<ChevronLeft size={20} />} className="">
                    <BreadcrumbItem className="!hover:text-[#da4f4c]">Home</BreadcrumbItem>
                    <BreadcrumbItem className="!hover:text-[#da4f4c]">Music</BreadcrumbItem>
                    <BreadcrumbItem className="!hover:text-[#da4f4c]">Artist</BreadcrumbItem>
                    <BreadcrumbItem className="!hover:text-[#da4f4c]">Album</BreadcrumbItem>
                    <BreadcrumbItem className="!hover:text-[#da4f4c]">Song</BreadcrumbItem>
                  </Breadcrumbs>
                </div>
                <div className="border border-b my-3"></div>

                <h1 className="vazirDemibold text-2xl">
                  {data.data.title}
                </h1>
                <h3 className="vazirMedium text-lg text-gray-700 mt-2">
                  {data.data.description}
                </h3>
                <div className="border border-b my-3"></div>
                <p className="vazirMedium text-md text-gray-700">
                  توضیح بلند درباره محصول
                </p>

                <div className="vazirLight">
                  دسته بندی : فیوز
                </div>
                <div className="vazirLight">
                  برند : اندا
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

                <Button className=" bg-green-700 vazirMedium text-white">
                  افزودن به سبد خرید
                </Button>
              </div>
              {/* page : {subId} */}
            </section>
          }
          <section>
            tabs
          </section>
        </div>

      </section>

    </>
  )
}

export default Page