"use clinet"
import { Accordion, AccordionItem, Checkbox, cn } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export const AccordionList = ({ router }) => {
    // state واحد برای نگه‌داشتن چک‌باکس انتخاب‌شده
    const [selectedIndex, setSelectedIndex] = useState(null);

    // داده‌های چک‌باکس‌ها (می‌توانید نام یا هر چیز دیگری برای هر چک‌باکس تعریف کنید)
    const checkboxes = [
        { id: 1, label: "Enda" },
        { id: 2, label: "Siemens" },
        { id: 3, label: "Eaton" },
        { id: 4, label: "Schrack" },
        { id: 5, label: "GMT CNT" }
    ];
    // تابع برای تغییر URL با توجه به مقدار انتخاب شده
    const updateURL = (label) => {
        // ایجاد کوئری پارامتر جدید
        const query = new URLSearchParams(window.location.search);
        query.set('brand', label);
        router.push(`?${query.toString()}`, undefined, { shallow: true }); // shallow برای جلوگیری از reload کل صفحه
    };

    // وقتی چک‌باکس انتخاب می‌شود، هم ایندکس را تغییر می‌دهیم هم URL
    const handleCheckboxChange = (id, label) => {
        setSelectedIndex(id);
        updateURL(label);
    };

    return (
        <>
            <section className="flex flex-col gap-2">
                {checkboxes.map((checkbox) => (
                    <Checkbox
                        key={checkbox.id}
                        classNames={{
                            base: cn(
                                "inline-flex w-full max-w-md bg-content1",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer rounded-lg gap-2 p-4 m-0 border-2 border-transparent",
                                "data-[selected=true]:border-gray-300",
                                "data-[selected=true]:bg-gray-200",
                                "bg-gray-100"
                            ),
                            label: "w-full",
                        }}
                        // بررسی می‌کنیم که آیا این چک‌باکس انتخاب شده است یا خیر
                        isSelected={selectedIndex === checkbox.id}
                        // وقتی انتخاب شد، مقدار ایندکس چک‌باکس و label را در state و URL ذخیره می‌کنیم
                        onValueChange={() => handleCheckboxChange(checkbox.id, checkbox.label)}
                    >
                        <div className="w-full flex justify-between gap-2">
                            <p>{checkbox.label}</p>
                        </div>
                    </Checkbox>
                ))}
            </section>
        </>
    )

}


const AccordionComponent = () => {
    const router = useRouter(); // برای تغییر URL

    return (
        <div className="flex flex-col gap-2 bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2 vazirMedium">
            <div className="flex justify-between p-2 pb-0">
                <p className="vazirDemibold text-lg text-indigo-500">فیلتر ها </p>
                <button onClick={()=>{}} className="vazirDemibold text-sm text-red-400"> حذف فیلتر ها </button>

            </div>
        <Accordion className="!shadow-none" variant="bordered ">
            <AccordionItem indicator={<ChevronDown />} key="1" aria-label="Accordion 1" title="برند">
                <AccordionList router={router} />
            </AccordionItem>
            <AccordionItem indicator={<ChevronDown />} key="2" aria-label="Accordion 2" title="دسته بندی">
                <AccordionList router={router} />
            </AccordionItem>
        </Accordion>
        </div>
    )
}

export default AccordionComponent




