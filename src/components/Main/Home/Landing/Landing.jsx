import React from 'react'
import img1 from "@/public/images/4.png"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

const Landing = () => {
  return (
    <div className='flex justify-center w-full h-[calc(100vh-96px)] imageLanding'>
      <div className='h-full w-full max-w-screen-2xl items-center justify-between xl:px-0 px-6 vazirMedium mb-20'>
        <section className='w-full h-full flex flex-col items-center '>
          <section className='grid h-full grid-cols-9 w-full lg:gap-10 '>

            <div className='h-full col-span-9 min-[600px]:col-span-5 w-full relative flex flex-col '>

              <Image className='min-[600px]:absolute top-[5%] z-[1] p-10' width={1500} height={1500} src={img1} alt='about-us' />
            </div>
            <div className='col-span-9 flex h-[90%] items-center min-[600px]:col-span-4 w-full my-2 overflow-hidden px-4'>
              <section className='flex mb-32 gap-6'>
                {/* <div >
                  <span className='block w-3 rounded-xl bg-[var(--color-2)] h-24'></span>

                </div> */}
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl iranSansDemibold !leading-[60px]'>
                    <span className='border-b-red-400  border-b-4 border-t-0 border-l-0 border-r-0'>آواصنعت</span>
                    {" "}
                    تامین کننده و واردکننده قطعات اتوماسیون
                  </h3>
                  <p className='text-gray-600 md:text-md lg:text-[18px] mt-8 leading-8'>
                    در آواصنعت، اهمیت کیفیت قطعات و قابل اعتماد را درک می‌کنیم. به همین دلیل، ما به ارائه قطعات و اجزای با کیفیت بالا برای کمک به افزایش بهره‌وری و کارایی عملیات شما متعهد هستیم.
                  </p>
                  <p className='text-gray-500 md:text-md lg:text-[16px] mt-3 leading-8'>
                    به عنوان یک تامین‌کننده پیشرو قطعات اتوماسیون، ما شهرتی برای ارائه محصولات و خدمات استثنایی به صنایع مانند تولید، لجستیک و بیشتر داریم. تیم متخصص ما سال‌ها تجربه در این زمینه دارد، بنابراین می‌توانید مطمئن باشید که راه‌حل‌های مناسب برای نیازهای خاص شما دریافت می‌کنید
                  </p>
                  <div className='flex gap-3 mt-7'>
                    <Link href={"/contact-us"}>
                      <Button className='bg-[#ff4458] text-white text-lg px-5 py-3 h-[50px] vazirDemibold' >ثبت پیام</Button>
                    </Link>
                    <Link href={"/about-us"}>
                      <Button variant="bordered" className='border border-solid border-[#fe796f] text-lg px-5 py-3 h-[50px] vazirDemibold' >درباره ما </Button>
                    </Link>
                  </div>

                </div>

              </section>
              {/* <p className='text-gray-500 md:text-md lg:text-[14px] mt-5 md:mt-8 sm:text-justify'>


              </p>
          */}


            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Landing