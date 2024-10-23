"use client"
import { getCookie, getTotalUniqueItems } from '@/src/utils/Cookie';
import { ApiActions } from '@/src/utils/Frontend/ApiActions';

import { Textarea, Button, Input, Chip, Spinner } from '@nextui-org/react';
import { Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ButtonInvoice from './ButtonInvoice';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';
import img1 from "@/public/images/no-resualt.png";

const Page = () => {

  const [countData, setCountData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [selectedItems, setSelectedItems] = useState([]);
  const setCountDataHandler = () => {
    setCountData(getTotalUniqueItems())
  }
  useEffect(() => {
    setCountDataHandler()

  }, [selectedItems])
  const [data, setData] = useState(null)
  const { create_Invoice } = ApiActions()

  const getCookieData = () => {
    setLoading(true)
    const cookie = getCookie("Avasanat")
    if (cookie) {
      create_Invoice("/api/invoice/", cookie).then((res) => {
        setData(res.data)
        setLoading(false)

      })
    } else {
      setData([])
      setLoading(false)
    }
  }
  useEffect(() => {
    getCookieData()
  }, [])



  // OTP
  const [isSendOTP, setIsSendOTP] = useState(false)

  function gobackOTP(e) {
    if (e.keyCode === 13) sendOtpHandler()
    if (e.keyCode === 8) {
      let num = null
      for (let i = 0; i < 6; i++) {
        if (document.querySelectorAll('.otp-input')[i].value !== "") {
          num = i
        }
        if (num !== null) {
          document.querySelectorAll('.otp-input')[num].focus()
        }
      }
    }
  }
  function handleChange(e) {
    // if(e.target.value !== ""){
    for (let i = 0; i < 6; i++) {
      if (document.querySelectorAll('.otp-input')[i].value == "") {
        document.querySelectorAll('.otp-input')[i].focus()
        break
      }
    }
    for (let i = 0; i < 6; i++) {
      if (document.querySelectorAll('.otp-input')[i].value === "") {
        return;
      }
    }
    sendOtpHandler()
  }




  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")


  const { checkOtpInvoice, sendOtpInvoice } = ApiActions()



  useEffect(() => {
    if (data && data.length > 0) {
      const allItems = data.map(e => ({
        id: e.id,
        ...(e.feature && { feature: e.feature }),
      }));
      setSelectedItems(allItems);
    }

  }, [data]);

  const sendOtpHandler = async () => {

    if (isSendOTP) {
      // check otp

      let code = '';

      for (let i = 0; i < 6; i++) {
        code += document.querySelectorAll('.otp-input')[i].value;
      }
      if (code.length !== 6) {
        toast.error("لطفا کل کد را وارد کنید")
        return;
      }
      if (!/^\d+$/.test(code)) {
        toast.error("لطفا عدد وارد کنید")
        return;
      }

      const data = JSON.stringify({ phone, code, description, invoice: selectedItems })
      const res = await checkOtpInvoice(data);

      if (res) {
        setPhone("")
        setDescription("")
        setIsSendOTP(false)
        for (let i = 0; i < 6; i++) {
          document.querySelectorAll('.otp-input')[i].value = ""
        }
        setData("")
        setSelectedItems([])
      }



    } else {
      // send Otp

      if (!phone.trim()) {
        toast.error("لطفا شماره تلفن را وارد کنید")
        return
      }
      if (phone.length !== 11) {
        toast.error("لطفا 11 رقم تلفن را وارد کنید")
        return
      }

      const data = JSON.stringify({ phone })

      const res = sendOtpInvoice(data)
      if (res) {
        setIsSendOTP(true)
      }

    }
  }



  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center col-span-2">
      <Spinner />
    </div>
  )
  const renderEmptyState = () => (
    <div className="h-full w-full flex justify-center items-center col-span-2">
      <div className="flex flex-col gap-3 justify-center items-center max-[768px]:mb-5 mb-16">
        <Image
          width={500}
          height={500}
          className="w-full he-full max-w-[170px] max-h-[170px] sm:max-w-[250px] sm:max-h-[250px]"
          src={img1}
          alt='empty'
        />
        <p> چیزی جهت نمایش وجود ندارد</p>
      </div>
    </div>
  );

  const renderInvoice = () => (
    <>

      {data && data.map((e, i) => {
        return (
          <div id={`invoiceContainer-${i}`} className='flex gap-2  border border-gray-300 rounded-xl p-2' key={e.id}>
            <Link className='aspect-square h-28 sm:h-32 md:h-36' href={`/product/${e.route}/${e.id}`}>
              <Image
                width={500}
                height={500}
                className='object-cover h-full rounded-md cursor-pointer hover:scale-105 transition-all duration-400' src={e.image ? `data:image/webp;base64,${e.image}` : "/images/placeholder.jpg"} alt="profile-picture" />
            </Link>
            <div className='flex justify-between w-full'>
              <div className='flex justify-evenly flex-col mr-1 w-full'>
                <p className="vazirDemibold text-sm sm:text-md md:text-lg lg:text-xl ellipsisOneLine">
                  {e.title}
                </p>
                <p className="vazirMedium text-[12px] sm:text-sm md:text-md lg:text-lg  text-gray-700 ellipsisTwoLine">
                  {e.subtitle}
                </p>
                <div className='flex gap-2 flex-wrap'>
                  {e.feature &&
                    Object.entries(e.feature).map(([key, value], index) => {
                      return (
                        <Chip key={`chip-${index}-${e.id}`} color="primary" variant="flat">
                          {`${key}: ${value}`}
                        </Chip>
                      )
                    })}
                </div>

              </div>
              <div className='flex flex-col justify-center items-center'>
                <ButtonInvoice id={e.id} invoiceContainer={i} selectedProduct={selectedItems} setSelectedItems={setSelectedItems} data={data} setData={setData} />
              </div>

            </div>
          </div>
        )
      })}
    </>

  )
  return (
    <>
      <div className='h-fit flex justify-center items-center xl:px-0 max-[768px]:px-3 px-6 vazirMedium mb-20'>

        <section className='w-full flex flex-col items-center mt-2 lg:mt-8 min-h-screen max-w-screen-2xl'>
          <div className='grid grid-cols-7 w-full sm:px-4 gap-3'>
            <div className='max-[768px]:col-span-7 md:col-span-4 lg:col-span-5 w-full rounded-lg bg-white boxShadow max-[768px]:p-3 p-6'>
              <div className='grid lg:grid-cols-2 gap-3'>
                {loading ? LoadingState() :
                  data?.length === 0 ? renderEmptyState() : renderInvoice()
                }

              </div>
              <div className='grid grid-cols-2 gap-3 w-full mt-5'>

              </div>
            </div>

            <div className='max-[768px]:col-span-7 md:col-span-3 lg:col-span-2 w-full border border-gray-300 rounded-lg bg-white boxShadow h-min'>
              <div className='col-span-2 w-full flex flex-col gap-4 p-3'>
                <div className='w-full p-2'>
                  <div className='flex items-center justify-between' >
                    <p>
                      تعداد محصولات :
                    </p>
                    <p className='ml-2'>
                      {countData}
                    </p>
                  </div>
                  <div className="border border-b mt-2"></div>

                </div>
                <div className='w-full'>
                  <Input

                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                    className="labelRight "
                    label="شماره تلفن"
                    placeholder="شماره تلفن را وارد کنید"
                    labelPlacement="outside"
                    endContent={
                      <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <Textarea
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                  label="توضیحات"
                  placeholder="پیام خود را وارد کنید"
                  className=" textareaStyle heightTextArea"
                />
                {isSendOTP &&
                  <div className='col-span-2 w-full flex justify-center'>
                    <div className="flex flex-row-reverse justify-center gap-2 w-1/2">
                      <input id="otp" className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                      <input className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                      <input className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                      <input className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                      <input className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                      <input className="otp-input w-9 h-9 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    </div>
                  </div>
                }
                <div className='w-full flex justify-center'>
                  <Button onClick={sendOtpHandler} className='bg-[#d94038] text-white text-center w-[85%]'>
                    ثبت پیش فاکتور
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Page