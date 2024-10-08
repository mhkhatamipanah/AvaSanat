import React, { useContext, useEffect, useState } from 'react'
import { addToCart, decreaseItemCount, removeFromCart, getItemCount } from "@/src/utils/Cookie"
import { InvoiceContext } from "@/src/components/useContextProvider/ContextProvider";
import { Button } from '@nextui-org/react';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';

const ButtonInvoice = ({ id, invoiceContainer }) => {
    const [countInvoice, setCountInvoice] = useState(null)


    const getCookieCount = (id) => {
        return getItemCount(id)
    }
    const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);

    useEffect(() => {
        setCountInvoice(getCookieCount(id))
    }, [])


    const rerenderBTN_Invoice = () => {
        setUpdateInvoice(!updateInvoice)
    }
    return (
        <>
            {countInvoice &&
                <div className="flex flex-col-reverse items-center justify-center ml-2">
                    {countInvoice == 1 ?
                        <Button
                            onClick={() => {
                                removeFromCart(id)
                                setCountInvoice(countInvoice - 1)
                                rerenderBTN_Invoice()
                                if (document.getElementById(`invoiceContainer-${invoiceContainer}` )) {
                                    document.getElementById(`invoiceContainer-${invoiceContainer}`).style.display = "none"
                                }
                            }}
                            className="px-0 min-w-10 h-10 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                            variant="light"
                            color="primary"
                        >
                            <Trash className="w-5 text-red-600" size={24} />
                        </Button>
                        :
                        <Button
                            onClick={() => {
                                decreaseItemCount(id)
                                setCountInvoice(countInvoice - 1)
                                rerenderBTN_Invoice()
                            }}
                            className="px-0 min-w-10 h-10 bg-gray-100 shadow border border-solid border-gray-200 hover:!bg-gray-300"
                            variant="light"
                            color="primary"
                        >
                            <MinusCircle className="w-5 text-gray-600" size={24} />
                        </Button>
                    }
                    <div className="w-10 h-10 flex justify-center items-center">
                        <p className="vazirMedium">
                            {countInvoice}
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            addToCart(id, JSON.stringify({ id: id }))
                            setCountInvoice(countInvoice + 1)
                            rerenderBTN_Invoice()
                        }}
                        className="px-0 min-w-10 h-10 bg-green-100 shadow border border-solid border-green-200 hover:!bg-green-300"
                        variant="light"
                        color="primary"
                    >
                        <PlusCircle className="w-5 text-green-600" size={24} />
                    </Button>
                </div>

            }
        </>
    )
}

export default ButtonInvoice