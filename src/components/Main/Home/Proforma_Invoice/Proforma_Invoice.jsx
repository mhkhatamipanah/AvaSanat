import Image from 'next/image'
import img1 from '@/public/images/Proforma_Invoice/2.png'
import Title from '../../Title/Title'
const Proforma_Invoice = () => {
    return (
        <>
            <section className="flex justify-center w-full pt-5 pb-5 md:pb-10 lg:pb-14 md:pt-14 lg:pt-20 bg-gray-100">
                <div className=" max-w-[1500px] px-6">
                    <Title text={"نحوه ثبت سفارش"} size={48} />

                    <Image alt='wds' className='w-full' src={img1} />
                </div>
            </section>
        </>
    )
}

export default Proforma_Invoice