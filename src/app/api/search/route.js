import Blog from "@/src/models/Blog";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import Category from "@/src/models/Category";
import Product from "@/src/models/Product";

export async function GET(req, res) {
  connectDB();

  const { searchParams } = new URL(req.url);

  let q = searchParams.get("q");
  let navbar = searchParams.get("navbar");

  // const searchBlog = await Blog.find(
  //   {
  //     $or: [
  //       { title: { $regex: q, $options: "i" } }, // جستجو در عنوان
  //       { subtitle: { $regex: q, $options: "i" } }, // جستجو در زیرعنوان
  //     ],
  //   },
  //   "-__v"
  // )
  //   .sort({ createdAt: -1 })
  //   .limit(3)
  //   .catch((err) => {
  //     console.log(err);
  //   });
  if (navbar) {
    const searchCategory = await Category.find(
      {
        $or: [
          { title: { $regex: q, $options: "i" } }, // جستجو در عنوان
          { description: { $regex: q, $options: "i" } }, // جستجو در زیرعنوان
        ],
      },
      "-__v"
    )
      .sort({ createdAt: -1 })
      .limit(3)
      .catch((err) => {
        console.log(err);
      });

    const searchProduct = await Product.find(
      {
        $or: [
          { title: { $regex: q, $options: "i" } }, // جستجو در عنوان
          { subtitle: { $regex: q, $options: "i" } }, // جستجو در زیرعنوان
        ],
      },
      "-__v"
    )
      .sort({ createdAt: -1 })
      .limit(3)
      .catch((err) => {
        console.log(err);
      });

    return NextResponse.json({
      // blog: searchBlog,
      category: searchCategory,
      product: searchProduct,
    });
  }

  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");

  if (q) {
    let brand = searchParams.get("brand");


    const arrayInvoice = [];

    const queryConditions = {
      $or: [
        { title: { $regex: q, $options: "i" } }, // جستجو در عنوان
        { subtitle: { $regex: q, $options: "i" } }, // جستجو در زیرعنوان
      ],
    };

    // اگر برند وجود داشته باشد، شرط آن را اضافه می‌کنیم
    if (brand && brand!==null && brand !== "undefined") {
      queryConditions.brand = brand; // فرض می‌کنیم در مدل Product یک فیلد به نام brand دارید
    }

    const searchProduct = await Product.find(queryConditions, "-__v")
      .sort({ createdAt: -1 })
      .limit(perPage ? perPage : 20)
      .skip(perPage && page ? perPage * (page - 1) : 0)
      .catch((err) => {
        console.log(err);
      });
console.log(searchProduct)
    searchProduct.map((e, i) => {
      const obj = {};
      e.file.map((fileMap) => {
        if (e.indexMainImage === fileMap.index) {
          const thumbnailBuffer = Buffer.from(fileMap.thumbnail, "base64");
          const thumbnailBase64 = thumbnailBuffer.toString("base64");
          obj.image = thumbnailBase64;
        }
      });
      obj.feature = e.feature;
      obj.title = e.title;
      obj.id = e.id_Product;
      obj.subtitle = e.subtitle;
      obj.route = e.routeCategory;
      arrayInvoice.push(obj);
    });
    const searchCountProduct = await Product.countDocuments({
      $or: [
        { title: { $regex: q, $options: "i" } }, // جستجو در عنوان
        { subtitle: { $regex: q, $options: "i" } }, // جستجو در زیرعنوان
      ],
    }).catch((err) => {
      console.log(err);
    });

    return NextResponse.json({
      product: arrayInvoice,
      total_item: searchCountProduct,
    });
  }

  return NextResponse.json({
    product: [],
    total_item: 0,
  });

  let threeData = searchParams.get("threeData");
  if (threeData) {
    const blog = await Blog.find({}, "-__v")
      .limit(perPage ? perPage : 20)
      .skip(perPage && page ? perPage * (page - 1) : 0)
      .sort({ createdAt: -1 })
      .catch((err) => {
        console.log(err);
      });

    const imageData = blog.map((ducomentProduct) => {
      const thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");

      const thumbnailBase64 = thumbnailBuffer.toString("base64");
      return {
        image: thumbnailBase64,
        title: ducomentProduct.title,
        id: ducomentProduct.id_Blog,
        subtitle: ducomentProduct.subtitle,
        updatedAt: ducomentProduct.updatedAt,
      };
    });
    return NextResponse.json({ data: imageData });
  }

  let count = searchParams.get("count");
  if (count) {
    let countData = await Blog.countDocuments().catch((err) => {
      console.log(err);
    });

    return NextResponse.json({ countData });
  }

  const blog = await Blog.find({}, "-__v").catch((err) => {
    console.log(err);
  });

  const imageData = blog.map((ducomentProduct) => {
    const thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");

    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    return {
      image: thumbnailBase64,
      title: ducomentProduct.title,
      id: ducomentProduct.id_Blog,
      subtitle: ducomentProduct.subtitle,
      updatedAt: ducomentProduct.updatedAt,
    };
  });
  return NextResponse.json({ data: imageData });
}
