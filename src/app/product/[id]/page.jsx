"use client"


import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import ButtonInvoice from "./ButtonInvoice"
import { Spinner } from "@nextui-org/react"
import PaginationComponent from "@/src/components/Dashboard/Pagination/PaginationComponents"
import Image from "next/image"

const Page = ({ params }) => {

  const { id } = params
  const pathname = usePathname()
  const categoryUrl = pathname.split("/")[2]




  const [countData, setCountData] = useState(null)

  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  const getData = () => {
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
  }
  useEffect(() => {
    getData()

  }, [page, perPage])

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )
  return (
    <>
      <section className="min-h-screen">

        <div className='flex flex-col items-center justify-center w-full my-5 sm:my-9 md:my-14 px-2.5 sm:px-4'>

          {data.length == 0 && LoadingState()}
          <div className='max-w-[1500px] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 max-[340px]:grid-cols-1 w-full gap-3 mb-3'>


            {data && data.data && data.data.map((e, i) => {
              return (<div key={i} className=" flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 hover:border-[#f548485d] transition-all duration-500 ease-in-out bg-clip-border rounded-xl h-min">
                <Link href={`/product/${categoryUrl}/${e.id}`} className="mx-2 mt-2 sm:mx-3 md:mx-4 sm:mt-3 md:mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg">
                  <Image width={500} height={500} className='object-cover w-full h-full aspect-square' src={e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="profile-picture" />
                </Link>
                <div className="p-3 sm:p-6 text-center pb-3">
                  {/* <Link href={`/product/${categoryUrl}/${e.id}`} > */}

                    <p className="block text-right mb-2 vazirDemibold text-[13px] sm:text-md md:text-lg antialiased tracking-normal text-blue-gray-900 ellipsisOneLine">
                      {e.title}
                    </p>
                    <p className="block text-right vazirLight text-[11px] sm:text-sm tracking-normal text-blue-gray-900 text-gray-500 ellipsisTwoLine mb-1">
                      {e.description}
                    </p>
                  {/* </Link> */}



                  <Link  href={`/product/${categoryUrl}/${e.id}`}  className="w-full block text-white bg-[#d94038] hover:bg-[#c73028] vazirLight font-medium rounded text-[10px] min-[400px]:text-[12px] sm:text-sm px-2.5 sm:px-5 py-1.5 sm:py-2.5 my-2 rounded-br-3xl rounded-tl-3xl">جزییات   </Link>
                  {/* <ButtonInvoice id={e.id} /> */}


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