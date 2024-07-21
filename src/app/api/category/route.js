// import time_date from "@/utils/time-date";
// import Order from "@/models/order";

import Category from "@/src/models/Category";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";

const path = require("path");
// import { whoAreYou } from "@/src/utils/Backend/auth";
// import moment from "jalali-moment";
const sharp = require("sharp");

export async function POST(req, res) {
  try {
    connectDB();

    //     // Validate User
    //     const userData = await whoAreYou(req);
    //     if (!userData) {
    //       return NextResponse.json(
    //         { message: "مشکلی در احراز هویت به وجود آمده" },
    //         { status: 401 }
    //       );
    //     }

    //     const timeAndDate = time_date();

    //     // Validate Body
    //     const body = await req.json();
    //     const { nameOfSeller, address, amount, deliveryTime, product } = body;

    //     if (!amount.trim()) {
    //       return NextResponse.json(
    //         { message: "  مقدار را به درستی وارد کنید" },
    //         { status: 400 }
    //       );
    //     }
    //     if (!product.trim()) {
    //       return NextResponse.json(
    //         { message: " محصول را به درستی وارد کنید" },
    //         { status: 400 }
    //       );
    //     }

    //     const firstDate = moment(deliveryTime);
    //     const secondDate = moment(timeAndDate.dateJalali);

    //     if (!secondDate.isBefore(firstDate)) {
    //       return NextResponse.json(
    //         { message: " تاریخ را به درستی وارد کنید" },
    //         { status: 400 }
    //       );
    //     }
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");
    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);



    
    try {
      const res = await sharp(buffer)
      .resize(500, 500)
        .webp({ lossless: true, quality: 60, alphaQuality: 80, force: true })
        .toBuffer();
      const pathImage = `./public/backendImage/${new Date().getTime()}.${"webp"}`;
      console.log(pathImage);
      const dir = path.dirname(pathImage);

      // const buffer = fs.readFileSync(file.file.path);
      const category = await Category.create({
        title,
        description,
        file: res,
        path: pathImage,
      });
      if (category) {
        return NextResponse.json({ message: "ساخته شد" }, { status: 201 });
      }
      // else {
      // }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
    }
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir, { recursive: true });
    // }
    // // بررسی کنید که res یک Buffer است
    // if (Buffer.isBuffer(res)) {
    //   // ساخت فایل عکس ها
    //   fs.writeFileSync(pathImage, res);
    // } else {
    //   console.error("Output is not a Buffer:", res);
    // }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, res) {
  connectDB();
  // const { searchParams } = new URL(req.url);

  // const userData = await whoAreYou(req);
  // if (!userData) {
  //   return NextResponse.json(
  //     { message: "مشکلی در احراز هویت به وجود آمده" },
  //     { status: 401 }
  //   );
  // }
  // if (userData.role === "sales-manager") {
  //   let count = searchParams.get("count");

  //   if (count) {
  //     let countData = await Order.find({})
  //       .count()
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     return NextResponse.json({ countData });
  //   }

  //   const fourOrder = searchParams.get("fourOrder");
  //   if (fourOrder) {
  //     const order = await Order.find({ status: 0 }, "-__v")
  //       .populate("user_id", "-__v")
  //       .lean()
  //       .sort({ createdAt: -1 })
  //       .limit(4)
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     return NextResponse.json(order);
  //   }

  //   const perPage = searchParams.get("perPage");
  //   const page = searchParams.get("page");

  //   const order = await Order.find({}, "-__v")
  //     .populate("user_id", "-__v")
  //     .lean()
  //     .sort({ createdAt: -1 })
  //     .limit(perPage ? perPage : 5)
  //     .skip(perPage && page ? perPage * (page - 1) : 0)
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return NextResponse.json(order);
  // }

  // let count = searchParams.get("count");

  // if (count) {
  //   let countData = await Order.find({ user_id: userData._id })
  //     .count()
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return NextResponse.json({ countData });
  // }

  // const fourOrder = searchParams.get("fourOrder");
  // if (fourOrder) {
  //   const order = await Order.find({ user_id: userData._id, status: 0 }, "-__v")
  //     .populate("user_id", "-__v")
  //     .lean()
  //     .sort({ createdAt: -1 })
  //     .limit(4)
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return NextResponse.json(order);
  // }

  // const perPage = searchParams.get("perPage");
  // const page = searchParams.get("page");

  const category = await Category.find({}, "-__v")
    // .populate("user_id", "-__v")
    // .lean()
    // .sort({ createdAt: -1 })
    // .limit(perPage ? perPage : 5)
    // .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });
 
    const imageData = category.map((e) => {
      
      const imageBuffer = Buffer.from(e.file, "base64");
      // Convert buffer to base64 string
      const base64Image = imageBuffer.toString('base64');
      // Return the data along with a unique identifier or filename if necessary
      return {
        fileName: `uploaded_image_${Date.now()}.webp`, // For reference
        imageBase64: base64Image
      };
    });

    // Return the image data in JSON format
    return NextResponse.json({ data: imageData });

  //   fs.readdir("/public/backendImage", (err, files) => {
  //     if (err) {
  //       console.error('Error reading folder:', err);
  //       return;
  //     }

  //     files.forEach(file => {
  //       const filePath = path.join("/public/backendImage", file);
  //       fs.unlink(filePath, err => {
  //         if (err) {
  //           console.error(`Error deleting file ${filePath}:`, err);
  //         } else {
  //           console.log(`Deleted file: ${filePath}`);
  //         }
  //       });
  //     });
  //   });

  // const newCategory = category.map((e) => {
  //   const buffer = Buffer.from(e.file, "base64");

  //   const filename = `public/backendImage/output_${Date.now()}.jpg`;

  //   sharp(buffer).toFile(`${filename}`, (err, info) => {
  //     if (err) {
  //       console.error("Error writing the image:", err);
  //     } else {
  //       console.log('Image saved successfully!', info);
  //       return NextResponse.json(info);
  //     }
  //   });
  // });

  // return NextResponse.json({ message: 'Images processed successfully', data: processedImages });

  // const files = await readdir("./public/backendImage/");

  // const base64 = fs.readFileSync(category[0].file, "base64");

  // console.log(order)
}
