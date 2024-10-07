import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Product from "@/src/models/Product";
import Category from "@/src/models/Category";
const mongoose = require("mongoose");
const sharp = require("sharp");

export async function GET(req, { params }) {
  try {
    connectDB();

    const id = params.id;

    const findOneProduct = await Product.find({ id_Product: id }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );
    const imageTransfer = findOneProduct[0].file.map((e) => {
      const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
      const thumbnailBase64 = thumbnailBuffer.toString("base64");
      return {
        fileName: `uploaded_image_${Date.now()}.webp`, // For reference
        thumbnailBase64: thumbnailBase64,
        // mainImageBase64: mainImageBase64,
        index: e.index
      };
    });


    if (findOneProduct) {
      return NextResponse.json({
        success: true,
        results: findOneProduct,
        images: imageTransfer,
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

    const feature = formData.get("feature");
    const featureData = JSON.parse(feature);

    const specifications = formData.get("specifications");
    const specificationsData = JSON.parse(specifications);

    const title = formData.get("title");
    const description = formData.get("description");
    const subtitle = formData.get("subtitle");
    const brand = formData.get("brand");

    const category = formData.get("category");
    const changeImage = formData.get("changeImage");
    const indexMainImage = formData.get("indexMainImage");
 

    const objectId = new mongoose.Types.ObjectId(category);
    const oneCategory = await Category.findOne({ _id: category }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );
    const routeCategory = oneCategory.route;
    const titleCategory = oneCategory.title;


    const oneProduct = await Product.findOne({ id_Product: id }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );
    const maxIndex = oneProduct?.file.reduce((max, e) => {
      return e.index > max ? e.index : max;
    }, -Infinity);
    
    console.log(maxIndex);

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
          return {
            thumbnail: res,
            mainImage: res2,
            index: i + maxIndex + 1,
          };
        })
      );

      const mergeImage = oneProduct?.file.concat(filesArray);

      const product = await Product.findOneAndUpdate(
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
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}


export async function DELETE(req, { params }) {
  const id = params.id;

  const DeleteProduct = await Product.findOneAndDelete({ id_Product: id }).catch((err) => {
    console.log(err);
  });

  if (DeleteProduct) {
    return NextResponse.json({ message: "محصول با موفقیت حذف شد" , success:true } , {status:200});
  } else {
    return NextResponse.json({ message: "محصول حدف نشد" }, {status:400});
  }
}
