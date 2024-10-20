"use client"
import Image from "next/image"
import curve from "@/public/images/title.png"
import UseWindowSize from "@/src/hooks/UseWindowSize/UseWindowSize"
const Title = ({ text, size }) => {
  const { width } = UseWindowSize()

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="flex flex-col justify-center items-center w-min">
        <p className="text-lg sm:text-xl xl:text-3xl 2xl:text-4xl vazirBold z-30 whitespace-nowrap px-4">{text}</p>
        <Image className={` object-contain z-10`} src={curve} alt="curve title" />
      </div>

    </div>
  )
}

export default Title