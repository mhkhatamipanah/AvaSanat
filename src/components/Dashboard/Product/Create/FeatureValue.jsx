import { Button, Input } from '@nextui-org/react';
import { PlusCircle, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const FeatureValue = ({ inputs, setInputs, data, values }) => {


    const removeElement = (idToRemove) => {
        const updatedInputs = inputs.filter(input => input.id !== idToRemove);
        setInputs(updatedInputs);


    };

    const createValues = () => {
        const newValue = {
            id: `value${Date.now()}`,
            value: "",
        };

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: [...values, newValue] } : input
        ));
    };

    const createProductCode = (id, idMainArray) => {

        const updatedInputs = inputs.map(obj => {
            if (obj.id === idMainArray) {
                return {
                    ...obj,
                    values: obj.values.map(value =>
                        value.id === id
                            ? { ...value, productCode: "" } // به‌روزرسانی مقدار
                            : value
                    )
                };
            }
            return obj;
        });

        setInputs(updatedInputs);

    };

    const removeValues = (id, idMainArray) => {
        const updatedInputs = inputs.map(obj => {
            if (obj.id === idMainArray) {
                return {
                    ...obj,
                    values: obj.values.map(value =>
                        value.id === id
                            ? (() => {
                                const { productCode, ...rest } = value; // حذف productCode
                                return rest;
                            })()
                            : value
                    )
                };
            }
            return obj;
        });

        setInputs(updatedInputs);

    };

    const removeObj = (id, idMainArray) => {
        const updatedInputs = inputs.map(obj => {
            if (obj.id === idMainArray) {
                return {
                    ...obj,
                    values: obj.values.filter(value => value.id !== id) // حذف آبجکت با id مشخص
                };
            }
            return obj;
        });

        // به‌روزرسانی inputs
        setInputs(updatedInputs);

        console.log("Updated inputs after removal:", updatedInputs);
    };


    const handleValueChange = (id, idMainArray, newValue) => {
        const updatedInputs = inputs.map(obj => {
            if (obj.id === idMainArray) {
                return {
                    ...obj,
                    values: obj.values.map(value =>
                        value.id === id
                            ? { ...value, value: newValue } // به‌روزرسانی مقدار productCode
                            : value
                    )
                };
            }
            return obj;
        });

        // به‌روزرسانی inputs
        setInputs(updatedInputs);
    };

    const handleProductCodeChange = (id, idMainArray, newValue) => {
        const updatedInputs = inputs.map(obj => {
            if (obj.id === idMainArray) {
                return {
                    ...obj,
                    values: obj.values.map(value =>
                        value.id === id
                            ? { ...value, productCode: newValue } // به‌روزرسانی مقدار productCode
                            : value
                    )
                };
            }
            return obj;
        });

        // به‌روزرسانی inputs
        setInputs(updatedInputs);
    };


    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  my-6">

                <div className="relative">
                    <Input
                        id={data.id}
                        className="labelRight"
                        label="تیتر ویژگی"
                        placeholder="تیتر ویژگی را وارد کنید"
                        labelPlacement="outside"
                        value={data.title}
                        onChange={(e) => {
                            const updatedInputs = inputs.map(input =>
                                input.id === data.id ? { ...input, title: e.target.value } : input
                            );
                            setInputs(updatedInputs);
                        }}
                    />

                    <div className="flex gap-2 justify-end absolute left-1 -top-3 z-[5]">
                        <Button
                            className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200 cursor-pointer"
                            onClick={() => removeElement(data.id)}
                            color="danger"
                            variant="light"
                        >
                            <Trash className="w-4" size={16} />
                        </Button>

                        <Button
                            className="px-0 min-w-8 h-8 bg-green-50 shadow border border-solid border-green-200 hover:!bg-green-300 cursor-pointer"
                            onClick={createValues}
                            color="success"
                            variant="light"
                        >
                            <PlusCircle className="w-4 text-green-600" size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            {values && values.length !== 0 &&
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  my-6">
                    {values.map((valueData) => (
                        <React.Fragment key={valueData.id} >
                            <div className="relative">
                                <Input
                                    id={valueData.id}
                                    className="labelRight"
                                    label="مقدار ویژگی"
                                    placeholder="مقدار ویژگی را وارد کنید"
                                    labelPlacement="outside"
                                    value={valueData.value}
                                    onChange={(e) => handleValueChange(valueData.id, data.id, e.target.value)}
                                />



                                <div className="flex gap-2 justify-end absolute left-1 -top-3 z-[5]">
                                    <Button
                                        className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200 cursor-pointer"
                                        onClick={() => removeObj(valueData.id, data.id)}
                                        color="danger"
                                        variant="light"
                                    >
                                        <Trash className="w-4" size={16} />
                                    </Button>
                                    {valueData.productCode == undefined && <Button
                                        className="px-0 min-w-8 h-8 bg-blue-100 shadow border border-solid border-blue-200 hover:!bg-blue-300 cursor-pointer"
                                        onClick={() => createProductCode(valueData.id, data.id)}
                                        variant="light"
                                    >
                                        <PlusCircle className="w-4 text-blue-800" size={16} />
                                    </Button>}
                                </div>
                            </div>
                            {valueData.productCode !== undefined && <div className="relative" key={valueData.id}>

                                <Input
                                    id={`${valueData.id}-productCode`}
                                    className="labelRight"
                                    label="کد محصول"
                                    placeholder="کد محصول را وارد کنید"
                                    labelPlacement="outside"
                                    value={valueData.productCode}
                                    onChange={(e) => handleProductCodeChange(valueData.id, data.id, e.target.value)}
                                />
                                <div className="flex gap-2 justify-end absolute left-1 -top-3 z-[5]">
                                    <Button
                                        className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200 cursor-pointer"
                                        onClick={() => removeValues(valueData.id, data.id)}
                                        color="danger"
                                        variant="light"
                                    >
                                        <Trash className="w-4" size={16} />
                                    </Button>

                                </div>
                            </div>}

                        </React.Fragment>


                    ))}
                </div>}
        </>
    );
};

export default FeatureValue;
