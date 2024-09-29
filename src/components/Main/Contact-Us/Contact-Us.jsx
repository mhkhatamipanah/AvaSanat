"use client"
import { BadgeInfo, CaseUpper, Instagram, MapPin, Phone, PhoneCall, SpellCheck } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import img1 from "@/public/images/1.png"
import { Input, Textarea, Button } from "@nextui-org/react";
import { toast } from 'sonner'
import { ApiActions } from '@/src/utils/Frontend/ApiActions'

const ContactUs = () => {
  const [isSendOTP, setIsSendOTP] = useState(false)
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

  const [title, setTitle] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")

  const { sendOtp, checkOtp } = ApiActions()
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
      if (!title.trim()) {
        toast.error("لطفا تیتر را وارد کنید")
        return
      }
      if (!description.trim()) {
        toast.error("لطفا توضیحات را وارد کنید")
        return
      }
      const data = { phone, code, title, description }
      const res = await checkOtp(data);

      if (res) {
        setTitle("")
        setPhone("")
        setDescription("")
        setIsSendOTP(false)
        for (let i = 0; i < 6; i++) {
          document.querySelectorAll('.otp-input')[i].value = ""
        }
      }



    } else {
      // send Otp

      if (!phone.trim()) {
        toast.error("لطفا شماره تلفن را وارد کنید")
        return
      }

      const data = { phone }
      const res = sendOtp(data)
      if (res) {
        setIsSendOTP(true)
      }
    }
  }
  return (
    <div className='h-fit max-w-screen-xl items-center justify-between xl:px-0 px-6 mx-auto vazirMedium mb-20'>
      <section className='w-full flex flex-col items-center mt-2 '>

        <section className='grid grid-cols-9 w-full mt-3'>
          <div className='col-span-9 lg:col-span-5 w-full h-full flex justify-center items-center'>
            <div className='grid grid-cols-2 gap-5 p-2 items-center w-full '>
              <div className='w-full flex justify-center col-span-2 my-2 mt-7'>
                <p className='text-3xl '>  پیام خود را ثبت کنید</p>

              </div>
              <Input
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                className="labelRight"
                label="موضوع"
                placeholder="موضوع را وارد کنید"
                labelPlacement="outside"
                endContent={
                  <CaseUpper className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input

                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                className="labelRight"
                label="شماره تلفن"
                placeholder="شماره تلفن را وارد کنید"
                labelPlacement="outside"
                endContent={
                  <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Textarea


                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                label="توضیحات"
                placeholder="پیام خود را وارد کنید"
                className=" col-span-2 textareaStyle"
              />

              {isSendOTP &&
                <div className='col-span-2 w-full flex justify-center'>
                  <div className="flex flex-row-reverse justify-center gap-2 w-1/2">
                    <input id="otp" className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    <input className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    <input className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    <input className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    <input className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                    <input className="otp-input w-12 h-12 text-center border rounded-md shadow-sm border-gray-300 border-solid focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code" onKeyDown={gobackOTP} onChange={handleChange} required />
                  </div>
                </div>
              }

              <div className='col-span-2 w-full flex justify-center'>
                <Button onClick={sendOtpHandler} className='bg-[#d94038] text-white w-1/2'>
                  ثبت پیام
                </Button>
              </div>
              <div className='flex gap-2 items-center col-span-2'>
                <BadgeInfo className='text-gray-700' />
                <p className='text-gray-600 text-sm'> در طول روز فقط 2 بار میتوانید پیام خود را ثبت کنید</p>
              </div>

            </div>
          </div>
          <div className='col-span-9 lg:col-span-4 w-full'>
            <div className='p-10'>
              <Image src={img1} />
            </div>
          </div>
        </section>
        <section className='grid grid-cols-9 w-full  lg:gap-16 mt-3  '>
          <div className='col-span-9 lg:col-span-4 w-full my-2 lg:my-8 overflow-hidden'>
            <div className='relative h-full pb-[500px] overflow-hidden rounded-2xl'>
              <iframe
                className='left-0 top-0 absolute border-0 w-full h-full overflow-hidden '
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1620.290327245494!2d51.42279731843917!3d35.687326235086175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0182ea57cf15%3A0x195f7de6a3a8c5d6!2z2KfZhNqp2KrYsdmI2qnZhNmI2LE!5e0!3m2!1sfa!2s!4v1722453409872!5m2!1sfa!2s"
                // width="600"
                // height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>


          </div>
          <div className='h-full col-span-9 lg:col-span-5 w-full relative flex flex-col justify-center'>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2'>
                <MapPin />
                <p>
                  تهران، میدان امام خمینی، خیابان لاله زار، کوچه ملانوروزی، پلاک 7
                </p>
              </div>
              <div className='flex gap-2'>
                <PhoneCall />
                <p className='ltr'>
                  0902 366 53 06
                </p>
              </div>
              <div className='flex gap-2'>
                <Instagram />
                <p className='ltr'>
                  Avasanat.ir
                </p>
              </div>
            </div>

          </div>
        </section>
      </section>
    </div>
  )
}

export default ContactUs