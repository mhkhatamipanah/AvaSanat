"use client"
import { getCookie } from '@/src/utils/Cookie';
import { ApiActions } from '@/src/utils/Frontend/ApiActions';
import { Textarea, Button, Input } from '@nextui-org/react';
import { Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ButtonInvoice from './ButtonInvoice';

const page = () => {

  const [data, setData] = useState(null)
  const { create_Invoice } = ApiActions()
  useEffect(() => {
    const cookie = getCookie("Avasanat")
    if (cookie) {
      create_Invoice("/api/invoice/", cookie).then((res) => {
        setData(res.data)
      })
    }

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

      // const data =JSON.stringify( { phone, code, title, description })
      // const res = await checkOtp(data);

      // if (res) {
      //   setTitle("")
      //   setPhone("")
      //   setDescription("")
      //   setIsSendOTP(false)
      //   for (let i = 0; i < 6; i++) {
      //     document.querySelectorAll('.otp-input')[i].value = ""
      //   }
      // }



    } else {
      // send Otp

      // if (!phone.trim()) {
      //   toast.error("لطفا شماره تلفن را وارد کنید")
      //   return
      // } 
      // console.log(phone.length)
      // if (phone.length !== 11) {
      //   toast.error("لطفا 11 رقم تلفن را وارد کنید")
      //   return
      // }

      // const data =  JSON.stringify({ phone })

      // const res = sendOtp(data)
      // if (res) {
      //   setIsSendOTP(true)
      // }
      setIsSendOTP(true)
    }
  }

  return (
    <>
      <div className='h-fit flex justify-center items-center xl:px-0 px-6 vazirMedium mb-20'>

        <section className='w-full flex flex-col items-center mt-2 lg:mt-8 min-h-screen max-w-screen-2xl'>
          <div className='grid grid-cols-7 w-full px-4 gap-3'>
            <div className='col-span-5 w-full rounded-lg bg-white boxShadow p-6'>
              <div className='grid grid-cols-2 gap-3'>
                {data && data.map((e, i) => {
                  console.log(e)
                  return (
                    <div id={`invoiceContainer-${i}`} className='flex gap-2  border border-gray-300 rounded-xl p-2' key={i}>
                      <img className='object-cover aspect-square h-36 rounded-md' src={e.image ? `data:image/webp;base64,${e.image}` : "/images/placeholder.jpg"} alt="profile-picture" />
                      <div className='flex justify-between w-full'>
                        <div>
                          <p className="vazirDemibold text-xl ">
                            {e.title}
                          </p>
                          <p className="vazirMedium text-lg text-gray-700 mt-2">
                            {e.subtitle}
                          </p>
                          {e.feature &&
                            Object.entries(e.feature).map(([key, value]) => {
                              console.log(`Key: ${key}, Value:`, value);
                            })}
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                          <ButtonInvoice id={e.id} invoiceContainer={i} />
                        </div>

                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='grid grid-cols-2 gap-3 w-full mt-5'>

              </div>
            </div>

            <div className='col-span-2 w-full border border-gray-300 rounded-lg bg-white boxShadow h-min'>
              <div className='col-span-2 w-full flex flex-col  gap-4 p-3'>
                <div className='w-full p-2'>
                  <div className='flex items-center justify-between' >
                    <p>
                      تعداد محصولات :
                    </p>
                    <p className='ml-2'>
                      1
                    </p>
                  </div>
                  <div className="border border-b mt-2"></div>

                </div>
                <div className='w-full'>
                  <Input

                    // value={phone}
                    // onChange={(e) => {
                    //   setPhone(e.target.value)
                    // }}
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
                  // value={description}
                  // onChange={(e) => { setDescription(e.target.value) }}
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
                <Button onClick={sendOtpHandler} className='bg-[#d94038] text-white w-full mt-3'>
                  ثبت پیش فاکتور
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default page