import img1 from "@/public/images/brands/1.png"
import img2 from "@/public/images/brands/2.png"
import img3 from "@/public/images/brands/3.png"
import img4 from "@/public/images/brands/4.png"
import img5 from "@/public/images/brands/5.png"

import Image from "next/image"
import Title from "../../Title/Title"

const Brands = () => {
  return (
    <>
      <div className="pt-5 pb-5 lg:pb-20 lg:pt-10 bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full ">
      <Title text={"برند ها"} size={32} />
        <div className="grid grid-cols-5 max-[768px]:grid-cols-6 gap-6 max-w-[1500px] px-6">
          <Image alt="as" className="object-contain max-[768px]:col-span-2 col-span-1" width={500} height={500} src={img1} />
          <Image alt="asd" className="object-contain max-[768px]:col-span-2 col-span-1" width={500} height={500} src={img2} />
          <Image alt="as" className="object-contain max-[768px]:col-span-2 col-span-1" width={500} height={500} src={img3} />
          <Image alt="as" className="object-contain max-[768px]:col-span-3 col-span-1" width={500} height={500} src={img5} />
          <Image alt="as" className="object-contain max-[768px]:col-span-3 col-span-1" width={500} height={500} src={img4} />
        </div>


      </section>
      </div>

    </>
  )
}

export default Brands