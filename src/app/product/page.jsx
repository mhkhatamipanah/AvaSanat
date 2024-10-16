"use client"
import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi"
import { Spinner } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import img1 from "@/public/images/no-resualt.png";

const Page = () => {

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
      <section className=' flex flex-col items-center justify-center w-full my-20 '>
          {data.length == 0 && LoadingState()}
        <div className='max-w-[1500px] w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 justify-center'>
          {data && data.data && data.data.length == 0 && <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center mb-16">
              <Image
                className="w-full he-full max-w-[250px] max-h-[250px]"
                width={500}
                height={500}
                src={img1}
              />
              <p> چیزی جهت نمایش وجود ندارد</p>
            </div>
          </div>}

          {data && data.data && data.data.map((e, i) => {

            return (<Link href={`/product/${e.route}`} key={`${i}354`} className=" flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 bg-clip-border rounded-xl w-full h-min hover:border-[#f548485d] transition-all duration-500 ease-in-out">
              <div className=" mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg">
                <img className='object-cover w-full h-full' src={`data:image/webp;base64,${e.imageBase64}`} alt="profile-picture" />
              </div>
              <div className="p-6 text-center">
                <p className="block mb-2 vazirDemibold text-lg antialiased leading-snug tracking-normal text-blue-gray-900 ">
                  {e.title}
                </p>
                <p className="block mb-2 vazirLight text-sm antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500">
                  {e.description}
                </p>

              </div>

            </Link>)
          })}

        </div>
      </section>


    </>
  )
}

export default Page