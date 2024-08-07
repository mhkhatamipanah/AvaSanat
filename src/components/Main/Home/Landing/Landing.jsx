import React from 'react'
import img1 from "@/public/images/4.png"
import Image from 'next/image'


const Landing = () => {
  return (
    <div className='flex justify-center w-full h-[calc(100vh-96px)] imageLanding'>
      <div className='h-full w-full max-w-screen-2xl items-center justify-between xl:px-0 px-6 vazirMedium mb-20'>
        <section className='w-full h-full flex flex-col items-center mt-2 '>
          <section className='grid h-full grid-cols-9 w-full lg:gap-16 mt-3'>
           
            <div className='h-full col-span-9 lg:col-span-5 w-full relative flex flex-col '>
         
              <Image className='absolute top-[5%] z-[1]' width={1500} height={1500} src={img1} alt='about-us' />
            </div>
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


            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Landing