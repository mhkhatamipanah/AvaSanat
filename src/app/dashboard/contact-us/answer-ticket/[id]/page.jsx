"use client";

import AnswerTicket from "@/src/components/Dashboard/Ticket/AnswerTicket";
import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import React, { Suspense } from "react";

const Page = ({ params }) => {
  const { get_OneContactUs, edit_ContactUs } = ApiActions();

  return (
    <Suspense>
      <AnswerTicket
        params={params}
        pushRoute={"/dashboard/contact-us"}
        getOneTicket={get_OneContactUs}
        editTicket={edit_ContactUs}

      />
    </Suspense>
  );
};

export default Page;
