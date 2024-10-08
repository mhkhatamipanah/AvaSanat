"use client"
import React from 'react'
import { createContext, useContext, useState } from 'react';

import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Main/Footer/Footer";

export const InvoiceContext = createContext(null);

const ContextProvider = ({children}) => {
    const [updateInvoice, setUpdateInvoice] = useState(false);

    return (
        <>
            <InvoiceContext.Provider value={{ updateInvoice, setUpdateInvoice }}>

            <Navbar />
            {children}
            <Footer />
            </InvoiceContext.Provider>

        </>
    )
}

export default ContextProvider