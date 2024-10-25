import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight, ChevronLeft, ListCollapse } from 'lucide-react';
import { Button } from '@nextui-org/react';
import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';
import Link from 'next/link';
import Image from 'next/image';
const BookSlider = ({ id, routeCategory }) => {

    const [data, setData] = useState(null)

    const getData = () => {
        let data = {
            related: true,
            ...(routeCategory && { routeCategory }),
        };
        getApi(`/api/product/${id}?${(new URLSearchParams(data)).toString()}`, setData)
    }
    useEffect(() => {
        getData()
    }, [])


    const settings = {
        className: "center",
        centerPadding: "60px",
        dots: true, // نقطه‌ها (navigation dots) غیرفعال شده‌اند
        infinite: true, // چرخش بی‌نهایت
        // autoplaySpeed: 2000,
        // pauseOnHover: true,
        slidesToShow: 5, // تعداد کتاب‌ها در هر اسلاید
        slidesToScroll: 1, // تعداد کتاب‌هایی که در هر اسکرول حرکت می‌کنند
        autoplay: true, // حرکت خودکار اسلایدر
        // autoplaySpeed: 3000, // مدت زمان نمایش هر اسلاید (در میلی‌ثانیه)
        nextArrow: <SampleNextArrow />, // فلش راست
        prevArrow: <SamplePrevArrow />, // فلش چپ
        lazyLoad: true,
        initialSlide: 0,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1248,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: false, // غیرفعال کردن فلش‌ها
                    dots: false,

                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    arrows: false, // غیرفعال کردن فلش‌ها
                    dots: false,

                }
            }

        ]

    };

    return (
        <div className='mt-10 max-[768px]:px-4 px-16'>
            <div className='w-full flex justify-between items-center vazirMedium px-2'>
                <div>
                    <p className='flex gap-2 items-center lg:text-lg md:text-base text-sm'>
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
                <div className=' flex justify-center items-center flex-col marginCarousel'>
                    <Slider style={{ width: 'calc(100% )' }} {...settings}>
                        {data && data.data && data.data.map((e, i) => {
                            console.log(e)
                            return (
                                <div className='' key={`slider-${i}`}>
                                    <div className='max-[768px]:m-2 m-3 p-2 border border-gray-300 rounded-xl'>
                                        <Link href={`/product/${e.routeCategory}/${e.id}`} >
                                            <Image width={500} height={500} className='object-cover w-full h-full rounded-md aspect-square border border-solid border-gray-100' src={e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="profile-picture" />
                                        </Link>
                                        <div className=" text-right p-2">
                                            <p className="block mb-2 mt-1 vazirDemibold text-gray-800 lg:text-md md:text-base text-sm antialiased leading-snug tracking-normal text-blue-gray-900 ellipsisOneLine">
                                                {e.title}
                                            </p>
                                            <p className="block mb-2 vazirLight text-md antialiased leading-snug tracking-normal text-blue-gray-900 text-gray-500">
                                                {e.description}
                                            </p>
                                            <Link href={`/product/${e.routeCategory}/${e.id}`} >
                                                <Button className='vazirMedium w-full md:text-base text-[11px] px-3'>
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
                ...style, width: "40px", height: "40px", display: "block", right: "-45px", zIndex: 1


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
                ...style, width: "40px", height: "40px", display: "block", left: "-45px", zIndex: 1


            }}
            onClick={onClick} />
    );
};

export default BookSlider;
