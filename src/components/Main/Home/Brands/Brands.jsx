"use client"
import img1 from "@/public/images/brands/1.png"
import img2 from "@/public/images/brands/2.png"
import img3 from "@/public/images/brands/3.png"
import img4 from "@/public/images/brands/4.png"
import img5 from "@/public/images/brands/5.png"
import img6 from "@/public/images/brands/6.png"

import Image from "next/image"
import Title from "../../Title/Title"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay,  } from 'swiper/modules';

const Brands = () => {
 
  return (
    <>
      <section className="relative flex flex-col items-center justify-center w-full pt-5 pb-4 lg:pb-9 lg:pt-10 bg-gray-100 overflow-hidden">
        <div className='w-full max-w-[1500px] h-full max-h-[700px] flex flex-col items-center justify-center'> {/* تنظیمات مرکزیت عمودی و افقی */}
          <Title text={"برند ها"} size={32} />
          
            <div className="w-full flex flex-col items-center justify-center px-4 pb-4 md:mt-4">
              <Swiper
               modules={[Autoplay]}
                spaceBetween={50} // فاصله بین اسلایدها
                slidesPerView={5} // تعداد اسلایدهای قابل مشاهده در هر بار
                loop={true} // اسلاید‌ها به صورت حلقه‌ای بچرخند
                autoplay={{
                  delay: 2000, // تایم تاخیر بین هر اسلاید
                  disableOnInteraction: true, // برای اینکه پس از تعامل هم ادامه پیدا کنه
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 5, // برای صفحات کوچکتر تعداد اسلایدهای نمایشی رو کم کن
                    spaceBetween: 30, // فاصله کمتر در موبایل‌های بزرگتر
                  },
                  768: {
                    slidesPerView: 5, // برای صفحات کوچکتر تعداد اسلایدهای نمایشی رو کم کن
                    spaceBetween: 25, // فاصله کمتر در موبایل‌های بزرگتر
                  },
                  0: {
                    slidesPerView: 3, // برای صفحات کوچکتر تعداد اسلایدهای نمایشی رو کم کن
                    spaceBetween: 20, // فاصله کم‌تر برای موبایل‌ها
                  },
                }}
                className="w-full mt-4"
              >
                <SwiperSlide>
                  <Image alt="as" className="object-contain" width={500} height={500} src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image alt="asd" className="object-contain" width={500} height={500} src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image alt="as" className="object-contain" width={500} height={500} src={img3} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image alt="as" className="object-contain" width={500} height={500} src={img4} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image alt="as" className="object-contain" width={500} height={500} src={img5} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image alt="as" className="object-contain" width={500} height={500} src={img6} />
                </SwiperSlide>
              </Swiper>
            </div>
          
        </div>
      </section>
    </>
  )
}

export default Brands
