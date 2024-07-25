import React from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent({ countData, perPage, page, setPage }) {
  const countOfData = countData ? Object.values(countData)[0] : 1
  const pages = Math.ceil(countOfData / perPage);
  const handleChange = (page) => {
    // setLoading(true)
    setPage(page)

  }
  return (
    <>
      <div className="w-full flex justify-center py-2">

        <Pagination showControls className="ltr" total={pages} page={page} onChange={handleChange} />
      </div>
    </>
  );
}