import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Category from "@/src/models/Category";

const mongoose = require("mongoose");
const sharp = require("sharp");

export async function GET(req, { params }) {
  try {
    connectDB();

    const id = params.id;

    const findOneCategory = await Category.findOne(
      { id_Category: id },
      "-__v"
    ).catch((err) => {
      console.log(err);
    });

    const imageTransfer = findOneCategory.file;
    const thumbnailBuffer = Buffer.from(imageTransfer, "base64");
    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    if (findOneCategory) {
      return NextResponse.json({
        success: true,
        results: findOneCategory,
        images: thumbnailBase64,
      });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(req, { params }) {
  try {
    connectDB();

    const id = params.id;

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const route = formData.get("route");

    const file = formData.get("file");

    try {
      let res;

      if (file && file !== "undefined") {
        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        res = await sharp(buffer)
          .resize(500, 500)
          .webp({ lossless: true, quality: 60, alphaQuality: 80, force: true })
          .toBuffer();
      }

      const category = await Category.findOneAndUpdate(
        { id_Category: id },
        {
          ...(title && { title }),
          ...(description && { description }),
          ...(route && { route }),
          ...(res && { file: res }),
        }
      );

      if (category) {
        return NextResponse.json(
          { success: true, message: "ادیت شد" },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, message: "ارور ناشناخته" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "مشکلی پیش آمده " },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;

  const DeleteProduct = await Category.findOneAndDelete({
    id_Category: id,
  }).catch((err) => {
    console.log(err);
  });

  if (DeleteProduct) {
    return NextResponse.json(
      { message: "دسته بندی با موفقیت حذف شد", success: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json({  success: false,message: "دسته بندی حدف نشد" }, { status: 400 });
  }
}
