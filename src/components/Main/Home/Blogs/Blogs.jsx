"use client"
import React, { useEffect, useState } from 'react'

import { ArrowLeft, Calendar, TimerIcon } from 'lucide-react'
import Link from 'next/link'
import Title from '../../Title/Title'
import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi'
import { Spinner } from '@nextui-org/react'
import img1 from "@/public/images/no-resualt.png";
import Image from 'next/image'
import moment from 'jalali-moment'
import UseWindowSize from '@/src/hooks/UseWindowSize/UseWindowSize'

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


const Blogs = () => {
    const { width } = UseWindowSize()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let data = {
            threeData: true
        };

        getApi(`/api/blog?${(new URLSearchParams(data)).toString()}`, setData, setLoading)
    }, [])

    const LoadingState = () => (
        <div className="w-full h-[500px] flex justify-center items-center">
            <Spinner />
        </div>
    )
    const renderEmptyState = () => (
        <div className="h-full w-full flex justify-center items-center vazirDemibold">
            <div className="flex flex-col gap-3 justify-center items-center mb-16">
                <Image
                    className="w-full he-full max-w-[250px] max-h-[250px]"
                    width={500}
                    height={500}
                    src={img1}
                    alt='asd'
                />
                <p> چیزی جهت نمایش وجود ندارد</p>
            </div>
        </div>
    );
    const renderBlog = () => (
        <>
            <div className='flex justify-between items-center px-4 vazirDemibold my-3'>
                <div>
                    <p className='text-[13px] sm:text-md md:text-xl'>
                        آخرین مقالات
                    </p>
                </div>

                <div className='flex justify-center items-center gap-2'>
                    <Link className='text-[12px] sm:text-md md:text-xl' href={'/blogs'}>
                        مشاهده همه
                    </Link>
                    <ArrowLeft className='max-sm:w-4 max-sm:h-4' />
                </div>
            </div>
            <div className=' grid grid-cols-2 md:grid-cols-3 gap-3'>

                {data && data.data && data.data.slice(0, width < 768 ? 2 : data.data.length).map((e, i) => {
                    if(width <768 ){

                    }
                    return (
                        <section key={i} className='max-[768px]:px-0 px-3'>

                            <div  className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md p-2 border border-gray-100 border-solid">
                                <Link href={`/blogs/${e.id}`}>
                                    <div className='overflow-hidden cursor-pointer rounded-md'>
                                        <img src={`data:image/webp;base64,${e?.image}`} className="aspect-video w-full object-cover hover:scale-110 transition-all" alt="as" />
                                    </div>
                                </Link>



                                <div className="p-4">

                                    <h3 className="text-sm sm:text-lg md:text-xl font-medium text-gray-900 vazirDemibold ellipsisOneLine text-right"> {e.title} </h3>
                                    <p className=" text-[12px] sm:text-md md:text-lg mt-1 text-gray-500 vazirMedium h-[36px] md:h-[56px] ellipsisTwoLine text-right"> {e.subtitle}</p>
                                    <div className="mt-4 flex gap-2 flex-wrap">
                                        <div className='flex gap-1 items-center rounded-full bg-blue-50 px-2 py-1 text-xs vazirDemibold text-blue-600'>
                                            <span className='sm:text-[13px] text-[11px]'> {convertToJalaliDate(e.updatedAt)}</span>
                                            <Calendar className='mb-[2px]' size={18} />
                                        </div>
                                        <div className='flex gap-1 items-center rounded-full bg-orange-50 px-2 py-1 text-xs vazirDemibold text-orange-600'>
                                            <span className='sm:text-[13px] text-[11px]'> {convertToTime(e.updatedAt)}</span>
                                            <TimerIcon className='mb-[2px]' size={18} />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </section>

                    )
                })}



            </div>
        </>
    )
    return (
        <>
            <section className=' flex justify-center w-full pt-5 pb-5 md:pb-10 lg:pb-14 md:pt-14 '>
                <div className='max-w-[1500px] max-[768px]:px-2'>
                    <Title text={"مقالات"} size={32} />

                    {loading ? LoadingState() :
                        data?.data?.length === 0 ? renderEmptyState() : renderBlog()
                    }

                </div>

            </section>


        </>

    )
}

export default Blogs