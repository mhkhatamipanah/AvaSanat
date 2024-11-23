import React, { useEffect, useState } from "react";

const RadioBTN = ({ title, data, onChange, reset }) => {
  const [radioValue, setRadioValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setRadioValue(value);
    onChange(value); // ارسال مقدار انتخاب شده به والد
  };

  // بازنشانی وضعیت رادیوها زمانی که reset تغییر کند
  useEffect(() => {
    if (reset) {
      setRadioValue(""); // پاک کردن مقدار انتخاب‌شده
    }
  }, [reset]);

  return (
    <>
      <p>انتخاب {title} : </p>
      <div className="flex gap-2 items-center my-3">
        {data.map((e, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                name={`radioGroup-${title}`} // اضافه کردن عنوان برای جلوگیری از تداخل گروه‌ها
                id={`${e.value}${i}`}
                value={e.value}
                onChange={handleChange}
                checked={radioValue === e.value}
              />
              <label
                className={`px-2 py-1 bg-gray-200 text-sm sm:text-md rounded-lg cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-150 ${
                  radioValue === e.value ? "text-white bg-green-600 !border-none" : ""
                }`}
                htmlFor={`${e.value}${i}`}
              >
                {e.value}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioBTN;
