"use client"
import { Youtube } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname()
    
  return (
    <>
    {(pathname !== "/dashboard" && pathname !== "/login") &&
    <>
    <hr />
     <footer className='h-[400px] flex justify-center items-center '>
        <div className='grid grid-cols-6 vazirMedium h-full items-start p-5'>
          <div className='col-span-3 flex flex-col p-5 justify-center gap-4'>
            <h6 className=' vazirBold text-xl'> لوگو </h6>
            <p className=' '>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus iure atque placeat voluptates eligendi molestias asperiores quo laudantium sed corrupti at optio suscipit unde pariatur aliquid, expedita dolores iusto! Assumenda.
            </p>
            
          </div>
          <div className='flex p-5 flex-col justify-center gap-4'>
            <h6 className=' vazirBold text-xl '>   سریع </h6>
            <p>صفحه اصلی</p>
            <p>مقالات</p>
            <p>درباره ما</p>
          </div>
          <div className='flex p-5 flex-col justify-center  gap-4'>
            <h6 className=' vazirBold text-xl '> اطلاعات تماس </h6>
            <p>صفحه اصلی</p>
            <p>مقالات</p>
            <p>درباره ما</p>
          </div>
          <div className='flex p-5 flex-col justify-center  gap-4'>
            <h6 className=' vazirBold text-xl '>  تماس با ما </h6>
            <ul className='flex items-center gap-3'>
              <li>
                <Youtube/>
              </li>
              <li>
                <Youtube/>
              </li>
              <li>
                <Youtube/>
              </li>
              <li>
                <Youtube/>
              </li>
            </ul>
          </div>

        </div>
     </footer>
    </>

    }
   
    </>
  )
}

export default Footer