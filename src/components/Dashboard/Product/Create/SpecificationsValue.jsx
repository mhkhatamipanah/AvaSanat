import { Button, Input } from '@nextui-org/react';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';

const SpecificationsValue = ({ inputs, setInputs, data }) => {
  
    // تابع برای حذف المان مشخصات
    const removeElement = (idToRemove) => {
        const updatedInputs = inputs.filter(input => input.id !== idToRemove);
        setInputs(updatedInputs);
    };

    // تابع برای تغییر تیتر مشخصات
    const handleTitleChange = (e) => {
        const updatedInputs = inputs.map(input =>
            input.id === data.id ? { ...input, title: e.target.value } : input
        );
        setInputs(updatedInputs);
    };

    // تابع برای تغییر مقدار مشخصات
    const handleValueChange = (e) => {
        const updatedInputs = inputs.map(input =>
            input.id === data.id ? { ...input, value: e.target.value } : input
        );
        setInputs(updatedInputs);
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-6">
            <div className="relative">
                <Input
                    id={data.id}
                    className="labelRight"
                    label="تیتر مشخصات"
                    placeholder="تیتر مشخصات را وارد کنید"
                    labelPlacement="outside"
                    value={data.title}
                    onChange={handleTitleChange} // استفاده از تابع جدید
                />
                <div className="flex gap-2 justify-end absolute left-1 -top-3 z-[5]">
                    <Button
                        className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200 cursor-pointer"
                        onClick={() => removeElement(data.id)} // استفاده از تابع حذف
                        color="danger"
                        variant="light"
                    >
                        <Trash className="w-4" size={16} />
                    </Button>
                </div>
            </div>

            <div className="relative">
                <Input
                    id={data.id}
                    className="labelRight"
                    label="مقدار مشخصات"
                    placeholder="مقدار مشخصات را وارد کنید"
                    labelPlacement="outside"
                    value={data.value || ""} // نمایش اولین مقدار
                    onChange={handleValueChange} // استفاده از تابع جدید
                />
            </div>
        </div>
    );
};
export default SpecificationsValue;