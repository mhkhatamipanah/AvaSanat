import React from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent({ countData, perPage, page, setPage }) {
  const countOfData = countData ? countData : 1
  const pages = Math.ceil(countOfData / perPage);
  const handleChange = (page) => {
    setPage(page)
  }
  return (
    <>
      <div className="w-full flex justify-center py-2 my-3">
        <Pagination color="primary" showControls className="ltr" page={page} total={pages} onChange={handleChange}/>
      </div>
    </>
  );
}