"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _Blog = _interopRequireDefault(require("@/src/models/Blog"));

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _Category = _interopRequireDefault(require("@/src/models/Category"));

var _Product = _interopRequireDefault(require("@/src/models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(req, res) {
  var _ref, searchParams, q, navbar, searchCategory, searchProduct, perPage, page, brand, arrayInvoice, queryConditions, _searchProduct, searchCountProduct, threeData, _blog, _imageData, count, countData, blog, imageData;

  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _db["default"])();
          _ref = new URL(req.url), searchParams = _ref.searchParams;
          q = searchParams.get("q");
          navbar = searchParams.get("navbar"); // const searchBlog = await Blog.find(
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

          if (!navbar) {
            _context.next = 12;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(_Category["default"].find({
            $or: [{
              title: {
                $regex: q,
                $options: "i"
              }
            }, // جستجو در عنوان
            {
              description: {
                $regex: q,
                $options: "i"
              }
            } // جستجو در زیرعنوان
            ]
          }, "-__v").sort({
            createdAt: -1
          }).limit(3)["catch"](function (err) {
            console.log(err);
          }));

        case 7:
          searchCategory = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(_Product["default"].find({
            $or: [{
              title: {
                $regex: q,
                $options: "i"
              }
            }, // جستجو در عنوان
            {
              subtitle: {
                $regex: q,
                $options: "i"
              }
            } // جستجو در زیرعنوان
            ]
          }, "-__v").sort({
            createdAt: -1
          }).limit(3)["catch"](function (err) {
            console.log(err);
          }));

        case 10:
          searchProduct = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            // blog: searchBlog,
            category: searchCategory,
            product: searchProduct
          }));

        case 12:
          perPage = searchParams.get("perPage");
          page = searchParams.get("page");

          if (!q) {
            _context.next = 28;
            break;
          }

          brand = searchParams.get("brand");
          arrayInvoice = [];
          queryConditions = {
            $or: [{
              title: {
                $regex: q,
                $options: "i"
              }
            }, // جستجو در عنوان
            {
              subtitle: {
                $regex: q,
                $options: "i"
              }
            } // جستجو در زیرعنوان
            ]
          }; // اگر برند وجود داشته باشد، شرط آن را اضافه می‌کنیم

          if (brand && brand !== null && brand !== "undefined") {
            queryConditions.brand = brand; // فرض می‌کنیم در مدل Product یک فیلد به نام brand دارید
          }

          _context.next = 21;
          return regeneratorRuntime.awrap(_Product["default"].find(queryConditions, "-__v").sort({
            createdAt: -1
          }).limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 21:
          _searchProduct = _context.sent;
          console.log(_searchProduct);

          _searchProduct.map(function (e, i) {
            var obj = {};
            e.file.map(function (fileMap) {
              if (e.indexMainImage === fileMap.index) {
                var thumbnailBuffer = Buffer.from(fileMap.thumbnail, "base64");
                var thumbnailBase64 = thumbnailBuffer.toString("base64");
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

          _context.next = 26;
          return regeneratorRuntime.awrap(_Product["default"].countDocuments({
            $or: [{
              title: {
                $regex: q,
                $options: "i"
              }
            }, // جستجو در عنوان
            {
              subtitle: {
                $regex: q,
                $options: "i"
              }
            } // جستجو در زیرعنوان
            ]
          })["catch"](function (err) {
            console.log(err);
          }));

        case 26:
          searchCountProduct = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            product: arrayInvoice,
            total_item: searchCountProduct
          }));

        case 28:
          return _context.abrupt("return", _server.NextResponse.json({
            product: [],
            total_item: 0
          }));

        case 33:
          _blog = _context.sent;
          _imageData = _blog.map(function (ducomentProduct) {
            var thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");
            var thumbnailBase64 = thumbnailBuffer.toString("base64");
            return {
              image: thumbnailBase64,
              title: ducomentProduct.title,
              id: ducomentProduct.id_Blog,
              subtitle: ducomentProduct.subtitle,
              updatedAt: ducomentProduct.updatedAt
            };
          });
          return _context.abrupt("return", _server.NextResponse.json({
            data: _imageData
          }));

        case 36:
          count = searchParams.get("count");

          if (!count) {
            _context.next = 42;
            break;
          }

          _context.next = 40;
          return regeneratorRuntime.awrap(_Blog["default"].countDocuments()["catch"](function (err) {
            console.log(err);
          }));

        case 40:
          countData = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            countData: countData
          }));

        case 42:
          _context.next = 44;
          return regeneratorRuntime.awrap(_Blog["default"].find({}, "-__v")["catch"](function (err) {
            console.log(err);
          }));

        case 44:
          blog = _context.sent;
          imageData = blog.map(function (ducomentProduct) {
            var thumbnailBuffer = Buffer.from(ducomentProduct.file, "base64");
            var thumbnailBase64 = thumbnailBuffer.toString("base64");
            return {
              image: thumbnailBase64,
              title: ducomentProduct.title,
              id: ducomentProduct.id_Blog,
              subtitle: ducomentProduct.subtitle,
              updatedAt: ducomentProduct.updatedAt
            };
          });
          return _context.abrupt("return", _server.NextResponse.json({
            data: imageData
          }));

        case 47:
        case "end":
          return _context.stop();
      }
    }
  });
}