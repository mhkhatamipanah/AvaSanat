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
        <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center mb-16">
                <Image
                    className="w-full he-full max-w-[250px] max-h-[250px]"
                    width={500}
                    height={500}
                    src={img1}
                />
                <p> چیزی جهت نمایش وجود ندارد</p>
            </div>
        </div>
    );
    const renderBlog = () => (
        <>
            <div className='flex justify-between items-center px-4 vazirDemibold my-3'>
                <div>
                    <p className='text-xl'>

                        آخرین مقالات
                    </p>
                </div>

                <div className='flex justify-center items-center gap-2'>
                    <Link href={'/blogs'}>
                        مشاهده همه
                    </Link>
                    <ArrowLeft />
                </div>
            </div>
            <div className=' grid grid-cols-3 gap-3'>

                {data && data.data && data.data.map((e, i) => {
                    return (
                        <div key={i} className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md p-2 border border-gray-100 border-solid">
                            <Link href={`/blogs/${e.id}`}>
                            <div className='overflow-hidden cursor-pointer rounded-md'>
                                <img src={`data:image/webp;base64,${e?.image}`} className="aspect-video w-full object-cover hover:scale-110 transition-all" alt="" />
                            </div>
                            </Link>



                            <div className="p-4">

                                <h3 className="text-xl font-medium text-gray-900 vazirDemibold oneLineShow text-right"> {e.title} </h3>
                                <p className="mt-1 text-gray-500 vazirMedium h-[70px] twoLineShow text-right"> {e.subtitle}</p>
                                <div className="mt-4 flex gap-2">
                                    <div className='flex gap-1 items-center rounded-full bg-blue-50 px-2 py-1 text-xs vazirDemibold text-blue-600'>
                                        <span > {convertToJalaliDate(e.updatedAt)}</span>
                                        <Calendar className='mb-[2px]' size={18} />
                                    </div>
                                    <div className='flex gap-1 items-center rounded-full bg-orange-50 px-2 py-1 text-xs vazirDemibold text-orange-600'>
                                        <span > {convertToTime(e.updatedAt)}</span>
                                        <TimerIcon className='mb-[2px]' size={18} />
                                    </div>


                                </div>
                            </div>
                        </div>
                    )
                })}



            </div>
        </>
    )
    return (
        <>
            <section className=' flex justify-center w-full mb-20 mt-10  '>
                <div className='max-w-[1500px]'>
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