import Image from 'next/image'
import img1 from '@/public/images/Proforma_Invoice/1.jpg'
const Proforma_Invoice = () => {
    return (
        <>
            <section className="flex justify-center w-full my-20 ">
                <div className=" max-w-[1500px] px-6">
                <Image className='w-full' src={img1} />
                </div>
            </section>
        </>
    )
}

export default Proforma_Invoice