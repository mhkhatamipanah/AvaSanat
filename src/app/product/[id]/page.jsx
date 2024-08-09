"use client"

import PaginationComponent from "@/src/components/Dashboard/Pagination/Pagination"
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { addToCart, setCookie } from "@/src/utils/Cookie"

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

  
  return (
    <>
      <section className=' flex justify-center w-full my-20 min-h-screen'>

        <div className='max-w-[1500px] grid grid-cols-4 gap-3 justify-center'>


          {data && data.data && data.data.map((e, i) => {
            return (<div key={`${i}354`} className=" flex flex-col text-gray-700 bg-white shadow-lg border-2 border-gray-200 bg-clip-border rounded-xl w-80 h-min">
              <Link href={`/product/${categoryUrl}/${e.route}`} className=" mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg h-60">
                <img className='object-cover w-full h-full' src={`data:image/webp;base64,${e.newArr[0].thumbnailBase64}`} alt="profile-picture" />
              </Link>
              <div className="p-6 text-center pb-3">
                <Link href={`/product/${categoryUrl}/${e.route}`} >

                  <p className="block mb-2 vazirDemibold text-xl antialiased leading-snug tracking-normal text-blue-gray-900 ">
                    {e.title}
                  </p>
                  <p className="block mb-2 vazirLight text-md antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500">
                    {e.description}
                  </p>
                </Link>
                <button type="button" onClick={() => {
                  console.log({ id:e.id , title: e.title, description: e.description })
                  addToCart(e.id, JSON.stringify({ id:e._id , title: e.title, description: e.description }));
                }} className="w-full text-white bg-[#d94038] hover:bg-[#c73028] vazirLight font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 rounded-br-2xl rounded-tl-2xl">افزودن به پیش فاکتور</button>


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