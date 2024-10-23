"use client"
import Image from 'next/image'
import img2 from '@/public/images/Proforma_Invoice/2.png'
import img1 from '@/public/images/Proforma_Invoice/1.png'
import Title from '../../Title/Title'
import UseWindowSize from '@/src/hooks/UseWindowSize/UseWindowSize'
const Proforma_Invoice = () => {
    const { width } = UseWindowSize()

    return (
        <>
            <section className="flex justify-center w-full pt-5 pb-5 md:pb-10 lg:pb-14 md:pt-14 lg:pt-20 bg-gray-100">
                <div className=" max-w-[1500px] px-6">
                    <Title text={"نحوه ثبت سفارش"} size={48} />
                    
                    <Image alt='wds' className='w-full max-[768px]:hidden block' src={img2} />
                    <Image alt='wds' className='w-full max-[768px]:block hidden' src={img1} />
                </div>
            </section>
        </>
    )
}

export default Proforma_Invoice