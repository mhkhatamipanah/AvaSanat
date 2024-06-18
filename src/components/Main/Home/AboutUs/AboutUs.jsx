import React from 'react'

const AboutUs = () => {
  return (
   <>
   <div className='h-fit max-w-screen-xl items-center justify-between xl:px-0 px-6 mx-auto vazirMedium mb-20'>
        <section className='w-full flex flex-col items-center mt-2 lg:mt-8'>

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
                کارخانه ورسان مفتخر است که با ارائه محصولات مناسب صنعت چسب، از نظر کیفیت و حجم بالا در کنار قیمت اقتصادی و به صرفه، نیازهای مختلف مشتریان خود را برآورده سازد.
                <br />
                ما در ورسان، همواره بر تعهدات خود در تامین به موقع کالاها در پایین ترین نوسانات قیمتی بازار کشور به مشتریان پایبند بوده و همواره برآنیم تا محصولاتی ارائه دهیم که در نگاه مشتری حرف اول را بزند.
                <br />

                ارائه چسب های قوی، بادوام و مقرون به صرفه، از جمله اهداف اصلی ما در ورسان است.
                <br />

                ما در این مسیر، از بهترین مواد اولیه و پیشرفته ترین تکنولوژی ها استفاده می کنیم و با نظارت دقیق بر مراحل تولید، کیفیت و ظاهری کم نظیر را رقم بزنیم.
                <br />

              </p>

              <section className='mt-10 flex flex-col gap-6'>

                <div className='flex gap-5'>
                  <div className='w-11 h-11 bg-[var(--color-2)] rounded-full flex justify-center items-center text-white'>
                    {/* <Shield size={24} /> */}
                  </div>
                  <div>
                    <p className='text-[16px]'>کیفیت</p>
                    <p className=' text-[14px] text-gray-500'>
مواد اولیه اروپایی - بسته بندی مقاوم 
                    </p>
                  </div>
                </div>
                <div className='flex gap-5'>
                  <div className='w-11 h-11 bg-[var(--color-2)] rounded-full flex justify-center items-center text-white'>
                    {/* <BadgeCheck size={24} /> */}
                  </div>
                  <div>
                    <p className='text-[16px]'>رضایت مشتریان</p>
                    <p className=' text-[14px] text-gray-500'>
حجم صنعتی - قیمت به صرفه
                    </p>
                  </div>
                </div>
                <div className='flex gap-5'>
                  <div className='w-11 h-11 bg-[var(--color-2)] rounded-full flex justify-center items-center text-white'>
                    {/* <AlarmClock size={24} /> */}
                  </div>
                  <div>
                    <p className='text-[16px]'> زمان </p>
                    <p className=' text-[14px] text-gray-500'>
                  سرعت عمل بالا
                    </p>
                  </div>
                </div>

              </section>

            </div>
            <div className='h-full col-span-9 lg:col-span-5 w-full relative flex flex-col justify-center'>

            {/* <Image className='' width={1500} height={1500} src="/assets/images/about-us.webp" alt='about-us'/> */}
            </div>
          </section>
        </section>
      </div>
   </>
  )
}

export default AboutUs