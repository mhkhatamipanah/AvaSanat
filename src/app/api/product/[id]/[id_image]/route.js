import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Product from "@/src/models/Product";

export async function DELETE(req, { params }) {
  try {
    connectDB();
    const id = params.id;
    const id_image = params.id_image;
    const findProduct = await Product.findOne({
      id_Product: id,
    }).catch((err) => {
      console.log(err);
    });

    let updatedArrayImmages = [...findProduct.file];

    // حذف عنصر از آرایه‌ها
    updatedArrayImmages.splice(id_image, 1);

    const updateProduct = await Product.findOneAndUpdate(
      {
        id_Product: id,
      },
      {
        file: updatedArrayImmages,
      }
    ).catch((err) => {
      console.log(err);
    });
    if (updateProduct) {
      return NextResponse.json(
        { message: "عکس محصول با موفقیت حذف شد", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({success: false, message: "عکس محصول حدف نشد" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({success: false, message: "خطای سرور" }, { status: 500 });
  }
}
