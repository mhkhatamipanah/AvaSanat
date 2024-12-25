"use client";

import getApi from "@/src/utils/Frontend/sendApiToBackend/simpleData/getApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ButtonInvoice from "./ButtonInvoice";
import { Spinner } from "@nextui-org/react";
import PaginationComponent from "@/src/components/Dashboard/Pagination/PaginationComponents";
import Image from "next/image";
import img1 from "@/public/images/no-resualt.png";

const AllProductInCategory = ({ id, dataServer }) => {
  const pathname = usePathname();
  const categoryUrl = pathname.split("/")[2];

  const [countData, setCountData] = useState(null);

  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    setData(dataServer);
  }, []);

  const getData = () => {
    if (firstLoad) {
      let data = {
        perPage: perPage,
        page: page,
        filterCategory: id,
      };
      getApi(`/api/product?${new URLSearchParams(data).toString()}`, setData);
    }

    let data2 = {
      countFilterCategory: id,
    };

    getApi(
      `/api/product?${new URLSearchParams(data2).toString()}`,
      setCountData
    );
    setFirstLoad(true);
  };
  useEffect(() => {
    getData();
  }, [page, perPage]);

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  );
  const renderEmptyState = () => (
    <div className="h-full w-full flex justify-center items-center vazirMedium">
      <div className="flex flex-col gap-3 justify-center items-center mb-16">
        <Image
          width={500}
          height={500}
          className="w-full he-full max-w-[170px] max-h-[170px] sm:max-w-[250px] sm:max-h-[250px]"
          src={img1}
          alt="empty"
        />
        <p> چیزی جهت نمایش وجود ندارد</p>
      </div>
    </div>
  );
  return (
    <>
      <section className="min-h-screen">
        <div className="flex flex-col items-center justify-center w-full my-5 sm:my-9 md:my-14 px-2.5 sm:px-4">
          {data && data?.data && data?.data.length == 0 && renderEmptyState()}
          <div className="max-w-[1500px] grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 max-[340px]:grid-cols-1 w-full gap-3 mb-3">
            {data &&
              data.data?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col text-gray-700 bg-white shadow-lg border-[3px] border-gray-200 hover:border-[#f548485d] transition-all duration-500 ease-in-out bg-clip-border rounded-xl h-min"
                  >
                    <Link
                      href={`/product/${categoryUrl}/${e.id}`}
                      className="mx-2 mt-2 sm:mx-3 md:mx-4 sm:mt-3 md:mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-lg"
                    >
                      <Image
                        width={500}
                        height={500}
                        className="object-cover w-full h-full aspect-square"
                        src={
                          e?.newArr[0]?.thumbnailBase64
                            ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}`
                            : "/images/placeholder.jpg"
                        }
                        alt="profile-picture"
                      />
                    </Link>
                    <div className="p-3 sm:p-6 text-center pb-3">
                      {/* Title with Tooltip */}
                      <div className="relative group md:block max-md:hidden">
                        <p className="block text-right mb-2 vazirDemibold text-[13px] sm:text-md md:text-lg antialiased tracking-normal text-blue-gray-900 ellipsisOneLine">
                          {e.title}
                        </p>
                        {/* Tooltip with Animation */}
                        <span className="absolute opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 -top-7 right-0 w-max z-10 vazirLight pointer-events-none">
                          {e.title}
                        </span>
                      </div>

                      {/* Subtitle with Tooltip */}
                      <div className="relative group  md:block max-md:hidden">
                        <p className="block text-right vazirLight text-[11px] sm:text-sm tracking-normal text-blue-gray-900 text-gray-500 ellipsisOneLine mb-1">
                          {e.subtitle}
                        </p>
                        {/* Tooltip with Animation */}
                        <span className="absolute opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 -bottom-7 right-0 w-max z-10 vazirLight pointer-events-none">
                          {e.subtitle}
                        </span>
                      </div>
                      <p className="block text-right mb-2 vazirDemibold text-[13px] sm:text-md md:text-lg antialiased tracking-normal text-blue-gray-900 ellipsisOneLine md:!hidden max-md:block">
                        {e.title}
                      </p>
                      <p className="block text-right vazirLight text-[11px] sm:text-sm tracking-normal text-blue-gray-900 text-gray-500 ellipsisOneLine mb-1 md:!hidden max-md:block">
                        {e.subtitle}
                      </p>

                      <Link
                        href={`/product/${categoryUrl}/${e.id}`}
                        className="w-full block text-white bg-[#d94038] hover:bg-[#c73028] vazirLight font-medium rounded text-[10px] min-[400px]:text-[12px] sm:text-sm px-2.5 sm:px-5 py-1.5 sm:py-2.5 my-2 rounded-br-3xl rounded-tl-3xl"
                      >
                        جزییات
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          {countData && countData > perPage && (
            <PaginationComponent
              countData={countData.countData}
              perPage={perPage}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default AllProductInCategory;
