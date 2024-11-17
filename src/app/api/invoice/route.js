import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Product from "@/src/models/Product";
import Invoice from "@/src/models/Invoice";

export async function POST(req, res) {
  try {
    connectDB();
    const body = await req.json();

    if(body){
      const arrayInvoice = [];
      // استفاده از promises
      const promises = Object.entries(body).map(async ([key, value]) =>  {
        const obj = {};
        const oneProduct = await Product.findOne(
          { id_Product: value.id },
          "-__v -createdAt -updatedAt"
        ).catch((err) => {
          console.log(err);
        });
  
       
        if (oneProduct) {
          const imageData = oneProduct.file.map((e) => {
            if (oneProduct.indexMainImage === e.index) {
              const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
              const thumbnailBase64 = thumbnailBuffer.toString("base64");
              return {
                thumbnailBase64: thumbnailBase64,
              };
            }
          });
          const newArr = imageData.filter(
            (item) => item !== null && typeof item !== "undefined"
          );
          {console.log()}
  
          obj.key = key
          obj.feature =JSON.parse(value.quantity).feature
          obj.title = oneProduct.title;
          obj.id = key;
          obj.subtitle = oneProduct.subtitle;
          obj.route = oneProduct.routeCategory;
          obj.image = newArr[0]?.thumbnailBase64;
          arrayInvoice.push(obj);
        }
      });
  
      // انتظار برای اتمام همه promises
      await Promise.all(promises);
      return NextResponse.json({  success: true , data: arrayInvoice });
    }else{
      return NextResponse.json({ success: false, data: [] });

    }
  
  } catch (err) {
    console.error(err);
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
        // { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
  }

  let countData = await Invoice.countDocuments(query).catch((err) => {
    console.log(err);
  });

  const category = await Invoice.find(query, "-__v")

    .sort({ createdAt: -1 })
    .limit(perPage ? perPage : 20)
    .skip(perPage && page ? perPage * (page - 1) : 0)
    .catch((err) => {
      console.log(err);
    });

  return NextResponse.json({ results: category, total_items: countData });
}
