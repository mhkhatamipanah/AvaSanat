import React from 'react'
import img1 from "@/public/images/3.png"
import Image from 'next/image'
import Title from '../../Title/Title'
import { Button } from "@nextui-org/button";
import Link from 'next/link';


const AboutUs = () => {
  return (
    <>
      <div className='h-fit max-w-screen-xl items-center justify-between xl:px-0 px-6 mx-auto vazirMedium mb-20'>
        <section className='w-full flex flex-col items-center mt-2 lg:mt-8'>
          <Title text={" درباره ما"} size={28} />

          <section className='grid grid-cols-9 w-full  lg:gap-16 mt-3  '>
            <div className='col-span-9 lg:col-span-4 w-full my-2 lg:my-8 overflow-hidden'>
              <section className='flex  gap-6'>
                <div >
                  <span className='block w-3 rounded-xl bg-[var(--color-2)] h-24'></span>

                </div>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl iranSansDemibold'>
                    با افتخار آماده همراهی شما هستیم
                  </h3>
                  <p className='text-gray-500 md:text-md lg:text-[16px] mt-8'>برای ارائه بهترین خدمات و محصولات، تمام تلاش خود را به کار گرفته ایم...
                  </p>
                </div>

              </section>

              <p className='text-gray-500 md:text-md lg:text-[14px] mt-5 md:mt-8 sm:text-justify'>


              </p>
              <div className='flex gap-3'>
                <Link href={"/contact-us"}>
                  <Button className='bg-[#df1c4c] text-white' >ثبت پیام</Button>
                </Link>
                <Link href={"/about-us"}>
                  <Button variant="bordered" className='border border-solid border-[#df1c4c]' >درباره ما </Button>
                </Link>
              </div>

            </div>
            <div className='h-full col-span-9 lg:col-span-5 w-full relative flex flex-col justify-center'>

              <Image className='' width={1500} height={1500} src={img1} alt='about-us' />
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default AboutUs