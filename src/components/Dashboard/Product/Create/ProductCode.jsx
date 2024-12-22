import { Button, Input } from '@nextui-org/react';
import {  Trash } from 'lucide-react';
import React, { useState } from 'react';

const ProductCode = ({ inputs, setInputs, data }) => {
    const [values, setValues] = useState(data.values || []);

    const removeElement = (idToRemove) => {
        const updatedInputs = inputs.filter(input => input.id !== idToRemove);
        setInputs(updatedInputs);
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

    return (
        <>
                <div className="relative">
                    <Input
                        id={data.id}
                        className="labelRight"
                        label="کد محصول"
                        placeholder="کد محصول را وارد کنید"
                        labelPlacement="outside"
                        value={data.code}
                        onChange={(e) => {
                            const updatedInputs = inputs.map(input =>
                                input.id === data.id ? { ...input, code: e.target.value } : input
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
                       
                    </div>
                </div>
        </>
    );
};

export default ProductCode;
