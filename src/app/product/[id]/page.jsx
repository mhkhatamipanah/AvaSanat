"use client"


import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import ButtonInvoice from "./ButtonInvoice"
import { Spinner } from "@nextui-org/react"

const Page = ({ params }) => {

  const { id } = params
  const pathname = usePathname()
  const categoryUrl = pathname.split("/")[2]





  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
      filterCategory: id
    };

    getApi(`/api/product?${(new URLSearchParams(data)).toString()}`, setData)
    // getApi("/api/category", setData)
  }, [
    // page, perPage
    //  , rerender
  ])

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )
  return (
    <>
      <section className=' flex flex-col items-center justify-center w-full my-20'>

        {data.length == 0 && LoadingState()}
        <div className='max-w-[1500px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-3'>


          {data && data.data && data.data.map((e, i) => {
            return (<div key={i} className=" flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 hover:border-[#f548485d] transition-all duration-500 ease-in-out bg-clip-border rounded-xl h-min">
              <Link href={`/product/${categoryUrl}/${e.id}`} className=" mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg">
                <img className='object-cover w-full h-full' src={e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="profile-picture" />
              </Link>
              <div className="p-6 text-center pb-3">
                <Link href={`/product/${categoryUrl}/${e.id}`} >

                  <p className="block mb-2 vazirDemibold text-xl antialiased leading-snug tracking-normal text-blue-gray-900 ">
                    {e.title}
                  </p>
                  <p className="block mb-2 vazirLight text-md antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500">
                    {e.description}
                  </p>
                </Link>




                <ButtonInvoice id={e.id} />


              </div>

            </div>)
          })}</div>
      </section>
      {/* {countData &&

        <PaginationComponent countData={countData} perPage={perPage} page={page} setPage={setPage} />
      } */}
    </>

  )
}

export default Page