import { useState } from "react";

const DropDownSideBar = ({ sidebar, heightBox, mainIcon, mainText, items }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  return (
    <section className="relative">
      <div
        onClick={() => {
          setIsOpenDropDown(!isOpenDropDown);
        }}
        className={`
relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-300 group hover:bg-indigo-50 text-gray-600
`}
      >
        {/* Menu Closed */}
        <div
          className={`hidden absolute top-0 right-[32px] z-60  ${
            sidebar ? " group-hover:block !min-w-40 h-10  " : "w-0 h-0"
          }`}
        ></div>
        <div
          className={`h-0 w-0 absolute top-0 right-[62px] overflow-hidden  ${
            sidebar ? " group-hover:w-40 group-hover:!h-auto " : "w-0 h-0"
          }  bg-white rounded-md z-50 transition-width duration-500 shadow-lg`}
        >
          <ul
            className={`${
              sidebar ? " group-hover:block !min-w-40  " : "w-0 h-0"
            }`}
          >
            {items &&
              items.map((e, i) => {
                return (
                  <li
                    key={i}
                    className={`
        relative flex items-center py-2 px-3 pr-6 my-1 font-medium rounded-md cursor-pointer duration-500 hover:bg-indigo-50 text-gray-600
        `}
                  >
                    <span
                      className={`overflow-hidden transition-all font-iranSans_3 text-sm flex justify-between items-center  `}
                    >
                      {e.text}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Title And Icon */}
        {mainIcon}
        <span
          className={`overflow-hidden transition-all font-iranSans_3 text-sm flex justify-between items-center  ${
            !sidebar ? "w-52 mr-3" : "w-0"
          }`}
        >
          {mainText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className={`w-3 h-3 transition-all ${
              isOpenDropDown ? "rotate-0" : "rotate-180"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {/* Menu DropDown */}
      <ul
        className={` transition-height duration-500 ease-in-out w-full rounded-md ${
          isOpenDropDown && !sidebar ? heightBox : " h-0 "
        } bg-gray-50 overflow-hidden`}
      >
        {items &&
          items.map((e, i) => {
            return (
              <li
                key={i}
                className={`
        relative flex items-center py-2 px-3 pr-6 my-1 font-medium rounded-md cursor-pointer duration-500  ${
          isOpenDropDown && !sidebar ? "opacity-100 " : "opacity-0 "
        }  hover:bg-indigo-50 text-gray-600
        DropDownList
        `}
              >
                {e.icon}
                <span
                  className={`overflow-hidden transition-all font-iranSans_3 text-sm flex justify-between items-center  ${
                    !sidebar ? "w-52 mr-3" : "w-0"
                  }`}
                >
                  {e.text}
                </span>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default DropDownSideBar;
