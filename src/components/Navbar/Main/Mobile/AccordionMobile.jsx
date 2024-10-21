"use clinet"
import { Accordion, AccordionItem, } from "@nextui-org/react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import React, {  useEffect, useState } from 'react'

import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import Link from "next/link";

export const AccordionList = ({ data, setShowSidebar }) => {


    return (
        <>
            {data && <section className="flex flex-col gap-2">
                <Link href={"/product"} onClick={()=>{setShowSidebar(false)}} className="w-full flex justify-between gap-2 py-[2px]">
                    <p className="text-gray-600 text-[13px]">همه دسته بندی ها</p>
                </Link>
                {data.map((checkbox, i) => (
                    <Link key={`mobilecategory-${i}`} onClick={()=>{setShowSidebar(false)}} href={`/product/${checkbox.route}`} className="w-full flex justify-between gap-2 py-[2px]">
                        <p className="text-[12px]">{checkbox.title}</p>
                    </Link>
                ))}
            </section>}

        </>
    )

}


const AccordionMobile = ({ setShowSidebar }) => {
    const [Category, setCategory] = useState(null)

    const { fetchCategory } = ApiActions()

    const fetchCategoryApi = async () => {
        const data = await fetchCategory()
        setCategory(data)
    }

    useEffect(() => {
        fetchCategoryApi()
    }, [])



    return (
            <div className="flex flex-col gap-2 rounded-md vazirMedium">

                <Accordion className="!shadow-none text-sm accordionMobile pl-2 pr-3" variant="bordered ">
                    <AccordionItem indicator={<ChevronDown size={18} className="ml-1" />} key="2" aria-label="Accordion 2" title={
                        <div className="flex items-center ">
                            <ShoppingCart />
                            <span className=" w-full text-sm p-3 pr-2 " >   محصولات </span>
                        </div>
                    }>
                        {Category ?
                            <AccordionList
                                data={Category.data}
                                setShowSidebar={setShowSidebar}
                            />
                            : "در حال دریافت اطلاعات"
                        }
                    </AccordionItem>
                </Accordion>
            </div>

    )
}

export default AccordionMobile




