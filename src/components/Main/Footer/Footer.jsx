"use client"
import { Facebook, Instagram, MapPinIcon, Phone, Youtube } from 'lucide-react';
import { usePathname } from 'next/navigation';
import logo from "@/public/images/png persian.png"
import Image from 'next/image';
import Link from 'next/link';
import Wave from './Wave';


const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      {(!pathname.includes("/dashboard") && pathname !== "/login") &&
        <>
          <hr />
          <footer className='relative min-h-[350px] flex flex-col items-center justify-center w-full mt-4'>
            <Wave />
            <div className=' grid grid-cols-6 vazirMedium h-full items-start p-5 gap-6 max-w-[1500px] px-6 z-50'>

              <div className='col-span-6 min-[1200px]:col-span-3 flex flex-col p-5 justify-center max-[600px]:items-center gap-4'>

                <Image className="object-contain h-10 w-min ml-3 " src={logo} alt="logo" />

                <p className='text-gray-700 '>
                  آواصنعت برترین واردکننده و عرضه کننده قطعات اتوماسیون صنعتی و ابزار دقیق از برترین برندهای جهانی می باشد که بدون واسطه محصولات را در لاله زار به فروش می رساند، این شرکت تنها عرضه کننده این قطعات نیست و از مراحل پیش از خرید ، مشاوره، نصب و راه اندازی تا خدمات پس از فروش همراه شما خواهد بود.
                </p>

              </div>
              <div className='col-span-6 min-[600px]:col-span-2 min-[1200px]:col-span-1 flex p-5 flex-col justify-center max-[600px]:items-center gap-4'>
                <h6 className=' vazirBold text-xl '>   دسترسی سریع </h6>
                <Link className='text-gray-700' href={'/'}>صفحه اصلی</Link>
                <Link className='text-gray-700' href={'/product'}>محصولات </Link>
                <Link className='text-gray-700' href={'/blogs'}>مقالات </Link>
                <Link className='text-gray-700' href={'/about-us'}>درباره ما </Link>
              </div>
              <div className='col-span-6 min-[600px]:col-span-2 min-[1200px]:col-span-1 flex p-1 pt-5 flex-col justify-center max-[600px]:items-center  gap-4'>
                <h6 className=' vazirBold text-xl '> اطلاعات تماس </h6>
                <div className='flex justify-start gap-2'>
                  <MapPinIcon size={26}/>
                  <p className='leading-7 text-gray-700'>
                    لاله زار، کوچه ملانوروزی، پلاک 7
                  </p>
                </div>
                <div className='flex justify-start items-center gap-2'>
                  <Phone />
                  <p className='ltr text-gray-700'>0902 366 53 06 </p>
                </div>
              </div>
              <div className='col-span-6 min-[600px]:col-span-2 min-[1200px]:col-span-1 flex p-5 flex-col justify-center max-[600px]:items-center  gap-4'>
                <h6 className=' vazirBold text-xl '>  تماس با ما </h6>
                <ul className='flex items-center gap-3'>
                  <li className='text-gray-700'>
                    <Youtube />
                  </li>
                  <li className='text-gray-700'>
                    <Facebook />
                  </li>
                  <li className='text-gray-700'>
                    <Instagram />
                  </li>
                 
                </ul>
              </div>

            </div>
            <span className="block text-sm text-gray-600 sm:text-center my-5 vazirMedium z-30">
              تمامی حقوق این سایت برای مجموعه آوا صنعت محفوظ است © 2024  .
            </span>
          </footer>
        </>

      }

    </>
  )
}

export default Footer