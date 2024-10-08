import { Button } from '@nextui-org/react';
import { Ban } from 'lucide-react';
import React, { useState } from 'react';

const RadioBTN = ({ title, data, onChange }) => {
    const [radioValue, setRadioValue] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setRadioValue(value);
        onChange(value);  // ارسال مقدار انتخاب شده به والد
    };

    return (
        <>
            <p>انتخاب {title} : </p>
            <div className='flex gap-2 items-center my-2'>
                {data.map((e, i) => {
                    return (
                        <div key={i}>
                            <input
                                type="radio"
                                name="radioGroup"
                                id={`${e.value}${i}`}
                                value={e.value}
                                onChange={handleChange}
                                checked={radioValue === e.value}
                            />
                            <label
                                className={`px-2 py-1 rounded-lg cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-150 ${radioValue === e.value ? "text-white bg-green-600" : ""}`}
                                htmlFor={`${e.value}${i}`}
                            >
                                {e.value}
                            </label>
                        </div>
                    );
                })}
                <Button
                    onClick={() => { setRadioValue(""); onChange(""); }}
                    className="px-0 min-w-8 h-8 bg-red-100 shadow border border-solid border-red-200 hover:!bg-red-300"
                    variant="light"
                    color="primary"
                >
                    <Ban className="w-4 text-red-600" size={16} />
                </Button>
            </div>
        </>

    );
};

export default RadioBTN;
