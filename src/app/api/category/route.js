import Category from "@/src/models/Category";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";

const sharp = require("sharp");

export async function POST(req, res) {
  try {
    connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const route = formData.get("route");
    let data = await Category.findOne({ route: route }, "").catch((err) => {
      console.log(err);
    });
    if (data) {
      return NextResponse.json({ success: false, message: "این route قبلا ثبت شده" }, { status: 400 });

    }
    const file = formData.get("file");
    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    try {
      const res = await sharp(buffer)
        .resize(500, 500)
        .webp({ lossless: true, quality: 60, alphaQuality: 80, force: true })
        .toBuffer();

      // const buffer = fs.readFileSync(file.file.path);
      const category = await Category.create({
        title,
        description,
        route,
        file: res,
      });
      if (category) {
        return NextResponse.json({ success: true , message: "ساخته شد" }, { status: 201 });
      }
      // else {
      // }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ success: false  , message: "ارور ناشناخته" }, { status: 500 });
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, res) {
  connectDB();
  const { searchParams } = new URL(req.url);

  // }
  let listCategory = searchParams.get("listCategory");
  if (listCategory) {
    let data = await Category.find({}, "title route _id").catch((err) => {
      console.log(err);
    });
    return NextResponse.json({ data });
  }

  let allId = searchParams.get("allId");
  if (allId) {
    let data = await Category.find({}, "_id title").catch((err) => {
      console.log(err);
    });
    return NextResponse.json({ data });
  }

  let count = searchParams.get("count");
  if (count) {
    let countData = await Category.countDocuments().catch((err) => {
      console.log(err);
    });

    return NextResponse.json({ countData });
  }

  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");

  const category = await Category.find({}, "-__v")

    .limit(perPage ? perPage : 20)
    .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });
  let newArray = [];
  const imageData = category.map((e) => {
    const imageBuffer = Buffer.from(e.file, "base64");
    // Convert buffer to base64 string
    const base64Image = imageBuffer.toString("base64");
    // Return the data along with a unique identifier or filename if necessary
    let object = {
      fileName: `uploaded_image_${Date.now()}.webp`, // For reference
      imageBase64: base64Image,
      title: e.title,
      description: e.description,
      route: e.route,
      id: e.id_Category,
    };
    newArray.push(object);
  });
  // Return the image data in JSON format
  return NextResponse.json({ data: newArray });
}
