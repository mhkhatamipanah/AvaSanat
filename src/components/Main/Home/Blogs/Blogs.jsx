import React from 'react'
import Image from 'next/image'
import img1 from '@/public/images/blogs/original.jpg'
import { ArrowLeft, Calendar, TimerIcon } from 'lucide-react'
import Link from 'next/link'
import Title from '../../Title/Title'
const Blogs = () => {
    return (
        <>
            <section className=' flex justify-center w-full mb-20 mt-10  '>
                <div className='max-w-[1500px]'>
                    <Title text={"مقالات"} size={28} />

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
                        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md p-2 border border-gray-100 border-solid">
                            <Image width={700} height={500} src={img1} className="aspect-video w-full object-cover rounded-md" alt="" />

                            <div className="p-4">

                                <h3 className="text-xl font-medium text-gray-900 vazirDemibold oneLineShow">تیتر مقاله </h3>
                                <p className="mt-1 text-gray-500 vazirMedium h-[70px] threeLineShow">توضیحات مقاله</p>
                                <div className="mt-4 flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs vazirDemibold text-blue-600"> Design </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs vazirDemibold text-indigo-600"> Product </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs vazirDemibold text-orange-600"> Develop </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md p-2 border border-gray-100 border-solid">
                            <Image width={700} height={500} src={img1} className="aspect-video w-full object-cover rounded-md" alt="" />
                            <div className="p-4">

                                <h3 className="text-xl font-medium text-gray-900 vazirDemibold oneLineShow ">تیتر مقاله اگر زیاد اینجا نوشته شود سه نقطه نمایش داده خواهد شد</h3>
                                <p className="mt-1 text-gray-500 vazirMedium h-[70px] threeLineShow">توضیحات مقاله میتواند هر چیزی باید و اگر اینجا زیاد   نوشته شود تا سه سطر مشکلی ندارد اما بیشتر از آن هر چیزی که نوشته شود به صورت سه نقطه نمایش داده خواد شد و این باعث می شود که نمایش به هم نریزد</p>
                                <div className="mt-4 flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs vazirDemibold text-blue-600 "> ساعت <TimerIcon /> </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs vazirDemibold text-indigo-600 "> تاریخ <Calendar /> </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs vazirDemibold text-orange-600"> Develop </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md p-2 border border-gray-100 border-solid">
                            <Image width={700} height={500} src={img1} className="aspect-video w-full object-cover rounded-md" alt="" />
                            <div className="p-4">

                                <h3 className="text-xl font-medium text-gray-900 vazirDemibold oneLineShow">تیتر مقاله </h3>
                                <p className="mt-1 text-gray-500 vazirMedium h-[70px] threeLineShow">توضیحات مقاله</p>
                                <div className="mt-4 flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs vazirDemibold text-blue-600"> Design </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs vazirDemibold text-indigo-600"> Product </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs vazirDemibold text-orange-600"> Develop </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


        </>

    )
}

export default Blogs