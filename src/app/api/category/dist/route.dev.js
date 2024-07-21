"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.GET = GET;

var _Category = _interopRequireDefault(require("@/src/models/Category"));

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import time_date from "@/utils/time-date";
// import Order from "@/models/order";
var path = require("path"); // import { whoAreYou } from "@/src/utils/Backend/auth";
// import moment from "jalali-moment";


var sharp = require("sharp");

function POST(req, res) {
  var formData, title, description, file, bufferData, buffer, _res, pathImage, dir, category;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          (0, _db["default"])(); //     // Validate User
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

          _context.next = 4;
          return regeneratorRuntime.awrap(req.formData());

        case 4:
          formData = _context.sent;
          title = formData.get("title");
          description = formData.get("description");
          file = formData.get("file");
          _context.next = 10;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 10:
          bufferData = _context.sent;
          buffer = Buffer.from(bufferData);
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(sharp(buffer).resize(500, 500).webp({
            lossless: true,
            quality: 60,
            alphaQuality: 80,
            force: true
          }).toBuffer());

        case 15:
          _res = _context.sent;
          pathImage = "./public/backendImage/".concat(new Date().getTime(), ".", "webp");
          console.log(pathImage);
          dir = path.dirname(pathImage); // const buffer = fs.readFileSync(file.file.path);

          _context.next = 21;
          return regeneratorRuntime.awrap(_Category["default"].create({
            title: title,
            description: description,
            file: _res,
            path: pathImage
          }));

        case 21:
          category = _context.sent;

          if (!category) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "ساخته شد"
          }, {
            status: 201
          }));

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](12);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 30:
          _context.next = 35;
          break;

        case 32:
          _context.prev = 32;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1); // خطاها را نمایش دهید

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 32], [12, 26]]);
}

function GET(req, res) {
  var category, imageData;
  return regeneratorRuntime.async(function GET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _db["default"])(); // const { searchParams } = new URL(req.url);
          // const userData = await whoAreYou(req);
          // if (!userData) {
          //   return NextResponse.json(
          //     { message: "مشکلی در احراز هویت به وجود آمده" },
          //     { status: 401 }
          //   );
          // }
          // if (userData.role === "sales-manager") {
          //   let count = searchParams.get("count");
          //   if (count) {
          //     let countData = await Order.find({})
          //       .count()
          //       .catch((err) => {
          //         console.log(err);
          //       });
          //     return NextResponse.json({ countData });
          //   }
          //   const fourOrder = searchParams.get("fourOrder");
          //   if (fourOrder) {
          //     const order = await Order.find({ status: 0 }, "-__v")
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
          //   const order = await Order.find({}, "-__v")
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
          // let count = searchParams.get("count");
          // if (count) {
          //   let countData = await Order.find({ user_id: userData._id })
          //     .count()
          //     .catch((err) => {
          //       console.log(err);
          //     });
          //   return NextResponse.json({ countData });
          // }
          // const fourOrder = searchParams.get("fourOrder");
          // if (fourOrder) {
          //   const order = await Order.find({ user_id: userData._id, status: 0 }, "-__v")
          //     .populate("user_id", "-__v")
          //     .lean()
          //     .sort({ createdAt: -1 })
          //     .limit(4)
          //     .catch((err) => {
          //       console.log(err);
          //     });
          //   return NextResponse.json(order);
          // }
          // const perPage = searchParams.get("perPage");
          // const page = searchParams.get("page");

          _context2.next = 3;
          return regeneratorRuntime.awrap(_Category["default"].find({}, "-__v") // .populate("user_id", "-__v")
          // .lean()
          // .sort({ createdAt: -1 })
          // .limit(perPage ? perPage : 5)
          // .skip(perPage && page ? perPage * (page - 1) : 0)
          ["catch"](function (err) {
            console.log(err);
          }));

        case 3:
          category = _context2.sent;
          imageData = category.map(function (e) {
            var imageBuffer = Buffer.from(e.file, "base64"); // Convert buffer to base64 string

            var base64Image = imageBuffer.toString('base64'); // Return the data along with a unique identifier or filename if necessary

            return {
              fileName: "uploaded_image_".concat(Date.now(), ".webp"),
              // For reference
              imageBase64: base64Image
            };
          }); // Return the image data in JSON format

          return _context2.abrupt("return", _server.NextResponse.json({
            data: imageData
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}