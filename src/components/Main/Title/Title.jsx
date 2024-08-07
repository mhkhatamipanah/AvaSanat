import Image from "next/image"
import curve from "@/public/images/title.png"
const Title = ({text , size}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
        <p className="text-3xl vazirBold z-30">{text}</p>
        <Image className={`w-${size} object-contain  z-10`} src={curve} alt="curve title"/>
    </div>
  )
}

export default Title