"use client";

import React, { useEffect, useState } from "react";

import { Spinner } from "@nextui-org/react";

const DetailTicket = ({ params, getOneTicket, editTicket }) => {
  const { id } = params;

  const seenTicket = async () => {
    editTicket(id, { seen: 1 });
  };

  const getOneData = async () => {
    const res = await getOneTicket(id);
    const data = res?.results[0];
    setDescription(data.description);
    setTitle(data.title);
    setIsAnswer(data.answer);
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
  // const [isSeen, setIsSeen] = useState(null);
  const [isAnswer, setIsAnswer] = useState(null);
  const [answer, setAnswer] = useState("");

  return (
    <>
      <div>
        <section className="rtl grid gap-2 2xl:mb-0 mb-4 md:grid-cols-2  2xl:grid-cols-4 grid-cols-1 gap-y-1 gap-x-3 p-1">
          {isLoading ? (
            <div className="w-full h-[200px] flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="relative group">
              <div className="relative overflow-hidden e bg-gradient-to-r from-[#248fe70c] to-[#c724e711] border rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="p-4">
                  <h2 className="lg:text-xl md:text-md text-base vazirDemibold text-gray-800">
                    {title}
                  </h2>
                  <p className="text-gray-600 my-2 lg:text-lg md:text-base text-sm">
                    {description}
                  </p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default DetailTicket;
