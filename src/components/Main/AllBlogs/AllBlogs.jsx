"use client"
import { Calendar, TimerIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi'
import PaginationComponent from '../../Dashboard/Pagination/PaginationComponents'
import Link from 'next/link'
import moment from 'jalali-moment'
import SideBlog from '../SideBlog/SideBlog'
import { Spinner } from '@nextui-org/react'


// تابع برای تبدیل به تاریخ شمسی
const convertToJalaliDate = (isoDateString) => {
    const gregorianDate = moment(isoDateString);
    return gregorianDate.format("jYYYY/jMM/jDD");
};

// تابع برای استخراج زمان
const convertToTime = (isoDateString) => {
    const gregorianDate = moment(isoDateString);
    return gregorianDate.format("HH:mm:ss");
};
const AllBlogs = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [countData, setCountData] = useState(null)
    const [perPage, setPerPage] = useState(12)
    const [page, setPage] = useState(1)

    useEffect(() => {
        let data = {
            perPage: perPage,
            page: page,
        };
        let count = {
            count: true
        }
        getApi(`/api/blog?${(new URLSearchParams(data)).toString()}`, setData, setLoading)
        getApi(`/api/blog?${(new URLSearchParams(count)).toString()}`, setCountData)
    }, [page, perPage])

    const LoadingState = () => (
        <div className="w-full h-[600px] flex justify-center items-center">
          <Spinner />
        </div>
      )
    return (
        <>
            <section className=' flex justify-center w-full my-20 min-h-screen   '>

                <div className='w-full grid grid-cols-5 gap-3 max-w-[1500px]'>

                    <SideBlog />
                    <div className='col-span-4 w-full h-min bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2'>
                        {data.length ==0 && LoadingState()}
                        {data && data.data &&
                            <>
                                <div className='grid grid-cols-1 gap-4 py-2'>
                                    {
                                        data.data.map((e, i) => {
                                            return (
                                                <div className='relative flex gap-3 w-full rounded-lg p-3 bg-gray-50 border border-solid border-gray-300' key={`blog-${i}`}>
                                                    <div className='w-64 aspect-video overflow-hidden rounded-lg border border-solid border-gray-200' >

                                                        <Link href={`/blogs/${e.id}`}>
                                                            <img className=' aspect-video object-cover w-full h-full cursor-pointer hover:scale-105 transition-all duration-400 ' src=
                                                                {e?.image ? `data:image/webp;base64,${e?.image}` : "/images/placeholder.jpg"} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div className='oneLineShow'>
                                                            <p className='text-right lg:text-xl md:text-lg text-md vazirDemibold text-gray-800 mt-2'>{e.title}</p>
                                                        </div>
                                                        <div className='twoLineShow'>
                                                            <p className='text-right text-gray-600 my-2 lg:text-lg md:text-base text-sm'>{e.subtitle}</p>
                                                        </div>
                                                        <div className="mt-4 flex gap-2">
                                                            <div className='flex gap-1 items-center rounded-full bg-blue-100 px-2 py-1 text-xs vazirDemibold text-blue-600'>
                                                                <span > {convertToJalaliDate(e.updatedAt)}</span>
                                                                <Calendar className='mb-[2px]' size={18} />
                                                            </div>
                                                            <div className='flex gap-1 items-center rounded-full bg-orange-100 px-2 py-1 text-xs vazirDemibold text-orange-600'>
                                                                <span > {convertToTime(e.updatedAt)}</span>
                                                                <TimerIcon className='mb-[2px]' size={18} />
                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>
                                            )

                                        })
                                    }
                                </div>
                                {countData && countData.countData && <PaginationComponent countData={countData.countData} perPage={perPage} page={page} setPage={setPage} />}
                            </>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllBlogs