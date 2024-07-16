// import time_date from "@/utils/time-date";
// import Order from "@/models/order";
import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";
// import { whoAreYou } from "@/src/utils/Backend/auth";
// import moment from "jalali-moment";

export async function POST(req, res) {
  try {
    connectDB();
    return NextResponse.json({message:"سلام "});

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

//     const order = await Order.create({
//       nameOfSeller,
//       address,
//       amount,
//       product,
//       deliveryTime,
//       user_id: userData._id,
//       time: timeAndDate.output,
//       createdDate: timeAndDate.dateJalali,
//     });
//     if (order) {
//       return NextResponse.json({ message: "ساخته شد" }, { status: 201 });
//     } else {
    // }
  } catch(err) {
    console.log(err)
    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }
}

// export async function GET(req, res) {
//   connectDB();
//   const { searchParams } = new URL(req.url);

//   const userData = await whoAreYou(req);
//   if (!userData) {
//     return NextResponse.json(
//       { message: "مشکلی در احراز هویت به وجود آمده" },
//       { status: 401 }
//     );
//   }
//   if (userData.role === "sales-manager") {
//     let count = searchParams.get("count");

//     if (count) {
//       let countData = await Order.find({})
//         .count()
//         .catch((err) => {
//           console.log(err);
//         });

//       return NextResponse.json({ countData });
//     }

//     const fourOrder = searchParams.get("fourOrder");
//     if (fourOrder) {
//       const order = await Order.find({ status: 0 }, "-__v")
//         .populate("user_id", "-__v")
//         .lean()
//         .sort({ createdAt: -1 })
//         .limit(4)
//         .catch((err) => {
//           console.log(err);
//         });

//       return NextResponse.json(order);
//     }

//     const perPage = searchParams.get("perPage");
//     const page = searchParams.get("page");

//     const order = await Order.find({}, "-__v")
//       .populate("user_id", "-__v")
//       .lean()
//       .sort({ createdAt: -1 })
//       .limit(perPage ? perPage : 5)
//       .skip(perPage && page ? perPage * (page - 1) : 0)
//       .catch((err) => {
//         console.log(err);
//       });

//     return NextResponse.json(order);
//   }

//   let count = searchParams.get("count");

//   if (count) {
//     let countData = await Order.find({ user_id: userData._id })
//       .count()
//       .catch((err) => {
//         console.log(err);
//       });

//     return NextResponse.json({ countData });
//   }

//   const fourOrder = searchParams.get("fourOrder");
//   if (fourOrder) {
//     const order = await Order.find({ user_id: userData._id, status: 0 }, "-__v")
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

//   const order = await Order.find({ user_id: userData._id }, "-__v")
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
