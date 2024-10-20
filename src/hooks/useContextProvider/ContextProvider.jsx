"use client"
import React from 'react'
import { createContext, useContext, useState } from 'react';

import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Main/Footer/Footer";

export const InvoiceContext = createContext(null);
export const searchContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [updateInvoice, setUpdateInvoice] = useState(false);
    const [searchTextContext, setSearchTextContext] = useState("");

    return (
        <>
            <InvoiceContext.Provider value={{ updateInvoice, setUpdateInvoice }}>
                <searchContext.Provider value={{ searchTextContext, setSearchTextContext }}>

                    <Navbar />
                    {children}
                    <Footer />
                </searchContext.Provider>
            </InvoiceContext.Provider>

        </>
    )
}

export default ContextProvider