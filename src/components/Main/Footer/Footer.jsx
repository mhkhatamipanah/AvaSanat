"use client"
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname()
    
  return (
    <>
    {(pathname !== "/dashboard" && pathname !== "/login") &&
     <footer className='h-[400px] bg-gray-700'>
        <div className='grid grid-cols-6 vazirMedium text-white h-full items-start'>
          <div className='col-span-3 flex flex-col p-5 justify-center gap-4'>
            <h6 className=' vazirBold text-xl'> درباره ما </h6>
            <p className='text-gray-300 '>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus iure atque placeat voluptates eligendi molestias asperiores quo laudantium sed corrupti at optio suscipit unde pariatur aliquid, expedita dolores iusto! Assumenda.
            </p>
            
          </div>
          <div className='flex p-5 flex-col justify-center gap-4'>
            <h6 className=' vazirBold text-xl '>  دسترسی سریع </h6>
            <p>صفحه اصلی</p>
            <p>مقالات</p>
            <p>درباره ما</p>
          </div>
          <div className='flex p-5 flex-col justify-center'>
            <h6 className=' vazirBold text-xl '>لینک ها </h6>
            <p>صفحه اصلی</p>
            <p>مقالات</p>
            <p>درباره ما</p>
          </div>
          <div className='flex p-5 flex-col justify-center'>
            <h6 className=' vazirBold text-xl '>  تماس با ما </h6>
            
          </div>

        </div>
     </footer>
    }
   
    </>
  )
}

export default Footer