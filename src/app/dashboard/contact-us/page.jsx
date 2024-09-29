// import Category from '@/src/components/Dashboard/Category/Category'
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@nextui-org/button";

// icon
import { CheckCheck, Eye, EyeOff, FileText, SendHorizonal, Trash2, X } from 'lucide-react';

// components
import TableComponents from '@/src/components/Dashboard/Table/TableComponents';
import { ApiActions } from '@/src/utils/Frontend/ApiActions';
import ModalDelete from '@/src/components/Dashboard/ModalDelete/ModalDelete';

import moment from "jalali-moment";
import { toast } from 'sonner';

// تابع برای تبدیل به تاریخ شمسی
const convertToJalaliDate = (isoDateString) => {
  const gregorianDate = moment(isoDateString);
  return gregorianDate.format("jYYYY/jMM/jDD");
};

// تابع برای استخراج زمان
const convertToTime = (isoDateString) => {
  const gregorianDate = moment(isoDateString);
  return gregorianDate.format("HH:mm:ss");
};
const page = () => {
  const { get_ContactUs, delete_ContactUs } = ApiActions()


  const [idDelete, setIdDelete] = useState(null);
  const [rerender, setRerender] = useState(false);
  const toggleRerender = () => {
    setRerender(!rerender)
  }
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // ModalDelete User

  const [isOpen, setIsOpen] = useState(false);
  const onModalOpenChange = () => {
    setIsOpen(false);
  };

  const deleteEventHandler = async () => {
    const res = await delete_ContactUs(idDelete)
    if (res.success) {
      toast.success(res.message)
      toggleRerender()
    }
  };


  // Table Users (Header & Body)
  const tableHead = (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 hover:bg-gray-200 transition-all">
      <tr>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          شناسه
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          تیتر
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          توضیحات
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          شماره تلفن
        </th>

        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          تاریخ
        </th>
        <th scope="col" className="p-3 text-center vazirMedium text-[14px]">
          زمان
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


              <td className="px-6 py-4 vazirMedium text-center">{e.id_Message}</td>
              <td className="px-6 py-4 vazirMedium text-center oneLineShow">
                <p className='max-w-40'>
                  {e.title}

                </p>
              </td>
              <td className="px-6 py-4 vazirMedium oneLineShow">
                <p className="max-w-52">{e.description}</p>
              </td>
              <td
                className="px-6 py-4 vazirMedium font-medium text-gray-900 whitespace-nowrap text-center"
              >
                {e.phone}
              </td>


              <td className="px-6 py-4 vazirMedium">
                {convertToJalaliDate(e.createdAt)}
              </td>

              <td className="px-6 py-4 vazirMedium">
                {convertToTime(e.createdAt)}
              </td>
              <td className="px-6 py-4 vazirMedium">{e.seen == 0 ? <EyeOff className='text-red-600' /> : <Eye className='text-green-600' />}</td>
              <td className="px-6 py-4 vazirMedium">{e.answer == 0 ? <X className='text-red-600' /> : <CheckCheck className='text-green-600' />}</td>
              <td className="px-6 py-4 flex gap-1 justify-center">

                {!e.answer == 1 && (
                  <Link href={`/dashboard/contact-us/answer-ticket/${e.id_Message}`}>
                    <Button
                      className="bg-transparent text-indigo-600"
                      isIconOnly
                      variant="faded"
                    >
                      <SendHorizonal />
                    </Button>
                  </Link>
                )}

                <Link
                  href={`/dashboard/contact-us/detail-ticket/${e.id_Message}`}
                >
                  <Button
                    className="bg-transparent text-slate-600"
                    isIconOnly
                    variant="faded"
                  >
                    <FileText />
                  </Button>
                </Link>
                {/* {e.answer ==1 && (
                  <Link
                    href={`/dashboard/super-admin/ticket/answer/${e.id}/?editAnswer=true`}
                  >
                    <Button
                      className="bg-transparent text-blue-600"
                      isIconOnly
                      variant="faded"
                    >
                      <Edit />
                    </Button>
                  </Link>
                )} */}

                <Button
                  onClick={() => {
                    setTitle("پیام");
                    setText(`پیام با آی دی`);
                    setIsOpen(true);
                    setIdDelete(e.id_Message);
                  }}
                  className="bg-transparent text-red-600"
                  isIconOnly
                  variant="faded"
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  return (
    <>
      <ModalDelete
        title={title}
        text={text}
        idDelete={idDelete}
        isModalOpen={isOpen}
        onModalOpenChange={onModalOpenChange}
        deleteEventHandler={deleteEventHandler}
      />
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
            fetchData={get_ContactUs}
            tableHead={tableHead}
            tableBody={tableBody}
            title={"پیام ها"}
            //
            rerender={rerender}
          />
        </section>

      </div>

    </>
  )
}

export default page