import React from 'react'
import img1 from "@/public/images/4.png"
import Image from 'next/image'
const AboutUs = () => {
  return (
    <>
      <div className='h-fit max-w-screen-xl items-center justify-between xl:px-0 px-6 mx-auto vazirMedium mb-20'>
        <section className='w-full flex flex-col items-center mt-2 lg:mt-8'>

          <section className='grid grid-cols-9 w-full lg:gap-16 mt-3 justify-center items-center '>
            <div className='col-span-9 lg:col-span-4 w-full my-2 overflow-hidden flex flex-col items-center justify-center'>
              <section className='flex gap-6 self-start'>
                <div >
                  <span className='block w-3 rounded-xl bg-[#e43253] h-24'></span>

                </div>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl iranSansDemibold'>
                    با افتخار آماده همراهی شما هستیم
                  </h3>
                  <p className='text-gray-600 md:text-md lg:text-[16px] mt-8'>برای ارائه بهترین خدمات و محصولات، تمام تلاش خود را به کار گرفته ایم...
                  </p>
                </div>

              </section>

              <p className='text-gray-500 md:text-md lg:text-[15px] mt-5 md:mt-8 sm:text-justify'>
                آواصنعت به عنوان یکی از پیشروان در عرصه واردات و توزیع قطعات اتوماسیون صنعتی و ابزار دقیق، با تکیه بر تجربه و دانش فنی، همواره در تلاش است تا نیازهای متنوع صنعت را پاسخگو باشد. این شرکت با ارائه محصولات از معتبرترین برندهای جهانی و حذف واسطه‌ها، اطمینان حاصل می‌کند که مشتریان به بهترین کیفیت و قیمت دسترسی داشته باشند.
                <br />
                <br />
                آواصنعت فراتر از یک تأمین‌کننده عمل می‌کند؛ از مرحله پیش از خرید با ارائه مشاوره تخصصی، تا نصب و راه‌اندازی و خدمات پس از فروش، همواره در کنار مشتریان خود ایستاده است. این تعهد به همراهی و پشتیبانی، بخشی از فلسفه آواصنعت برای ایجاد تجربه‌ای مطمئن و رضایت‌بخش برای مشتریان است.
                <br />
                <br />
                با تمرکز بر کیفیت و نوآوری، آواصنعت تلاش می‌کند تا همواره به‌روزترین و کارآمدترین راه‌حل‌ها را در اختیار صنعتگران و مهندسان قرار دهد. خدمات متعهدانه و حرفه‌ای این شرکت، تضمینی برای بهره‌وری و موفقیت پروژه‌های صنعتی شما خواهد بود. هدف آواصنعت، جلب رضایت مشتریان و ارائه خدماتی است که فراتر از انتظارات باشد.


              </p>


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