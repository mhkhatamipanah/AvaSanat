"use client";

import DetailTicket from "@/src/components/Dashboard/Ticket/DetailTicket";
import { ApiActions } from "@/src/utils/Frontend/ApiActions";
import React, { Suspense } from "react";

const Page = ({ params }) => {
  const { get_OneContactUs, edit_ContactUs } = ApiActions();

  return (
    <Suspense>
      <DetailTicket
        params={params}
        getOneTicket={get_OneContactUs}
        editTicket={edit_ContactUs}

      />
    </Suspense>
  );
};

export default Page;
