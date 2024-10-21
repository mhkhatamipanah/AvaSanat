import React, { useContext, useEffect, useState } from 'react'
import { addToCart, decreaseItemCount, removeFromCart, getItemCount } from "@/src/utils/Cookie"
import { InvoiceContext } from "@/src/hooks/useContextProvider/ContextProvider";
import { Button } from '@nextui-org/react';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';

const ButtonInvoice = ({ id, invoiceContainer ,  selectedProduct , setSelectedItems , data , setData}) => {
    const [countInvoice, setCountInvoice] = useState(null)


    const getCookieCount = (id) => {
        return getItemCount(id)
    }
    const { updateInvoice, setUpdateInvoice } = useContext(InvoiceContext);
    const setCountInvoiceHandler = ()=>{
        setCountInvoice(getCookieCount(id))
    }
    useEffect(() => {
        setCountInvoiceHandler()
    }, [])


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
            {countInvoice &&
                <div className="flex flex-col-reverse items-center justify-center sm:ml-2">
                    {countInvoice == 1 ?
                        <Button
                            onClick={() => {
                                removeFromCart(id)
                                setCountInvoice(countInvoice - 1)
                                rerenderBTN_Invoice()
                                if (document.getElementById(`invoiceContainer-${invoiceContainer}` )) {
                                    document.getElementById(`invoiceContainer-${invoiceContainer}`).style.display = "none"
                                }
                                removeItemById(id)

                            }}
                            className="px-0 min-w-7 h-7 sm:min-w-10 sm:h-10 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                            variant="light"
                            color="primary"
                        >
                            <Trash className="sm:w-5 w-4 text-red-600" />
                        </Button>
                        :
                        <Button
                            onClick={() => {
                                decreaseItemCount(id)
                                setCountInvoice(countInvoice - 1)
                                rerenderBTN_Invoice()
                            }}
                            className="px-0 min-w-7 h-7 sm:min-w-10 sm:h-10 bg-gray-100 shadow border border-solid border-gray-200 hover:!bg-gray-300"
                            variant="light"
                            color="primary"
                        >
                            <MinusCircle className="sm:w-5 w-4 text-gray-600" />
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
                        className="px-0 min-w-7 h-7 sm:min-w-10 sm:h-10 bg-green-100 shadow border border-solid border-green-200 hover:!bg-green-300"
                        variant="light"
                        color="primary"
                    >
                        <PlusCircle className="sm:w-5 w-4 text-green-600" />
                    </Button>
                </div>

            }
        </>
    )
}

export default ButtonInvoice