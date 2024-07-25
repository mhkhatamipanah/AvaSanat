// import Category from '@/src/components/Dashboard/Category/Category'
"use client"
import getApi from '@/src/utils/Frontend/api/simpleData/getApi';
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
    ,perPage
    //  , rerender
  ])

  return (
    <>
      <div className='flex justify-between items-center'>

        <Link href="/dashboard/product/create">
          <Button className='bg-green-700 text-white'>
            محصولات جدید
            <BadgePlus />
          </Button>

        </Link>
        <div className='w-28'>
          <Select
            value={perPage}
            onSelectionChange={(e) => {
              const values = e.values();
              setPerPage(values.next().value)
            }}
            variant={"bordered"}
            placeholder="تعداد نمایش"
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
          <div className='grid grid-cols-5 gap-4 py-2'>
            {
              data.data.map((e, i) => {
                return (
                  <div className='bg-red-200 w-full rounded-lg' key={i}>

                    <img className='aspect-square object-cover w-full h-full rounded-lg border border-gray-300' src={`data:image/webp;base64,${e.newArr[0].thumbnailBase64}`} alt="" />
                    <p>{e.title}</p>
                    <p>{e.description}</p>
                  </div>
                )

              })
            }
          </div>
          <PaginationComponent countData={countData} perPage={perPage} page={page} setPage={setPage} />
        </>
      }


    </>
  )
}

export default page