"use client"
import MobileNav from "./MobileNav";
import { useContext, useState } from "react";
import { Menu } from 'lucide-react';
import SearchComponent from "@/src/components/Main/SeachComponent/SearchComponent";

import { InvoiceContext } from "@/src/hooks/useContextProvider/ContextProvider";
import InvoiceBTN from "@/src/components/Navbar/Main/Desktop/InvoiceBTN";

const SideBarMobile = () => {
    const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);

    const [openSidebarMui, setOpenSidebarMui] = useState(false)
    function toggleSideBar() {
        setOpenSidebarMui(true)
    }
    return (
        <>
            <MobileNav
                showSideBar={openSidebarMui} setShowSidebar={setOpenSidebarMui}
            />
            <div className=" sticky sm:block max-sm:top-0 z-[999] vazirLight xl:px-0 md:px-10">
                <nav className="h-[65px] 
                max-md:shadow-sm flex max-w-screen-xl items-center bg-white justify-between gap-x-4 mx-auto  px-3">
                    <div className="flex gap-2 items-center">
                        <Menu onClick={toggleSideBar} className="!text-3xl block cursor-pointer" />
                        <SearchComponent />
                    </div>

                    <InvoiceBTN updateInvoice={updateInvoice} setUpdateInvoice={setUpdateInvoice} />
                </nav>
            </div>
        </>
    )
}

export default SideBarMobile