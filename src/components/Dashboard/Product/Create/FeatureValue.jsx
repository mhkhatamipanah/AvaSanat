import { Button, Input } from '@nextui-org/react';
import { PlusCircle, Trash } from 'lucide-react';
import React, { useState } from 'react';

const FeatureValue = ({ inputs, setInputs, data }) => {
    const [values, setValues] = useState(data.values || []);

    const removeElement = (idToRemove) => {
        const updatedInputs = inputs.filter(input => input.id !== idToRemove);
        setInputs(updatedInputs);
    };

    const createValues = () => {
        const newValue = {
            id: `value${Date.now()}`,
            value: "",
        };
        setValues([...values, newValue]);

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: [...values, newValue] } : input
        ));
    };

    const createProductCode = (id) => {
        const updatedValues = values.map(value =>
            value.id === id ? { ...value, productCode: "" } : value
        );
        setValues(updatedValues);

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: updatedValues } : input
        ));
    };

    const removeValues = (idToRemove) => {
        const updatedValues = values.filter(value => value.id !== idToRemove);
        setValues(updatedValues);

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: updatedValues } : input
        ));
    };

    const handleValueChange = (id, newValue) => {
        const updatedValues = values.map(value =>
            value.id === id ? { ...value, value: newValue } : value
        );
        setValues(updatedValues);

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: updatedValues } : input
        ));
    };

    const handleProductCodeChange = (id, newProductCode) => {
        const updatedValues = values.map(value =>
            value.id === id ? { ...value, productCode: newProductCode } : value
        );
        setValues(updatedValues);

        // به‌روزرسانی آرایه‌ی مقادیر در ورودی‌های اصلی
        setInputs(inputs.map(input =>
            input.id === data.id ? { ...input, values: updatedValues } : input
        ));
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

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  my-6">

                {values.map((valueData) => (
                    <React.Fragment  key={valueData.id} >
                        <div className="relative">
                            <Input
                                id={valueData.id}
                                className="labelRight"
                                label="مقدار ویژگی"
                                placeholder="مقدار ویژگی را وارد کنید"
                                labelPlacement="outside"
                                value={valueData.value}
                                onChange={(e) => handleValueChange(valueData.id, e.target.value)}
                            />



                            <div className="flex gap-2 justify-end absolute left-1 -top-3 z-[5]">
                                <Button
                                    className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200 cursor-pointer"
                                    onClick={() => removeValues(valueData.id)}
                                    color="danger"
                                    variant="light"
                                >
                                    <Trash className="w-4" size={16} />
                                </Button>
                                {valueData.productCode == undefined && <Button
                                    className="px-0 min-w-8 h-8 bg-blue-100 shadow border border-solid border-blue-200 hover:!bg-blue-300 cursor-pointer"
                                    onClick={() => createProductCode(valueData.id)}
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
                                onChange={(e) => handleProductCodeChange(valueData.id, e.target.value)}
                            />

                        </div>}

                    </React.Fragment>


                ))}
            </div>
        </>
    );
};

export default FeatureValue;
