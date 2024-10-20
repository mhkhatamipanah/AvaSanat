import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import Image from "next/image";
import { Home, Images, InfoIcon } from "lucide-react";

export default function MobileNav({ showSideBar, setShowSidebar }) {
    // Modal
    const [isOpen, setIsOpen] = useState(false)


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <div className="w-[180px] h-full bg-[#f2f2f2] vazirMedium"

            role="presentation"
            // onClick={()=>{toggleDrawer("right", false); setShowSidebar(false)}}
            onKeyDown={() => {
                toggleDrawer("right", false); setShowSidebar(false);;

            }}
        >
            <div className="h-[50px]">

                <Link className="flex justify-center mt-4 mb-3" href='/'>
                    <Image width={1000} height={1000} className="w-24 sm:w-28" src="/images/png persian.png" alt='logo' />
                </Link>
            </div>
            <hr />
            <div className="flex flex-col  ">
                <div className="flex items-center mr-3">
                    <Home />
                    <Link onClick={() => { setShowSidebar(false) }} className=" w-full text-sm   p-3 pr-2 " href='/'>صفحه اصلی</Link>
                </div>
                <div className="flex items-center mr-3">
                    <Images />
                    <Link onClick={() => { setShowSidebar(false) }} className=" w-full text-sm   p-3 pr-2 " href='/gallery'>  گالری تصاویر </Link>
                </div>
                <div className="flex items-center mr-3">
                    <InfoIcon />
                    <Link onClick={() => { setShowSidebar(false) }} className=" w-full text-sm   p-3 pr-2 " href='/about-us'>  درباره ما </Link>
                </div>


            </div>
        </div>
    );

    return (
        <div>
                <SwipeableDrawer
                    anchor={"right"}
                    open={showSideBar}
                    onClose={() => {
                        toggleDrawer("right", false); setShowSidebar(false);
                    }}
                    onOpen={() => {
                        toggleDrawer("right", true); setShowSidebar(true); localStorageMui();
                    }}
                >
                    {list("right")}
                </SwipeableDrawer>
        </div>
    );
}
