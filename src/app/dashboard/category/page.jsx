// import Category from '@/src/components/Dashboard/Category/Category'
"use client"
import getApi from '@/src/utils/Frontend/api/simpleData/getApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const page = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    // let data = {
    //     perPage: rowsPerPage,
    //     page: page,
    //     ...(sendOrRecevied ? { sendOrRecevied } : {}),


    // };
    // getApi(`${route}?${(new URLSearchParams(data)).toString()}`, setData , setLoading)
    getApi("/api/category", setData)


  }, [
    // page , rerender
  ])

  return (
    <>
      <Link href="/dashboard/category/create">create</Link>
      {/* <Category/> */}
      {data  && data.data && 

        <div className='grid grid-cols-3 gap-4'>
          {
            data.data.map((e, i) => {
              return (
                <div className='bg-red-200 w-full rounded-lg' key={i}>
                  
                  <img className='aspect-square object-cover w-full h-full rounded-lg border border-gray-300' src={`data:image/webp;base64,${e.imageBase64}`} alt="" />
                </div>
              )

            })
          }
        </div>
      }


    </>
  )
}

export default page