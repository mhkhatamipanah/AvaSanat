// import Category from '@/src/components/Dashboard/Category/Category'
"use client"
import Link from 'next/link';
import { Button } from "@nextui-org/button";
import { BadgePlus, Check, CheckCheck, Edit, Eye, EyeOff, FileText, X } from 'lucide-react';

import TableComponents from '@/src/components/Dashboard/Table/TableComponents';
import { ApiActions } from '@/src/utils/Frontend/ApiActions';
const page = () => {
  const { getContactUs } = ApiActions()

  // Table Users (Header & Body)
  const tableHead = (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 hover:bg-gray-200 transition-all">
      <tr>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          تیتر
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          شماره تلفن
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          توضیحات
        </th>

        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          مشاهده
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          پاسخ
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          اکشن
        </th>
      </tr>
    </thead>
  );
  const tableBody = (data) => {
    return (
      <tbody>
        {data.map((e) => {
          return (
            <tr
              className="hover:bg-gray-200 transition-all odd:bg-gray-100 "
              key={e._id}
            >
              <td className="px-6 py-4 vazirMedium text-center">{e.title}</td>
              <th
                scope="row"
                className="px-6 py-4 vazirMedium font-medium text-gray-900 whitespace-nowrap text-center "
              >
                {e.phone}
              </th>

              <td className="px-6 py-4 vazirMedium oneLineShow ltr">
                <p className="max-w-40">{e.description}</p>
              </td>
              <td className="px-6 py-4 vazirMedium">{e.seen ==0 ?  <X className='text-red-600'/> : <CheckCheck className='text-green-500'/> }</td>
              <td className="px-6 py-4 vazirMedium">{e.answer ==0 ? <X className='text-red-600'/> :  <CheckCheck className='text-green-500'/> }</td>
              <td className="px-6 py-4 flex gap-1 justify-center">
                <Link href={`/dashboard/users/detail-user/${e.id}`}>
                  <Button
                    className="bg-transparent text-slate-600"
                    isIconOnly
                    variant="faded"
                  >
                    <FileText />
                  </Button>
                </Link>

              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  return (
    <>
      <div
        className="p-2 lg:p-3 grid grid-cols-1 justify-center w-full gap-4"
        id="container"
      >

        {/* کاربران */}
        <section
          id="section-1"
          className={`w-full flex justify-center h-full bg-[#ffffff] rounded-lg boxShadow p-4 min-h-[600px]`}
        >
          <TableComponents
            fetchData={getContactUs}
            tableHead={tableHead}
            tableBody={tableBody}
            title={"کاربران"}
          //
          // rerender={rerender}
          />
        </section>

      </div>

    </>
  )
}

export default page