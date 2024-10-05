import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Product from "@/src/models/Product";

export async function DELETE(req, { params }) {
  try {
    connectDB()
    const id = params.id;
    const id_image = params.id;

    return NextResponse.json(
      { message: "عکس محصول با موفقیت حذف شد", success: true, id_image, id },
      { status: 200 }
    );

    const DeleteProduct = await Product.findOneAndDelete({
      id_Product: id,
    }).catch((err) => {
      console.log(err);
    });

    if (DeleteProduct) {
      return NextResponse.json(
        { message: "محصول با موفقیت حذف شد", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "محصول حدف نشد" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
