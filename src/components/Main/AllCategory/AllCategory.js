"use client"
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import { Spinner } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import img1 from "@/public/images/no-resualt.png";



const AllCategory = () => {

  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
    };

    getApi(`/api/category?${(new URLSearchParams(data)).toString()}`, setData)
  }, [
    page, perPage
  ])

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
          <div className='max-w-[1500px] w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 justify-center '>
            {data && data.data && data.data.length == 0 && <div className="h-full w-full flex justify-center items-center">
              <div className="flex flex-col gap-3 justify-center items-center mb-16">
                <Image
                  width={500}
                  height={500}
                  className="w-full he-full max-w-[250px] max-h-[250px]"
                  src={img1}
                  alt="empty"
                />
                <p> چیزی جهت نمایش وجود ندارد</p>
              </div>
            </div>}

            {data && data.data && data.data.map((e, i) => {

              return (<Link href={`/product/${e.route}`} key={`${i}354`} className=" flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 bg-clip-border rounded-xl w-full h-min hover:border-[#f548485d] transition-all duration-500 ease-in-out">
                <div className="mx-2 mt-2 sm:mx-3 md:mx-4 sm:mt-3 md:mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg">
                <Image
                  width={500}
                  height={500} className='object-cover w-full h-full' src={`data:image/webp;base64,${e.imageBase64}`} alt="profile-picture" />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <p className="text-right block mb-2 vazirDemibold max-sm:h-[35px] text-[13px] sm:text-md md:text-lg antialiased leading-snug tracking-normal text-blue-gray-900 ellipsisTwoLine">
                    {e.title}
                  </p>
                  <p className="text-right block vazirLight max-sm:h-[30px] text-[11px] sm:text-sm antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500 ellipsisTwoLine ">
                    {e.description}
                  </p>

                </div>

              </Link>)
            })}

          </div>
        </div>
      </section>


    </>
  )
}

export default AllCategory