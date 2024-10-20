"use client"
import React, { useContext, useEffect, useState } from 'react'

import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi'
import Link from 'next/link'
import moment from 'jalali-moment'
import PaginationComponent from '@/src/components/Dashboard/Pagination/PaginationComponents'
import AccordionComponent from './AccordionComponent'
import { useSearchParams, useRouter } from "next/navigation";
import Image from 'next/image'
import img1 from "@/public/images/no-resualt.png";
import { Button, Spinner } from '@nextui-org/react'
import { searchContext } from "@/src/hooks/useContextProvider/ContextProvider";
import Drawlerbottom from './Drawlerbottom'
import { SendHorizonal, SlidersHorizontal } from 'lucide-react'


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
    const searchParams = useSearchParams();
    const router = useRouter();

    const q = searchParams.get("q");
    const Category = searchParams.get("Category");
    const brand = searchParams.get("brand");

    const { searchTextContext, setSearchTextContext } = useContext(searchContext);

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [perPage, setPerPage] = useState(12)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        let data = {
            perPage,
            page,
            ...(q && { q }),
            ...(!q && searchTextContext && { q: searchTextContext }), // اگر q نبود، searchTextContext را اضافه کن
            // ...(!q && !searchTextContext && { q: "" }), // اگر q نبود، searchTextContext را اضافه کن
            ...(brand && { brand }),
            ...(Category && { Category }),
        };

        const query = new URLSearchParams(searchParams.toString());

        // حذف پارامتر 'q' (اگر وجود داشته باشد)
        if (query.has('q')) {
            query.delete('q');
        }

        router.push(`?${query.toString()}`, undefined, { shallow: true });


        getApi(`/api/search?${(new URLSearchParams(data)).toString()}`, setData, setLoading)
    }, [page, perPage, searchTextContext, brand, Category])


    const renderEmptyState = () => (
        <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center mb-16 h-[500px]">
                <Image
                    className="w-full max-w-[250px] max-h-[250px]"
                    width={500}
                    height={500}
                    src={img1}
                />
                <p className='vazirMedium'> چیزی جهت نمایش وجود ندارد</p>
            </div>
        </div>
    );

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Drawlerbottom open={isOpen} setOpen={setIsOpen} />
            <section className=' flex flex-col items-center w-full mt-4 sm:mt-6 md:mt-8 min-h-screen   '>
                <div className='flex min-[1000px]:hidden justify-between items-center mb-4 w-full sm:px-6 px-3 vazirDemibold ' >
                    <Button
                        onClick={() => { setIsOpen(true) }}
                        className="bg-[#ebebeb]"
                        variant="solid"
                    >
                        <SlidersHorizontal />

                        فیلتر
                    </Button>

                </div>
                <div className='w-full grid grid-cols-5 gap-3 max-w-[1500px] sm:px-6 px-3'>

                    <div className='min-[1000px]:flex hidden col-span-1 w-full h-min flex-col gap-3  '>

                        <AccordionComponent />

                    </div>
                    <div className='min-[1000px]:col-span-4 col-span-5 w-full h-min bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2 '>

                        {loading ?
                            <div className="w-full h-[500px] flex justify-center items-center">
                                <Spinner />
                            </div>
                            :
                            <>
                                {data && data.product && data.product.length > 0 &&
                                    <>
                                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 pb-2'>
                                            {
                                                data.product.map((e, i) => {
                                                    return (
                                                        <div className='relative flex flex-col gap-3 w-full rounded-lg p-3 bg-gray-50 border border-solid border-gray-300' key={`blog-${i}`}>
                                                            <div className='w-full aspect-square overflow-hidden rounded-lg border border-solid border-gray-200' >

                                                                <Link href={`/product/${e.routeCategory}/${e.id}`}>
                                                                    <img className='aspect-square object-cover w-full h-full cursor-pointer hover:scale-105 transition-all duration-400 ' src=
                                                                        {e?.image ? `data:image/webp;base64,${e?.image}` : "/images/placeholder.jpg"} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <div className='oneLineShow'>
                                                                    <p className='text-right lg:text-xl md:text-lg text-md vazirDemibold text-gray-800 mt-2'>{e.title}</p>
                                                                </div>
                                                                <div className='twoLineShow'>
                                                                    <p className='text-right text-gray-600 my-2 lg:text-lg md:text-base text-sm vazirMedium'>{e.subtitle}</p>
                                                                </div>
                                                                {/* <div className="mt-4 flex gap-2">
                                                            <div className='flex gap-1 items-center rounded-full bg-blue-100 px-2 py-1 text-xs vazirDemibold text-blue-600'>
                                                                <span > {convertToJalaliDate(e.updatedAt)}</span>
                                                                <Calendar className='mb-[2px]' size={18} />
                                                            </div>
                                                            <div className='flex gap-1 items-center rounded-full bg-orange-100 px-2 py-1 text-xs vazirDemibold text-orange-600'>
                                                                <span > {convertToTime(e.updatedAt)}</span>
                                                                <TimerIcon className='mb-[2px]' size={18} />
                                                            </div>
                                                        </div> */}
                                                            </div>

                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                        {<PaginationComponent countData={data.total_item} perPage={perPage} page={page} setPage={setPage} />}
                                    </>
                                }
                                {data && data.product && data.product.length == 0 && renderEmptyState()}
                            </>}

                    </div>
                </div>
            </section>
        </>
    )
}

export default AllBlogs