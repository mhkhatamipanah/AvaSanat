import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Blog from "@/src/models/Blog";

const mongoose = require("mongoose");
const sharp = require("sharp");

export async function GET(req, { params }) {
  try {
    connectDB();

    const id = params.id;

    const findOneProduct = await Blog.find({ id_Blog: id }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );

    const thumbnailBuffer = Buffer.from(findOneProduct[0].file, "base64");
    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    if (findOneProduct) {
      return NextResponse.json({
        success: true,
        results: findOneProduct,
        image: thumbnailBase64,
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
    const subtitle = formData.get("subtitle");

    const content = formData.get("content");

    const file = formData.get("file");


    try {
     

      let res;
      if( file && file !== "undefined"){
        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
  
        res = await sharp(buffer)
          .resize(500, 500)
          .webp({ lossless: true, quality: 60, alphaQuality: 80, force: true })
          .toBuffer();
      }
  

      // const buffer = fs.readFileSync(file.file.path);
      const blog = await Blog.findOneAndUpdate(
        { id_Blog: id },
        {
          title,
          subtitle,
          content,
          ...(file && file !== "undefined" && { file: res }),
        }
      );
      if (blog) {
        return NextResponse.json({ message: "ادیت شد" }, { status: 201 });
      }
      // else {
      // }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });

      const mergeImage = oneProduct?.file.concat(filesArray);

      const product = await Blog.findOneAndUpdate(
        { id_Product: id },
        {
          ...(title && { title }),
          ...(subtitle && { subtitle }),
          ...(description && { description }),
          ...(brand && { brand }),

          ...(objectId && { category: objectId }),
          ...(changeImage && { file: mergeImage }),

          ...(routeCategory && { routeCategory }),
          ...(titleCategory && { titleCategory }),

          ...(indexMainImage && { indexMainImage }),

          ...(featureData && { feature: featureData }),
          ...(specificationsData && { specifications: specificationsData }),
        }
      );
      if (product) {
        return NextResponse.json({ message: "ادیت شد" }, { status: 200 });
      }
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;

  const DeleteProduct = await Blog.findOneAndDelete({
    id_Blog: id,
  }).catch((err) => {
    console.log(err);
  });

  if (DeleteProduct) {
    return NextResponse.json(
      { message: "بلاگ با موفقیت حذف شد", success: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "بلاگ حدف نشد" }, { status: 400 });
  }
}
