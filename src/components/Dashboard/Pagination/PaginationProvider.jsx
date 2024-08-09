"use client"
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PaginationProvider({ countData, perPage }) {
  const router = useRouter()
  
  const countOfData = countData ? Object.values(countData)[0] : 1
  const pages = Math.ceil(countOfData / perPage);
  const handleChange = (page) => {
    // setLoading(true)
    router.push(`?page=${page}`);
  }
  return (
    <>
      <div className="w-full flex justify-center py-2 my-2">

        <Pagination showControls className="ltr" total={pages} page={1}
         onChange={handleChange} 
         />
      </div>
    </>
  );
}