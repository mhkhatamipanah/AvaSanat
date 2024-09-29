"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { Info } from "lucide-react";

import { toast } from "sonner";

const AnswerTicket = ({ params, pushRoute, getOneTicket, editTicket }) => {
  const { id } = params;

  const router = useRouter();

  const seenTicket = async () => {
    editTicket(id, { seen: 1 });
  };

  const getOneData = async () => {
    const res = await getOneTicket(id);
    const data = res?.results[0];
    setDescription(data.description);
    setTitle(data.title);
    setAnswer(data.text_answer);
    setIsLoading(false);

    if (!data.seen) {
      seenTicket();
    }
  };

  useEffect(() => {
    getOneData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [answer, setAnswer] = useState("");

  const AnswerTicketHandler = async () => {
    const obj = { text_answer: answer , answer:1 };
    const res = await editTicket(id, obj);
    if(res.success){
      toast.success(res.message)
      router.push(pushRoute)
    }
  };

  return (
    <>
      <section className="rtl grid gap-2 2xl:mb-0 mb-4 md:grid-cols-2  2xl:grid-cols-4 grid-cols-1 gap-y-1 gap-x-3 p-1">
        {isLoading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="relative group">
            <div className="relative overflow-hidden e bg-gradient-to-r from-[#248fe70c] to-[#c724e711] border rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="p-4">
                <h2 className="text-xl vazirDemibold text-gray-800">{title}</h2>
                <p className="text-gray-600 my-2">{description}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>
        )}
      </section>
      <div className="flex flex-col gap-1 vazirDemibold my-3">
        <p className="flex gap-2 flex-row-reverse  justify-end items-center">
          <Link href={pushRoute} className="text-sm text-red-500">
            (بازگشت)
          </Link>{" "}
          پاسخ تیکت <Info color="#0070f0" />
        </p>
      </div>
      <div>
        <Textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          id="textarea"
          isRequired={true}
          label="توضیح تکمیلی"
          placeholder="توضیح تکمیلی را وارد کنید..."
          className="w-full mb-6 textAreaNextUi pl-0 md:pl-5 lg:max-w-[600px]"
        />
      </div>

      <div className="flex justify-start mt-[24px]">
        <Button
          className={`ml-3 mb-3 text-white bg-green-700`}
          onPress={AnswerTicketHandler}
          id="CreateUser"
        >
          {"پاسخ تیکت"}
        </Button>
      </div>
    </>
  );
};

export default AnswerTicket;
