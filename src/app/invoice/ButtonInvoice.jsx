import React, { useContext, useEffect, useState } from 'react'
import { removeFromCart } from "@/src/utils/Cookie"
import { InvoiceContext } from "@/src/hooks/useContextProvider/ContextProvider";
import { Button } from '@nextui-org/react';
import { Trash } from 'lucide-react';

const ButtonInvoice = ({ id, invoiceContainer, setSelectedItems, selectedProduct, data, setData }) => {
    const [countInvoice, setCountInvoice] = useState(null)



    const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);


    const rerenderBTN_Invoice = () => {
        setUpdateInvoice(!updateInvoice)
    }
    // تابع حذف
    const removeItemById = (id) => {
        setSelectedItems(() => selectedProduct.filter(item => item.id !== id));
        setData(() => data.filter(item => item.id !== id));
    };
    return (
        <>
            <Button
                onClick={() => {

                    removeFromCart(id)
                    setCountInvoice(countInvoice - 1)
                    rerenderBTN_Invoice()
                    if (document.getElementById(`invoiceContainer-${invoiceContainer}`)) {
                        document.getElementById(`invoiceContainer-${invoiceContainer}`).style.display = "none"
                    }
                    removeItemById(id)

                }}
                className="px-0 min-w-8 h-8 sm:min-w-10 sm:h-10 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                variant="light"
                color="primary"
            >
                <Trash className="sm:w-5 w-4 text-red-600" />
            </Button>
        </>
    )
}

export default ButtonInvoice