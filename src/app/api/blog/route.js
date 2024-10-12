import Blog from "@/src/models/Blog";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
const mongoose = require("mongoose");

const sharp = require("sharp");

export async function POST(req, res) {
  try {
    connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const subtitle = formData.get("subtitle");

    const content = formData.get("content");

    const file = formData.get("file");
    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    try {
      const res = await sharp(buffer)
        .resize(500, 500)
        .webp({ lossless: true, quality: 60, alphaQuality: 80, force: true })
        .toBuffer();

      // const buffer = fs.readFileSync(file.file.path);
      const blog = await Blog.create({
        title,
        subtitle,
        content,
        file: res,
      });
      if (blog) {
        return NextResponse.json({ message: "ساخته شد" }, { status: 201 });
      }
      // else {
      // }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, res) {
  connectDB();
  const { searchParams } = new URL(req.url);

  let threeData = searchParams.get("threeData");
  if (threeData) {
    const blog = await Blog.find({}, "-__v")
      .sort({ createdAt: -1 })
      .limit(3)
      .catch((err) => {
        console.log(err);
      });

    const imageData = blog.map((ducomentProduct) => {
      const thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");

      const thumbnailBase64 = thumbnailBuffer.toString("base64");
      return {
        image: thumbnailBase64,
        title: ducomentProduct.title,
        id: ducomentProduct.id_Blog,
        subtitle: ducomentProduct.subtitle,
        updatedAt: ducomentProduct.updatedAt,
      };
    });
    return NextResponse.json({ data: imageData });
  }

  let count = searchParams.get("count");
  if (count) {
    let countData = await Blog.countDocuments().catch((err) => {
      console.log(err);
    });

    return NextResponse.json({ countData });
  }

  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");

  const blog = await Blog.find({}, "-__v")

    .limit(perPage ? perPage : 20)
    .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });

  const imageData = blog.map((ducomentProduct) => {
    const thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");

    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    return {
      image: thumbnailBase64,
      title: ducomentProduct.title,
      id: ducomentProduct.id_Blog,
      subtitle: ducomentProduct.subtitle,
      updatedAt: ducomentProduct.updatedAt,

    };
  });
  return NextResponse.json({ data: imageData });
}
