import OTP from "@/src/models/otp";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import MessageModel from "@/src/models/MessageModel";
const isInteger = (str) => {
  return !isNaN(parseInt(str));
};

export async function POST(req, res) {
  connectDB();
  const body = await req.json();
  const { phone, code, title, description } = body;
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

  const otp = await OTP.findOne({ phone, code }).catch((err) => {
    console.log(err);
  });
  if (!otp) {
    return NextResponse.json({ message: "کد نا معتبر" }, { status: 400 });
  }
  const date = new Date();
  const now = date.getTime();

  if (otp.expTime < now) {
    return NextResponse.json({ message: "کد منقضی شده " }, { status: 400 });
  }

  const newMessage = await  MessageModel.create({ phone, title, description });
  return NextResponse.json({ message: "ساخته شد" });
}
