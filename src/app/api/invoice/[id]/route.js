import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Invoice from "@/src/models/Invoice";
import Product from "@/src/models/Product";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const id = params.id;

    connectDB();
    const updateTicket = await Invoice.findOneAndUpdate(
      { id_Invoice: id },
      body
    ).catch((err) => {
      console.log(err);
    });

    if (updateTicket) {
      return NextResponse.json({
        message: "پیام با موفقیت ادیت شد",
        success: true,
        results: updateTicket,
      });
    } else {
      return NextResponse.json(
        { message: "پیام ادیت نشد", success: false },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function GET(req, { params }) {
  connectDB();

  const id = params.id;

  const findOneTicket = await Invoice.find({ id_Invoice: id }, "-__v").catch(
    (err) => {
      console.log(err);
    }
  );

  const arrayInvoice = [];

  // استفاده از promises
  const promises = findOneTicket[0].invoice.map(async (value) => {
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

      obj.feature = value.feature;
      obj.title = oneProduct.title;
      obj.id = oneProduct.id_Product;
      obj.subtitle = oneProduct.subtitle;
      obj.route = oneProduct.routeCategory;
      obj.image = newArr[0]?.thumbnailBase64;
      arrayInvoice.push(obj);
    }
  });

  // انتظار برای اتمام همه promises
  await Promise.all(promises);

  if (findOneTicket) {
    return NextResponse.json({
      success: true,
      results: findOneTicket,
      product: arrayInvoice,
    });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Return the image data in JSON format
}

export async function DELETE(req, { params }) {
  try {
    connectDB();
    const id = params.id;

    const DeleteMessage = await Invoice.findOneAndDelete({
      id_Invoice: id,
    }).catch((err) => {
      console.log(err);
    });

    if (DeleteMessage) {
      return NextResponse.json({
        message: "پیام با موفقیت حذف شد",
        success: true,
      });
    } else {
      return NextResponse.json(
        { message: "پیام حدف نشد", success: false },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}
