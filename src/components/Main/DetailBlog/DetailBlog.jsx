"use client"
import { Calendar, TimerIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi'
import PaginationComponent from '../../Dashboard/Pagination/PaginationComponents'
import Link from 'next/link'
import moment from 'jalali-moment'
import SideBlog from '../SideBlog/SideBlog'

import parse from 'html-react-parser';
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
const DetailBlog = ({ id }) => {

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

    getApi(`/api/blog/${id}`, setData, setLoading)
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
          <div className='col-span-4 w-full h-min bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2 flex flex-col items-center justify-center'>
            {data && data.length == 0 && LoadingState()}
            {data && data.length !== 0 && <>
              <p className='text-right lg:text-xl md:text-lg text-md vazirDemibold text-gray-800 mt-2'>  {data?.results[0]?.title}</p>
              <p className='text-right text-gray-600  lg:text-lg md:text-base text-sm mb-3 mt-2'>     {data?.results[0]?.subtitle}</p>



              {<img className=' aspect-video object-cover w-full h-full rounded-md max-h-[400px] lg:max-w-[600px] mb-3' src=
                {data?.image ? `data:image/webp;base64,${data?.image}` : "/images/placeholder.jpg"} alt="" />}
              <div className='custom-container vazirMedium'>
                {data?.results[0]?.content && parse(data?.results[0]?.content)}

              </div>
            </>}

          </div>
        </div>
      </section>
    </>
  )
}

export default DetailBlog