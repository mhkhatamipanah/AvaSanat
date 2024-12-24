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
      <div className="flex gap-2 gap-y-4 items-center my-3 flex-wrap">
        {data.map((e, i) => {
          return (
            <div className="flex items-center" key={i}>
              <input
                type="radio"
                name={`radioGroup-${title}`} // اضافه کردن عنوان برای جلوگیری از تداخل گروه‌ها
                id={`${e.value}${i}`}
                value={e.value}
                onChange={handleChange}
                checked={radioValue === e.value}
              />

              <label
                className={`flex items-center p-1 bg-[#0d948928] border-gray-200 rounded-xl border-2`}
                htmlFor={`${e.value}${i}`}
              >
                {e?.productCode && <span className="px-1 rounded-lg "> {`${e.productCode} :`} </span>}

                <span className={`px-1.5 py-1.5 bg-gray-50 text-sm sm:text-md rounded-lg cursor-pointer hover:bg-green-600 hover:text-white  transition-all duration-150 ${radioValue === e.value ? "text-white bg-green-700 !border-none" : ""}`}>
                  {e.value}
                </span>

              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioBTN;
