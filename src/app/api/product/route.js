import Product from "@/src/models/Product";
import Category from "@/src/models/Category";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import { handlePdfBuffer } from "@/src/utils/Backend/BufferPdf/BufferPdf";
const mongoose = require("mongoose");

const sharp = require("sharp");

export async function POST(req, res) {
  try {
    connectDB();

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
    const indexMainImage = formData.get("indexMainImage");
    
    const pdfFile = formData.get("pdfFile");
    
    const fileNameWithoutExtension = pdfFile?.name.split(".").slice(0, -1).join(".");
    const objectId = new mongoose.Types.ObjectId(category);
    const oneCategory = await Category.findOne({ _id: category }, "-__v").catch(
      (err) => {
        console.log(err);
      }
    );
    const routeCategory = oneCategory.route;
    const titleCategory = oneCategory.title;

    let pdfBuffer;
    if (pdfFile) {
       pdfBuffer = await handlePdfBuffer(pdfFile);
       console.log(pdfBuffer)
    }


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

          return { thumbnail: res, index: i };
        })
      );
      const product = await Product.create({
        title,
        subtitle,
        description,
        brand,
        category: objectId,
        file: filesArray,
        routeCategory,
        titleCategory,
        feature: featureData,
        specifications: specificationsData,
        ...(indexMainImage && { indexMainImage }),
        ...(pdfBuffer && { pdfFile:pdfBuffer }),
        ...(pdfFile?.name && { pdfFileName:fileNameWithoutExtension }),
        
      });
      if (product) {
        return NextResponse.json({  success: true , message: "ساخته شد" }, { status: 201 });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({  success: false , message: "ارور ناشناخته" }, { status: 500 });
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

  const countFilterCategory = searchParams.get("countFilterCategory");
  if(countFilterCategory){
    let countData = await Product.countDocuments( { routeCategory: countFilterCategory }).catch((err) => {
      console.log(err);
    });

    return NextResponse.json({ countData });
  }


  const filterCategory = searchParams.get("filterCategory");
  if (filterCategory) {
    const category = await Product.find(
      { routeCategory: filterCategory },
      "-__v"
    )
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
        id: ducomentProduct.id_Product,
        indexMainImage: ducomentProduct.indexMainImage,
      };
    });

    const oneCategory = await Category.findOne({ route: filterCategory }, "title description").catch(
      (err) => {
        console.log(err);
      }
    );
    
    return NextResponse.json({ data: imageData ,category:oneCategory } , );
  }

  // detailProduct

  const detailProduct = searchParams.get("detailProduct");
  if (detailProduct) {
    const oneProduct = await Product.findOne(
      { id_Product: detailProduct },
      "-__v -createdAt -updatedAt"
    ).catch((err) => {
      console.log(err);
    });
    if(oneProduct){
      let bottomImageCount = 0; // شمارنده برای تصاویر فرعی
      const imageData = oneProduct.file.map((e) => {
          const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
          const thumbnailBase64 = thumbnailBuffer.toString("base64");
  
          if (oneProduct.indexMainImage === e.index) {
            // اگر تصویر اصلی باشد
            return {
              type: "main_image",
              image: thumbnailBase64,
            };
          } else if (bottomImageCount < 3) {
            // اگر تصویر فرعی باشد و هنوز کمتر از 3 تصویر فرعی اضافه شده باشد
            bottomImageCount++;
            return {
              type: "bottom_image",
              image: thumbnailBase64,
            };
          }
          return null; // برای مواردی که بیشتر از 3 تصویر فرعی وجود دارد، null برمی‌گردد
        })
        .filter((item) => item !== null); // حذف موارد null
  
      const productObject = oneProduct.toObject();
      return NextResponse.json({ data: productObject, image: imageData });
    }else{
      return NextResponse.json({ data: null, image: null });
    }
   
  }

  const category = await Product.find({}, "-__v")

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
      id: ducomentProduct.id_Product,
      subtitle: ducomentProduct.subtitle,
      brand: ducomentProduct.brand,
      titleCategory: ducomentProduct.titleCategory,
    };
  });
  return NextResponse.json({ data: imageData });
}
