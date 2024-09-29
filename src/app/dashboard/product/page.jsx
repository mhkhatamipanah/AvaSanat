// import Category from '@/src/components/Dashboard/Category/Category'
"use client"
import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { BadgePlus } from 'lucide-react';
import PaginationComponent from '@/src/components/Dashboard/Pagination/Pagination';
import { SelectItem, Select } from '@nextui-org/react';

const page = () => {

  const [data, setData] = useState([])
  const [countData, setCountData] = useState(null)
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)


  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
      // ...(sendOrRecevied ? { sendOrRecevied } : {}),
    };
    let count = {
      count: true
    }
    getApi(`/api/product?${(new URLSearchParams(data)).toString()}`, setData)
    getApi(`/api/product?${(new URLSearchParams(count)).toString()}`, setCountData)
  }, [
    page
    , perPage
    //  , rerender
  ])

  return (
    <>
      <div
        className="p-2 lg:p-3 grid grid-cols-1 justify-center w-full gap-4"
        id="container"
      >

        <section
          id="section-1"
          className={`w-full flex flex-col h-full bg-[#ffffff] rounded-lg boxShadow p-4 min-h-[600px]`}
        >

          <div className='flex justify-between items-center mb-3 px-3'>

            <Link href="/dashboard/product/create">
              <Button className='bg-green-700 text-white'>
                محصولات جدید
                <BadgePlus />
              </Button>

            </Link>
            <div className='w-24'>
              <Select
                value={perPage}
                onSelectionChange={(e) => {
                  const values = e.values();
                  setPerPage(values.next().value)
                }}
                variant={"bordered"}
                placeholder=" نمایش"
                className="max-w-xs selectNextUi spanSize"
              >
                <SelectItem value={12} key={12}>
                  12
                </SelectItem>
                <SelectItem value={18} key={18}>
                  18
                </SelectItem>
                <SelectItem value={24} key={24}>
                  24
                </SelectItem>
              </Select>
            </div>
          </div>
          {/* <Category/> */}
          {data && data.data &&
            <>
              <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-2'>
                {
                  data.data.map((e, i) => {
                    return (
                      <div className=' w-full rounded-lg p-3 bg-gray-50 border border-solid border-gray-300' key={i}>
                        <div className='w-full aspect-square overflow-hidden rounded-lg'>
                          <img className=' aspect-square object-cover w-full h-full cursor-pointer hover:scale-110 transition-all duration-400' src={`data:image/webp;base64,${e.newArr[0].thumbnailBase64}`} alt="" />
                        </div>
                        <div className='oneLineShow'>
                          <p className='text-right md:text-md text-base vazirDemibold text-gray-800 mt-2'>{e.title}</p>
                        </div>
                        <div className='twoLineShow'>
                          <p className='text-right text-gray-600 my-2 lg:text-lg md:text-base text-sm'>{e.description}</p>
                        </div>
                      </div>
                    )

                  })
                }
              </div>
              <PaginationComponent countData={countData} perPage={perPage} page={page} setPage={setPage} />
            </>
          }

        </section>
      </div>

    </>
  )
}

export default page