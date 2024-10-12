"use client";

import AnswerInvoice from "@/src/components/Dashboard/invoice/AnswerInvoice";
import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import React, { Suspense } from "react";

const Page = ({ params }) => {
  const { get_OneInvoice, edit_Invoice } = ApiActions();

  return (
    <Suspense>
      <AnswerInvoice
        params={params}
        pushRoute={"/dashboard/invoice"}
        getOneTicket={get_OneInvoice}
        editTicket={edit_Invoice}

      />
    </Suspense>
  );
};

export default Page;
