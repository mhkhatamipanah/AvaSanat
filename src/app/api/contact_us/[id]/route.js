import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import MessageModel from "@/src/models/MessageModel";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const id = params.id;

    connectDB();
    const updateTicket = await MessageModel.findOneAndUpdate(
      { id_Message: id },
      body
    ).catch((err) => {
      console.log(err);
    });

    if (updateTicket) {
      return NextResponse.json({
        message: "پیام با موفقیت ادیت شد",
        success: true,
        results: updateTicket,
      });
    } else {
      return NextResponse.json(
        { message: "پیام ادیت نشد", success: false },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, { params }) {
  connectDB();

  const id = params.id;

  const findOneTicket = await MessageModel.find(
    { id_Message: id },
    "-__v"
  ).catch((err) => {
    console.log(err);
  });

  if (findOneTicket) {
    return NextResponse.json({ success: true, results: findOneTicket });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Return the image data in JSON format
}

export async function DELETE(req, { params }) {
  try {
    connectDB();
    const id = params.id;

    const DeleteMessage = await MessageModel.findOneAndDelete({
      id_Message: id,
    }).catch((err) => {
      console.log(err);
    });

    if (DeleteMessage) {
      return NextResponse.json({
        message: "پیام با موفقیت حذف شد",
        success: true,
      });
    } else {
      return NextResponse.json(
        { message: "پیام حدف نشد", success: false },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}
