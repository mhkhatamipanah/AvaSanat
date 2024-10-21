"use client"
import { useEffect, useState } from "react";
import Sidebar , {SidebarItem} from "@/src/components/Dashboard/SideBar/Sidebar";
import {  ShoppingBagIcon  ,AppWindow, Scroll, ClipboardList, MailOpen } from "lucide-react";

import { usePathname } from "next/navigation"
import cookieGet from "@/src/utils/Backend/cookieGet";
import { useRouter } from 'next/navigation';




const ProviderSideBar = ({getChildren}) => {
  const [sidebar, setSidebar] = useState(false);

  const pathname = usePathname()
  const router = useRouter();

const getCookie  = async ()=>{
  const cookie = await cookieGet()
  if((!cookie?.name  == "AvaSanatToken")|| !cookie){
    router.push('/login')
  }
}
useEffect(() => {
  getCookie()
}, [])


  return (
    <div className="flex vazirMedium">
    <Sidebar sidebar={sidebar} setSidebar={setSidebar}>
      {/* <SidebarItem
        icon={<Home  />}
        text={"خانه"}
        link={"/dashboard"}
       
        active={pathname === "/dashboard" ? true : false}
      /> */}
       <SidebarItem
        icon={<ClipboardList  />}
        text={"دسته بندی"}
        link={"/dashboard/category"}
        active={pathname.includes("/dashboard/category") }
      />
     
  <SidebarItem
        icon={<ShoppingBagIcon  />}
        text={"محصولات"}
        link={"/dashboard/product"}
        active={ pathname.includes("/dashboard/product")}

      />
  <SidebarItem
        icon={<AppWindow  />}
        text={"مقالات"}
        link={"/dashboard/blogs"}
        active={  pathname.includes("/dashboard/blogs")}

      />
  <SidebarItem
        icon={<Scroll  />}
        text={"پیش فاکتور"}
        link={"/dashboard/invoice"}
        active={ pathname.includes("/dashboard/invoice")}

      />
       <SidebarItem
        icon={<MailOpen  />}
        text={" تماس با ما"}
        link={"/dashboard/contact-us"}
        active={pathname.includes("/dashboard/contact-us")}

      />
  
{/* 
  
      <DropDownSideBar sidebar={sidebar} heightBox={"h-[96px]"} mainIcon={   <UserRound  />} mainText={"سلام"}
      items={[{icon: <Mail/> , text:"سلام"}  , {icon: <Mail/> , text:"خدافظ"} ]}
      />
       <DropDownSideBar sidebar={sidebar} heightBox={'h-[144px]'} mainIcon={   <UserRound />} mainText={"تست"}
      items={[{icon: <Mail/> , text:"سلام"}  , {icon: <Mail/> , text:"خدافظ"} , {icon: <Mail/> , text:"خدافظ"} ]}
      />

        <SidebarItem
          icon={<UserRound />}
          text={" تست  "}
          link={"/test"}
        /> */}
    </Sidebar>
    <div className="w-full overflow-hidden bg-gray-50">
      <div className=" h-[64px] w-full bg-white  border-gray-200 border-b-[2px]"></div>
      <div className="my-5 px-5  overflow-y-hidden">
      {getChildren}
      </div>
    </div>
   

   
  </div>
  )
}

export default ProviderSideBar