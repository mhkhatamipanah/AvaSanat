"use clinet"
import { Accordion, AccordionItem, Checkbox, cn } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

import { ApiActions } from "@/src/utils/Frontend/ApiActions";

export const AccordionList = ({ searchParams, router, data, selectedIndex, setSelectedIndex, searchOn, setOpen }) => {
    // state واحد برای نگه‌داشتن چک‌باکس انتخاب‌شده

    // داده‌های چک‌باکس‌ها (می‌توانید نام یا هر چیز دیگری برای هر چک‌باکس تعریف کنید)

    const updateURL = (label) => {
        const query = new URLSearchParams(searchParams.toString());
        query.set(searchOn, label);
        router.push(`?${query.toString()}`, undefined, { shallow: true });
    };

    // تابع برای حذف پارامتر از URL
    const removeFromURL = () => {
        const query = new URLSearchParams(searchParams.toString());
        query.delete(searchOn);
        router.push(`?${query.toString()}`, undefined, { shallow: true });
    };

    // وقتی چک‌باکس انتخاب یا لغو انتخاب می‌شود
    const handleCheckboxChange = (id, label) => {
        if (selectedIndex === id) {
            // اگر چک‌باکس قبلاً انتخاب شده باشد، انتخاب آن را برداریم و پارامتر مربوطه را از URL حذف کنیم
            setSelectedIndex(null);
            removeFromURL();
        } else {
            // اگر چک‌باکس انتخاب نشده باشد، آن را انتخاب کنیم و پارامتر مربوطه را به URL اضافه کنیم
            setSelectedIndex(id);
            updateURL(label);
        }
        if (setOpen) {
            setOpen(false)
        }
    };
    return (
        <>
            <section className="flex flex-col gap-2">
                {data.map((checkbox, i) => (
                    <Checkbox
                        key={checkbox._id}
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
                        isSelected={selectedIndex === checkbox._id} // اصلاح این قسمت
                        // وقتی انتخاب شد، مقدار ایندکس چک‌باکس و label را در state و URL ذخیره می‌کنیم
                        onValueChange={() => {
                            if (searchOn === "brand") {
                                handleCheckboxChange(checkbox._id, checkbox.title)
                            } else {
                                handleCheckboxChange(checkbox._id, checkbox.route)

                            }
                        }
                        } // اصلاح این قسمت
                    >
                        <div className="w-full flex justify-between gap-2">
                            <p>{checkbox.title}</p>
                        </div>
                    </Checkbox>
                ))}
            </section>
        </>
    )

}


const AccordionComponent = ({ setOpen }) => {


    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedIndex2, setSelectedIndex2] = useState(null);

    const [Category, setCategory] = useState(null)

    const { fetchCategory } = ApiActions()

    const fetchCategoryApi = async () => {
        const data = await fetchCategory()
        setCategory(data)
    }

    useEffect(() => {
        fetchCategoryApi()
    }, [])

    const router = useRouter();
    const searchParams = useSearchParams();


    const data = [
        { _id: 1, title: "Enda" },
        { _id: 2, title: "Siemens" },
        { _id: 3, title: "Eaton" },
        { _id: 4, title: "Schrack" },
        { _id: 5, title: "GMT CNT" },
        { _id: 6, title: "Chint" }
    ];

    const deleteFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        // فقط پارامتر 'q' را نگه می‌داریم
        const qValue = params.get('q');

        // پاک کردن همه پارامترها به جز 'q'
        params.forEach((_, key) => {
            if (key !== 'q') {
                params.delete(key);
            }
        });

        // ایجاد یک URL جدید با پارامترهای فیلتر شده
        const newQuery = qValue ? `?q=${qValue}` : '';

        // استفاده از replace به جای push
        router.replace(`${window.location.pathname}${newQuery}`, { shallow: true });
        setSelectedIndex(null)
        setSelectedIndex2(null)
        if (setOpen) {

            setOpen(false)
        }

    }
    return (
        <Suspense>
            <div className="flex flex-col gap-2 bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2 vazirMedium">
                <div className="flex justify-between p-2 pb-0">
                    <p className="vazirDemibold text-lg text-indigo-500">فیلتر ها </p>
                    <button onClick={deleteFilter} className="vazirDemibold text-sm text-red-400" > حذف فیلتر ها </button>

                </div>
                <Accordion className="!shadow-none" variant="bordered ">
                    <AccordionItem indicator={<ChevronDown />} key="1" aria-label="Accordion 1" title="برند">
                        <AccordionList
                            searchParams={searchParams}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            data={data}
                            router={router}
                            searchOn={"brand"}
                            setOpen={setOpen} />
                    </AccordionItem>
                    <AccordionItem indicator={<ChevronDown />} key="2" aria-label="Accordion 2" title="دسته بندی">
                        {Category ?
                            <AccordionList
                                searchParams={searchParams}
                                selectedIndex={selectedIndex2}
                                setSelectedIndex={setSelectedIndex2}
                                data={Category.data}
                                router={router}
                                searchOn={"Category"}
                                setOpen={setOpen}
                            />
                            : "در حال دریافت اطلاعات"
                        }
                    </AccordionItem>
                </Accordion>
            </div>
        </Suspense>

    )
}

export default AccordionComponent




