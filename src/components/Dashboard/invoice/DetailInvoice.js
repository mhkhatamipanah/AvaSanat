"use client";

import React, { useEffect, useState } from "react";

import { Chip, Spinner } from "@nextui-org/react";
import Link from "next/link";

const DetailInvoice = ({ params, getOneTicket, editTicket }) => {
  const { id } = params;

  const seenTicket = async () => {
    const data = { seen: 1 };
    editTicket(id, data);
  };

  const [data, setdata] = useState(null);

  const getOneData = async () => {
    const res = await getOneTicket(id);
    setdata(res.product);

    setAnswer(res.results[0].text_answer);
    setIsAnswer(res.results[0].answer);

    setIsLoading(false);

    if (data && !data.results.seen) {
      seenTicket();
    }
  };

  useEffect(() => {
    getOneData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  // const [isSeen, setIsSeen] = useState(null);
  const [isAnswer, setIsAnswer] = useState(null);
  const [answer, setAnswer] = useState("");

  return (
    <>
      <div
        className="p-2 lg:p-3 grid grid-cols-1 justify-center w-full gap-4"
        id="container"
      >
        <section
          id="section-1"
          className={`w-full flex flex-col h-full bg-[#ffffff] rounded-lg boxShadow p-4 min-h-[600px]`}
        >
          {isLoading ? (
            <div className="w-full h-[600px] flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="relative ">
              <div className="relative overflow-hidden rounded-lg ">
                <div className="p-4">
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-2">
                    {data &&
                      data.map((e, i) => {
                        return (
                          <div
                            className="relative w-full rounded-lg p-3 bg-gray-50 border border-solid border-gray-300"
                            key={i}
                          >
                            <div className="w-full aspect-square overflow-hidden rounded-lg border border-solid border-gray-200">
                              <Link href={`/product/${e.route}/${e.id}`}>
                                <img
                                  className="aspect-square object-cover w-full h-full cursor-pointer hover:scale-110 transition-all duration-400 "
                                  src={
                                    e?.image
                                      ? `data:image/webp;base64,${e?.image}`
                                      : "/images/placeholder.jpg"
                                  }
                                  alt=""
                                />
                              </Link>
                            </div>

                            {/* <div className="oneLineShow"> */}
                            <p className="text-right md:text-md text-base vazirDemibold text-gray-800 mt-2">
                              {e.title}
                            </p>
                            {/* </div> */}
                            {/* <div className="twoLineShow"> */}
                            <p className="text-right text-gray-600 my-2 lg:text-lg md:text-base text-sm">
                              {e.subtitle}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {/* </div> */}
                              {e.feature &&
                                Object.entries(e.feature).map(
                                  ([key, value], index) => {
                                    return (
                                      <Chip
                                        size="sm"
                                        key={`chip-${index}-${e.id}`}
                                        color="primary"
                                        variant="flat"
                                      >
                                        {`${key}: ${value}`}
                                      </Chip>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {isAnswer ? (
                    <>
                      <hr className="bg-gray-400 " />

                      <p className="text-gray-600 my-2 lg:text-lg md:text-base text-sm">
                        پاسخ: {answer}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default DetailInvoice;
