"use client"
import React, { useEffect, useState } from 'react'
import { getTotalUniqueItems } from "@/src/utils/Cookie";
import { Badge } from "@nextui-org/react";
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
const InvoiceBTN = ({ updateInvoice, setUpdateInvoice }) => {

    const [rerender, setRerender] = useState(false)
    const [countData, setCountData] = useState(getTotalUniqueItems())
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setRerender(!rerender)
        setCountData(getTotalUniqueItems())
    }, [updateInvoice])

    useEffect(() => {
        if (!load) {
            setLoad(true)
        }
    }, [])

    return (
        <>
            <div className="flex gap-4 items-center">
                {load && countData ?  <Badge style={{ border: "1px solid #fe6d67", backgroundColor: "#ffc5cb", color: "black", paddingTop: "3px" }} content={load ? countData : 0} size="lg" color="warning">
                    <Link href={"/invoice"} className='text-md bg-[var(--color-1)] text-white rounded-md w-[140px] h-[40px] flex items-center justify-center gap-1' variant="shadow">
                        <ShoppingBag size={28} />
                        <p className="text-[14px]">
                            پیش فاکتور
                        </p>
                    </Link>
                </Badge>:   <Link href={"/invoice"} className='text-md bg-[var(--color-1)] text-white rounded-md w-[140px] h-[40px] flex items-center justify-center gap-1' variant="shadow">
                    <ShoppingBag size={28} />
                    <p className="text-[14px]">
                        پیش فاکتور
                    </p>
                </Link> }
              
                {/* {countData ?
                    <Badge style={{ border: "1px solid #fe6d67", backgroundColor: "#ffc5cb", color: "black", paddingTop: "3px" }} content={1} size="lg" color="warning">
                        <Link href={"/invoice"} className='text-md bg-[var(--color-1)] text-white rounded-md w-[140px] h-[40px] flex items-center justify-center gap-1' variant="shadow">
                            <ShoppingBag size={28} />
                            <p className="text-[14px]">
                                پیش فاکتور
                            </p>
                        </Link>
                    </Badge> : <Link href={"/invoice"} className='text-md bg-[var(--color-1)] text-white rounded-md w-[140px] h-[40px] flex items-center justify-center gap-1' variant="shadow">
                        <ShoppingBag size={28} />
                        <p className="text-[14px]">
                            پیش فاکتور
                        </p>
                    </Link>} */}

            </div>
        </>



    )
}

export default InvoiceBTN