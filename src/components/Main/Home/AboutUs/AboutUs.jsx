import React from 'react'
import img1 from "@/public/images/4.png"
import Image from 'next/image'
import Title from '../../Title/Title'

import icon1 from "@/public/images/icon/1.png"
import icon2 from "@/public/images/icon/2.png"
import icon3 from "@/public/images/icon/3.png"

const AboutUs = () => {
  return (
    <>
      <div className='h-fit max-w-screen-xl items-center justify-between xl:px-0 px-3 sm:px-6 mx-auto vazirMedium md:mb-8 pt-5 pb-5'>
        <section className='w-full flex flex-col items-center mt-2 lg:mt-8 w'>
          <Title text={" درباره ما"} size={32} />

          <section className='grid grid-cols-9 w-full  lg:gap-16 mt-3  '>
            <div className='col-span-9 lg:col-span-4 w-full sm:my-2 justify-center flex flex-col overflow-hidden'>
              <section className='flex gap-6'>
                <div className='w-full'>
                  <h3 className='text-base sm:text-xl md:text-2xl lg:text-3xl iranSansDemibold text-center'>
                    {/* <span className="border-b-red-400  border-b-4 border-t-0 border-l-0 border-r-0"> */}
                      خدمات و سرویس های ما
                    {/* </span> */}
                  </h3>
                  <p className='text-gray-500 text-sm md:text-md lg:text-[16px] mt-2 sm:mt-4 lg:mt-8 text-center'>برای ارائه بهترین خدمات و محصولات، تمام تلاش خود را به کار گرفته ایم...
                  </p>
                  <div className="container flex sm:px-5 mx-auto justify-center max-sm:mt-3">
                    <div className="flex flex-wrap text-center justify-center">
                      <div className="p-4 max-sm:w-1/2">
                        <div className="sm:px-4 sm:py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                            <Image alt='23' src={icon3} className="w-16 sm:w-24 lg:w-32 mb-3" />
                          </div>
                          <h2 className="title-font font-regular text-[11px] sm:text-sm lg:text-md text-gray-800">قطعات باکیفیت</h2>
                        </div>
                      </div>

                      <div className="p-4 max-sm:w-1/2">
                        <div className="sm:px-4 sm:py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                            <Image alt='23' src={icon1} className="w-16 sm:w-24 lg:w-32 mb-3" />
                          </div>
                          <h2 className="title-font font-regular text-[11px] sm:text-sm lg:text-md text-gray-800">قیمت رقابتی</h2>
                        </div>
                      </div>



                      <div className="p-4 max-sm:w-full">
                        <div className="sm:px-4 sm:py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                            <Image alt='23' src={icon2} className="w-16 sm:w-24 lg:w-32 mb-3" />
                          </div>
                          <h2 className="title-font font-regular text-[11px] sm:text-sm lg:text-md text-gray-800">مشاوره از خرید تا نصب</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </section>

              <p className='text-gray-500 md:text-md lg:text-[14px] mt-5 md:mt-8 sm:text-justify'>


              </p>
              {/* <div className='flex gap-3'>
                <Link href={"/contact-us"}>
                  <Button className='bg-[#fe405a] text-white' >ثبت پیام</Button>
                </Link>
                <Link href={"/about-us"}>
                  <Button variant="bordered" className='border border-solid border-[#fe405a]' >درباره ما </Button>
                </Link>
              </div> */}

            </div>
            <div className='h-full col-span-9 lg:col-span-5 w-full relative flex-col justify-center max-[768px]:hidden block'>

              <Image className='p-6 max-h-[650px] object-contain' width={1500} height={1500} src={img1} alt='about-us' />
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default AboutUs