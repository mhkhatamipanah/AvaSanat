import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Product from "@/src/models/Product";
const mongoose = require("mongoose");


export async function POST(req, { params }) {
    try {
      connectDB();
  
      const id = params.id;
      
      
      const pdfDownload = await Product.findOne({ id_Product: id }, "-__v").catch(
        (err) => {
          console.log(err);
        }
      );
      if (!pdfDownload || !pdfDownload.pdfFile) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

        // تبدیل فایل PDF به base64
  const base64File = pdfDownload.pdfFile.toString("base64");

  return NextResponse.json({
    success: true,
    message: "دانلود موفق",
    fileName: pdfDownload.pdfFileName || `${id}.pdf`,
    fileData: base64File,
  });
    //   const fileName = pdfDownload.pdfFileName || `${id}.pdf`;

      
    //   const encodedFileName = encodeURIComponent(fileName);
    //  // ارسال فایل به فرانت‌اند به صورت باینری
    //  const response = new Response(pdfDownload.pdfFile, {
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": `inline; filename*=UTF-8''${encodedFileName}`, 
    //     "X-Success": "true",
    //     "X-Message": "دانلود موفق", // پیغام موفقیت
    //     "X-File-Name": encodedFileName, // اضافه کردن نام فایل به هدر
    //   },
    // });

    // return response;
    
    } catch (err) {
      console.error(err); // خطاها را نمایش دهید
    }
  }
  

  
export async function PUT(req, { params }) {
  try {
    connectDB();

    const id = params.id;
    
    
    const pdfDownload = await Product.findOneAndUpdate({ id_Product: id }, {pdfFile: null , pdfFileName: null}).catch(
      (err) => {
        console.log(err);
      }
    );
 if(pdfDownload){
  return NextResponse.json({  success: true , message: "فایل با موفقیت حذف شد" }, { status: 200 });
  
 }
  
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}
