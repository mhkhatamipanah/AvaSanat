import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "@/public/images/5.jpg"
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronLeft, ListCollapse } from 'lucide-react';
import { Button } from '@nextui-org/react';
import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';
import Link from 'next/link';
const BookSlider = ({ id, routeCategory }) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        let data = {
            related: true,
            ...(routeCategory && { routeCategory }),

        };

        getApi(`/api/product/${id}?${(new URLSearchParams(data)).toString()}`, setData)
        // getApi("/api/category", setData)
    }, [
        // page, perPage
        //  , rerender
    ])


    const settings = {
        dots: false, // نقطه‌ها (navigation dots) غیرفعال شده‌اند
        infinite: true, // چرخش بی‌نهایت
        speed: 500, // سرعت انیمیشن
        slidesToShow: 5, // تعداد کتاب‌ها در هر اسلاید
        slidesToScroll: 1, // تعداد کتاب‌هایی که در هر اسکرول حرکت می‌کنند
        autoplay: true, // حرکت خودکار اسلایدر
        // autoplaySpeed: 3000, // مدت زمان نمایش هر اسلاید (در میلی‌ثانیه)
        nextArrow: <SampleNextArrow />, // فلش راست
        prevArrow: <SamplePrevArrow />, // فلش چپ

    };

    return (
        <div className='mt-10'>
            <div className='w-full flex justify-between vazirMedium px-2'>
                <div>
                    <p className='flex gap-2 items-center text-lg'>
                        <ListCollapse />
                        محصولات مرتبط
                    </p>
                </div>
                <div>
                    <Link href={`/product/${routeCategory}`}>
                        <Button className='' variant="light">
                            <p className='flex gap-1 items-center'>
                                دیدن همه
                                <ChevronLeft size={20} />
                            </p>
                        </Button>
                    </Link>


                </div>
            </div>
            {data &&
                <div className=' flex justify-center items-center flex-col '>
                    <Slider style={{ width: 'calc(100% )' }} {...settings}>
                        {data && data.data && data.data.map((e , i) => {
                            return (
                                <div className='m-2 p-2 ' key ={`slider-${i}`}>
                                    <div className=' p-2 border border-gray-300 rounded-xl'>
                                        <Link href={`/product/${e.routeCategory}/${e.id}`} >
                                            <img className='object-cover w-full h-full rounded-md' src={e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="profile-picture" />
                                        </Link>
                                        <div className=" text-right p-2">
                                            <p className="block mb-2 vazirDemibold text-xl antialiased leading-snug tracking-normal text-blue-gray-900 ">
                                                {e.title}
                                            </p>
                                            <p className="block mb-2 vazirLight text-md antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500">
                                                {e.description}
                                            </p>
                                            <Link href={`/product/${e.routeCategory}/${e.id}`} >
                                                <Button className='vazirMedium w-full'>
                                                    <ArrowLeft size={20} />
                                                    جزیات محصول
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </Slider>
                </div>
            }
        </div>
    );
};

// کامپوننت فلش بعدی (راست)
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (

        <ArrowRight className={`${className} w-full h-full z-40 !text-gray-700 !bg-gray-200 rounded-full !p-2`}
            style={{
                ...style, width: "40px", height: "40px", display: "block", right: "-50px", zIndex: 1


            }}
            onClick={onClick} />

    );
};

// کامپوننت فلش قبلی (چپ)
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <ArrowLeft className={`${className} w-full h-full z-40 !text-gray-700 !bg-gray-200 rounded-full !p-2`}
            style={{
                ...style, width: "40px", height: "40px", display: "block", left: "-50px", zIndex: 1


            }}
            onClick={onClick} />
    );
};

export default BookSlider;
