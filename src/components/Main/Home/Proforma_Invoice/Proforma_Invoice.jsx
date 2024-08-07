import Image from 'next/image'
import img1 from '@/public/images/Proforma_Invoice/1.jpg'
import Title from '../../Title/Title'
const Proforma_Invoice = () => {
    return (
        <>
            <section className="flex justify-center w-full py-20 bg-gray-100">
                <div className=" max-w-[1500px] px-6">
                    <Title text={"نحوه ثبت سفارش"} size={52} />

                    <Image alt='' className='w-full' src={img1} />
                </div>
            </section>
        </>
    )
}

export default Proforma_Invoice