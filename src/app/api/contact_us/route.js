import Category from "@/src/models/Category";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import MessageModel from "@/src/models/MessageModel";

// import { whoAreYou } from "@/src/utils/Backend/auth";
// import moment from "jalali-moment";

export async function POST(req, res) {
  try {
    connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const route = formData.get("route");

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
      return NextResponse.json({ success: false , message: "ارور ناشناخته" }, { status: 500 });
    }

  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, res) {
  connectDB();
  const { searchParams } = new URL(req.url);

 
  const perPage = searchParams.get("per_page");
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  let query = {};

  if (search && search.trim() !== "") {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
  }

  let countData = await MessageModel.countDocuments(query).catch((err) => {
    console.log(err);
  });

  const category = await MessageModel.find(query, "-__v")

    .sort({ createdAt: -1 })
    .limit(perPage ? perPage : 20)
    .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });

  // Return the image data in JSON format
  return NextResponse.json({ results: category, total_items: countData });

}
