import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import OTP from "@/src/models/otp";
import axios from "axios";

const isInteger = (str) => {
  return !isNaN(parseInt(str));
};
const sixDigitOTP = () => {
  let randomNumber;
  do {
    randomNumber = String(Math.floor(Math.random() * 1000000));
  } while (randomNumber.length < 6);
  return randomNumber;
};
export async function POST(req, res) {
  try {
    connectDB();
    const body = await req.json();

    const { phone } = body;
    if (!phone.trim() || phone.trim().length !== 11) {
      return NextResponse.json(
        { message: " شماره را به درستی وارد کنید" },
        { status: 400 }
      );
    }
    if (!isInteger(phone)) {
      return NextResponse.json(
        { message: " شماره باید عدد باشد" },
        { status: 400 }
      );
    }

   
    // const oneHoureBefore =  new Date().getTime() - (1000*60*60)
    // const countRequestOneHour = await OTP.find({ phone , expTime: { $gt: oneHoureBefore }}).count().catch((err) => {
    //   console.log(err);
    // });
    // if(countRequestOneHour > 4 ){
    //   return NextResponse.json({ message: "تعداد درخواست زیاد ساعات دیگر مجدد وارد شوید" } , { status: 429 });
    // }

    // const sendBefore = await OTP.find({ phone , expTime: { $gt: new Date().getTime() }}).count().catch((err) => {
    //   console.log(err);
    // });
    // if(sendBefore > 0 ){
    //   return NextResponse.json({ message: "کد برای شما از قبل ارسال شده " });

    // }

    const date = new Date();
    const expireOTP = date.getTime() + 1000 * 60 * 2;
    const otpCode =  sixDigitOTP()
    console.log()
    OTP.create({
      phone: body.phone,
      code: otpCode,
      expTime: expireOTP,
    });
    // بعدا باید otp رو بردارم که به فرانت نفرستم 
    return NextResponse.json({ message: "کد ارسال شد" , otp: otpCode });


    var data = JSON.stringify({
      mobile: body.phone,
      templateId: "153190",
      parameters: [{ name: "CODE", value: otpCode }],
    });

    var config = {
      method: "post",
      url: "https://api.sms.ir/v1/send/verify",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
        "x-api-key": process.env.API_KEY_SMSIR,
      },
      data: data,
    };

    const result = await axios(config).catch((error) => {
      console.log(error);
    });
    if (JSON.stringify(result.data.message === "موفق")) {
      OTP.create({
        phone: body.phone,
        code: otpCode,
        expTime: expireOTP,
      });

      return NextResponse.json({ message: "کد ارسال شد" });
    } else {
      return NextResponse.json({ message: "مشکلی پیش آمده" }, { status: 400 });
    }
  } catch (e){
    console.log(e)

    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }
}