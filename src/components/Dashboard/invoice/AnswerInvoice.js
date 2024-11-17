"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Chip, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { Info } from "lucide-react";

import { toast } from "sonner";

const AnswerInvoice = ({ params, pushRoute, getOneTicket, editTicket }) => {
  const { id } = params;

  const router = useRouter();

  const seenTicket = async () => {
    editTicket(id, { seen: 1 });
  };

  const [data, setdata] = useState(null);

  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");


  const getOneData = async () => {
    const res = await getOneTicket(id);
    setdata(res.product);
    setAnswer(res.results[0].text_answer);
    setDescription(res.results[0].description)
    setPhone(res.results[0].phone)
    setIsLoading(false);
    if ( !res.results[0].seen) {
      seenTicket();
    }
  };

  useEffect(() => {
    getOneData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  const [answer, setAnswer] = useState("");

  const AnswerTicketHandler = async () => {
    const obj = { text_answer: answer, answer: 1 };
    const res = await editTicket(id, obj);
    if (res.success) {
      toast.success(res.message);
      router.push(pushRoute);
    }
  };

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
                  { phone && <p>شماره تلفن : {phone}</p>}
                  { description && <p> توضیحات : {description}</p>}
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

                
                </div>
              </div>
            </div>
          )}
        </section>
        <div className="flex flex-col gap-1 vazirDemibold my-3">
          <p className="flex gap-2 flex-row-reverse  justify-end items-center">
            <Link href={pushRoute} className="text-sm text-red-500">
              (بازگشت)
            </Link>{" "}
            پاسخ پیش فاکتور <Info color="#0070f0" />
          </p>
        </div>
        <div>
          {answer &&   <div className="flex items-center gap2 mb-2">
          <p>تعداد حروف: </p> 
          <p>{'\u00A0' + answer.length}</p>

          </div>}
        
          <Textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            id="textarea"
            isRequired={true}
            label="توضیح تکمیلی"
            placeholder="توضیح تکمیلی را وارد کنید..."
            className="w-full textAreaNextUi pl-0 md:pl-5 lg:max-w-[600px]"
          />
        </div>

        <div className="flex justify-start mt-[24px]">
          <Button
            className={`ml-3 mb-3 text-white bg-green-700`}
            onPress={AnswerTicketHandler}
            id="CreateUser"
          >
            {"پاسخ پیش فاکتور"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AnswerInvoice;
