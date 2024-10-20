"use client"


import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import ButtonInvoice from "./ButtonInvoice"
import { Spinner } from "@nextui-org/react"
import PaginationComponent from "@/src/components/Dashboard/Pagination/PaginationComponents"

const Page = ({ params }) => {

  const { id } = params
  const pathname = usePathname()
  const categoryUrl = pathname.split("/")[2]




  const [countData, setCountData] = useState(null)

  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
      filterCategory: id
    };
    let data2 = {
      countFilterCategory: id
    };

    getApi(`/api/product?${(new URLSearchParams(data)).toString()}`, setData)
    getApi(`/api/product?${(new URLSearchParams(data2)).toString()}`, setCountData)

  }, [
    page, perPage
    //  , rerender
  ])

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )
  return (
    <>
      <section className="min-h-screen">

      <div className='flex flex-col items-center justify-center w-full my-5 sm:my-9 md:my-14 px-4'>

        {data.length == 0 && LoadingState()}
        <div className='max-w-[1500px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-3 mb-3'>


          {data && data.data && data.data.map((e, i) => {
            return (<div key={i} className=" flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 hover:border-[#f548485d] transition-all duration-500 ease-in-out bg-clip-border rounded-xl h-min">
              <Link href={`/product/${categoryUrl}/${e.id}`} className="mx-2 mt-2 sm:mx-3 md:mx-4 sm:mt-3 md:mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg">
                <img className='object-cover w-full h-full' src={e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="profile-picture" />
              </Link>
              <div className="p-4 sm:p-6 text-center pb-3">
                <Link href={`/product/${categoryUrl}/${e.id}`} >

                  <p className="block mb-2 vazirDemibold text-xl antialiased tracking-normal text-blue-gray-900 ellipsisOneLine">
                    {e.title}
                  </p>
                  <p className="block mb-2 vazirLight text-md antialiased tracking-normal text-blue-gray-900 h-[48px] text-gray-500 ellipsisTwoLine">
                    {e.description}
                  </p>
                </Link>




                <ButtonInvoice id={e.id} />


              </div>

            </div>)
          })}</div>
        {countData && countData > perPage &&

          <PaginationComponent countData={countData.countData} perPage={perPage} page={page} setPage={setPage} />
        }
      </div>
      </section>


    </>

  )
}

export default Page