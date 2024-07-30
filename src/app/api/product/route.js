import Product from "@/src/models/Product";
import Category from "@/src/models/Category";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
const mongoose = require('mongoose');

const sharp = require("sharp");

export async function POST(req, res) {
  try {
    connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const objectId =new  mongoose.Types.ObjectId(category);
    console.log(objectId)
    const oneCategory = await Category.findOne({ _id: category }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );
    const routeCategory = oneCategory.route;
    const files = [];
    for (let i = 0; i < 20; i++) {
      const file = formData.get(`file${i}`);
      if (file) {
        files.push(file);
      }
    }

    try {
      const filesArray = await Promise.all(
        files.map(async (e, i) => {
          const bufferData = await e.arrayBuffer();
          const buffer = Buffer.from(bufferData);
          const res = await sharp(buffer)
            .resize(500, 500)
            .webp({
              lossless: true,
              quality: 60,
              alphaQuality: 80,
              force: true,
            })
            .toBuffer();
          const res2 = await sharp(buffer)
            .resize(800, 800) // اندازه تصویر را بزرگتر کنید
            .webp({
              lossless: true, // از دست دادن کیفیت را به حداقل برسانید
              quality: 80, // کیفیت تصویر را بالا ببرید
              alphaQuality: 90, // کیفیت کانال آلفا را بالا ببرید
              force: true, // تبدیل به فرمت WebP را اجباری کنید
            })
            .toBuffer();
          return { thumbnail: res, mainImage: res2, index: i };
        })
      );
      const product = await Product.create({
        title,
        description,
        category:objectId,
        file: filesArray,
        routeCategory,
      });
      if (product) {
        return NextResponse.json({ message: "ساخته شد" }, { status: 201 });
      }
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

  let count = searchParams.get("count");
  if (count) {
    let countData = await Product.countDocuments().catch((err) => {
      console.log(err);
    });

    return NextResponse.json({ countData });
  }

  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");

  const filterCategory = searchParams.get("filterCategory");
  if (filterCategory) {
    const category = await Product.find({routeCategory:filterCategory}, "-__v")
      .limit(perPage ? perPage : 20)
      .skip(perPage && page ? perPage * (page - 1) : 0)
      .catch((err) => {
        console.log(err);
      });
      console.log(category[0].file)
    const imageData = category.map((ducomentProduct) => {
      const imageTransfer = ducomentProduct.file.map((e) => {
        if (ducomentProduct.indexMainImage === e.index) {
          const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
          
          const thumbnailBase64 = thumbnailBuffer.toString("base64");

          return {
            fileName: `uploaded_image_${Date.now()}.webp`, // For reference
            thumbnailBase64: thumbnailBase64,
            // mainImageBase64: mainImageBase64,
          };
        }
      });
      const newArr = imageTransfer.filter(
        (item) => item !== null && typeof item !== "undefined"
      );
      return {
        newArr,
        title: ducomentProduct.title,
        description: ducomentProduct.description,
      };
    });
    return NextResponse.json({ data: imageData });
  }

  const category = await Product.find({}, "-__v")
    // .populate("category", "-__v")
    // .lean()
    // .sort({ createdAt: -1 })
    .limit(perPage ? perPage : 20)
    .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });

  const imageData = category.map((ducomentProduct) => {
    const imageTransfer = ducomentProduct.file.map((e) => {
      if (ducomentProduct.indexMainImage === e.index) {
        const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");

        const thumbnailBase64 = thumbnailBuffer.toString("base64");

        return {
          fileName: `uploaded_image_${Date.now()}.webp`, // For reference
          thumbnailBase64: thumbnailBase64,
          // mainImageBase64: mainImageBase64,
        };
      }
    });
    const newArr = imageTransfer.filter(
      (item) => item !== null && typeof item !== "undefined"
    );
    return {
      newArr,
      title: ducomentProduct.title,
      description: ducomentProduct.description,
    };
  });
  return NextResponse.json({ data: imageData });
}
