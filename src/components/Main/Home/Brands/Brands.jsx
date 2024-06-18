import img1 from "@/public/images/brands/1.png"
import img2 from "@/public/images/brands/2.png"
import img3 from "@/public/images/brands/3.png"
import img4 from "@/public/images/brands/4.png"
import img5 from "@/public/images/brands/5.png"

import Image from "next/image"

const Brands = () => {
  return (
    <section className="flex justify-center w-full my-20 ">

        
        <div className="grid grid-cols-5 gap-6 max-w-[1500px] px-6">
        <Image className="object-contain" width={500} height={500} src={img1} />
        <Image className="object-contain" width={500} height={500} src={img2} />
        <Image className="object-contain" width={500} height={500} src={img3} />
        <Image className="object-contain" width={500} height={500} src={img4} />
        <Image className="object-contain" width={500} height={500} src={img5} />
        </div>
    </section>
  )
}

export default Brands