"use client"
import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react';

import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Main/Footer/Footer";
import { Spinner } from '@nextui-org/react';

export const InvoiceContext = createContext(null);
export const searchContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [updateInvoice, setUpdateInvoice] = useState(false);
    const [searchTextContext, setSearchTextContext] = useState("");
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
    }, [])

    return (
        <>
            <InvoiceContext.Provider value={{ updateInvoice, setUpdateInvoice }}>
                <searchContext.Provider value={{ searchTextContext, setSearchTextContext }}>
                    {load ?
                        <>
                            <Navbar />
                            {children}
                            <Footer />
                        </>
                        :
                        <div className="w-full h-screen flex justify-center items-center">
                       <div class="loader"></div>
                    </div>
                    }
                </searchContext.Provider>
            </InvoiceContext.Provider>


        </>
    )
}

export default ContextProvider