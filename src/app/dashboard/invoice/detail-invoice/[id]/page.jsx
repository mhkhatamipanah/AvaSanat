"use client";

import DetailInvoice from "@/src/components/Dashboard/invoice/DetailInvoice";
import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import React, { Suspense } from "react";

const Page = ({ params }) => {
  const { get_OneInvoice, edit_Invoice } = ApiActions();
  
  return (
    <Suspense>
      <DetailInvoice
        params={params}
        getOneTicket={get_OneInvoice}
        editTicket={edit_Invoice}

      />
    </Suspense>
  );
};

export default Page;
