"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import time_date from "@/utils/time-date";
// import Order from "@/models/order";
// import { whoAreYou } from "@/src/utils/Backend/auth";
// import moment from "jalali-moment";
function POST(req, res) {
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          (0, _db["default"])();
          return _context.abrupt("return", _server.NextResponse.json({
            message: "سلام "
          }));

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // export async function GET(req, res) {
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