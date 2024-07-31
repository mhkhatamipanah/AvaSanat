"use client"
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import { useEffect, useState } from "react"
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
const Page = ({ params }) => {

  const { subId } = params
  const [radioBTN, setRadioBTN] = useState("18mm")
  const [radioBTN2, setRadioBTN2] = useState("یک پل")
  const handleChange = (e) => {
    setRadioBTN(e.target.value);
  };
  const handleChange2 = (e) => {
    setRadioBTN2(e.target.value);
  };
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
                <div className="w-full grid grid-cols-4 gap-4">
                  <img className="boxShadow w-full rounded col-span-4" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="rounded col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="rounded col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="rounded col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />
                  <img className="rounded col-span-1" src={`data:image/webp;base64,${data.file[data.data.indexMainImage].thumbnailBase64}`} alt="" />



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

                <div className="vazirLight">
                  <p>انتخاب سایز : </p>
                  <div className="my-2">
                    <input type="radio" name="size" id="size_1" value="18mm" onChange={handleChange} checked={radioBTN === '18mm'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN === '18mm' ? "text-white bg-green-600" : ""}`} htmlFor="size_1">18mm</label>

                    <input type="radio" name="size" id="size_2" value="16mm" onChange={handleChange} checked={radioBTN === '16mm'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN === '16mm' ? "text-white bg-green-600" : ""}`} htmlFor="size_2">16mm</label>

                    <input type="radio" name="size" id="size_3" value="14mm" onChange={handleChange} checked={radioBTN === '14mm'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN === '14mm' ? "text-white bg-green-600" : ""}`} htmlFor="size_3">14mm</label>

                  </div>

                </div>
                <div className="vazirLight">
                  <p>انتخاب سایز : </p>
                  <div className="my-2">
                    <input type="radio" name="model" id="model_1" value="یک پل" onChange={handleChange2} checked={radioBTN2 === 'یک پل'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN2 === 'یک پل' ? "text-white bg-green-600" : ""}`} htmlFor="model_1">یک پل</label>

                    <input type="radio" name="model" id="model_2" value="دو پل" onChange={handleChange2} checked={radioBTN2 === 'دو پل'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN2 === 'دو پل' ? "text-white bg-green-600" : ""}`} htmlFor="model_2">دو پل</label>

                    <input type="radio" name="model" id="model_3" value="سه پل" onChange={handleChange2} checked={radioBTN2 === 'سه پل'} />
                    <label className={`px-2 py-1 rounded-lg ${radioBTN2 === 'سه پل' ? "text-white bg-green-600" : ""}`} htmlFor="model_3">سه پل</label>

                  </div>

                </div>
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