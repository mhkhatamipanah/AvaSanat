import React, { useEffect, useState } from "react";
import { Spinner, Input, Button } from "@nextui-org/react";
import {
  CircleFadingPlus,
  Maximize,
  Minimize,
  MoveUp,
  Search,
  UploadCloudIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import img1 from "@/public/images/no-resualt.png";
import PaginationComponent from "../Pagination/PaginationComponents";

const TableComponents = ({
  fetchData,
  tableHead,
  tableBody,
  title,
  isAddIcon,
  urlAddIcon,
  isHead = true,
  rerender,
  openFunc = false,
  idGroup,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [countData, setCountData] = useState(null);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(6);

  const [textSearch, setTextSearch] = useState("");

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cleanup function to clear the timeout if value or delay changes
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };
  // استفاده از دیباونس
  const debouncedTextSearch = useDebounce(textSearch, 700);

  const getData = async () => {
    try {
      setLoading(true);
      let obj = {
        perpage,
        page,
        ...(idGroup && { id: idGroup }),

        ...(textSearch && { search: textSearch }),
      };
      const data = await fetchData(obj);
      if (data) {
        setCountData(data.total_items);
        setData(data.results);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [perpage, page, rerender, debouncedTextSearch]);
  return (
    <>
      <>
        <section className="overflow-hidden flex flex-col lg:min-w-[500px]">
          {isHead ? (
            <div className="flex justify-between items-center mb-3 px-2 pl-0 gap-6">
              <div className="flex gap-2 items-center">
                <p className="vazirMedium text-[16px]"> {title}</p>
                <p className="vazirMedium text-[13px]">
                  (تعداد کل : {countData})
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {isAddIcon ? (
                  openFunc ? (
                    <Button
                      onClick={openFunc}
                      className="bg-transparent text-green-600"
                      isIconOnly
                      variant="faded"
                    >
                      <CircleFadingPlus />
                    </Button>
                  ) : (
                    <Link href={urlAddIcon}>
                      <Button
                        className="bg-transparent text-green-600"
                        isIconOnly
                        variant="faded"
                      >
                        <CircleFadingPlus />
                      </Button>
                    </Link>
                  )
                ) : null}

                {data && data.length == 0 ? null : (
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setPerpage(e.target.value);
                        setPage(1);
                      }
                    }}
                    id="small"
                    className="block  p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-min w-min"
                  >
                    <option value="" defaultValue>
                      تعداد نمایش{" "}
                    </option>
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                )}
              </div>
            </div>
          ) : null}

          {
            <Input
              // id="password"
              value={textSearch}
              onChange={(e) => {
                setTextSearch(e.target.value);
              }}
              className="labelInputNextUi borderInput marginControl  mb-4"
              type="text"
              placeholder=" جست و جو..."
              // isRequired={true}
              labelPlacement="outside"
              startContent={
                <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          }

          {data && data.length == 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="flex flex-col gap-3 justify-center items-center mb-16">
                <Image
                  className="w-full he-full max-w-[250px] max-h-[250px]"
                  width={500}
                  height={500}
                  src={img1}
                />
                <p> چیزی جهت نمایش وجود ندارد</p>
              </div>
            </div>
          ) : (
            <>
              {!loading ? (
                <>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-solid border-gray-200">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      {tableHead}
                      {tableBody(data)}
                    </table>
                  </div>
                  <PaginationComponent
                    countData={countData}
                    perPage={perpage}
                    page={page}
                    setPage={setPage}
                  />
                </>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner />
                </div>
              )}
            </>
          )}
        </section>
      </>
    </>
  );
};

export default TableComponents;
