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

    const { searchParams } = new URL(req.url);

    let gallery = searchParams.get("gallery");

    if (gallery) {
      const category = await Product.find({ id_Product: id }, "-__v").catch(
        (err) => {
          console.log(err);
        }
      );

      const imageData = category.map((ducomentProduct) => {
        const imageTransfer = ducomentProduct.file.map((e) => {
          const thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
          const thumbnailBase64 = thumbnailBuffer.toString("base64");
          return {
            fileName: `uploaded_image_${Date.now()}.webp`, // For reference
            thumbnailBase64: thumbnailBase64,
          };
        });
        const newArr = imageTransfer.filter(
          (item) => item !== null && typeof item !== "undefined"
        );

        return {
          image_gallery: newArr,
        };
      });
      return NextResponse.json({ data: imageData });
    }

    let related = searchParams.get("related");

    if (related) {
      let routeCategory = searchParams.get("routeCategory");
      const category = await Product.find(
        {
          routeCategory,
          id_Product: { $ne: id }, // اضافه کردن فیلتر برای id_Product
        },
        "-__v"
      )
        .limit(10)
        .catch((err) => {
          console.log(err);
        });

      let relatedArray = [...category]; // مقداردهی اولیه به relatedArray

      if (category.length < 5) {
        const remainingProductsCount = 5 - category.length;
        // جمع آوری IDs محصولاتی که در نتایج اولیه وجود دارند
        const existingProductIds = category.map((product) => product._id);
        const randomProducts = await Product.aggregate([
          {
            $match: {
              routeCategory: { $ne: routeCategory },
              _id: { $nin: existingProductIds },
              id_Product: { $ne: id }, // اضافه کردن فیلتر برای id_Product
            },
          },
          { $sample: { size: remainingProductsCount } }, // انتخاب تصادفی
          { $project: { __v: 0, } }, // حذف فیلد __v و id_Product
        ]);
        // ترکیب داده‌های اولیه با داده‌های تصادفی
        relatedArray = [...category, ...randomProducts];
      }
      const imageData = relatedArray.map((ducomentProduct) => {
        const imageTransfer = ducomentProduct.file.map((e) => {
          if (ducomentProduct.indexMainImage === e.index) {
            let thumbnailBase64;
            if (Buffer.isBuffer(e.thumbnail)) {
              console.log("e.thumbnail is a Buffer.");
              thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
              thumbnailBase64 = thumbnailBuffer.toString("base64");
            } else {
              thumbnailBase64 = e.thumbnail.toString("base64");
            }
            return {
              fileName: `uploaded_image_${Date.now()}.webp`, // For reference
              thumbnailBase64: thumbnailBase64,
            };
          }
        });
        const newArr = imageTransfer.filter(
          (item) => item !== null && typeof item !== "undefined"
        );
        console.log(ducomentProduct);
        return {
          newArr,
          title: ducomentProduct.title,
          subtitle: ducomentProduct.subtitle,
          id: ducomentProduct.id_Product,
          routeCategory: ducomentProduct.routeCategory,
        };
      });
      return NextResponse.json({ data: imageData });
    }

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
        index: e.index,
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
    }, 0);

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

          return {
            thumbnail: res,
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
        return NextResponse.json(
          { success: true, message: "ادیت شد" },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, message: "ارور ناشناخته" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err); // خطاها را نمایش دهید
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;

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
    return NextResponse.json(
      { success: false, message: "محصول حدف نشد" },
      { status: 400 }
    );
  }
}
