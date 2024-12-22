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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function GET(req, res) {
  var _ref, searchParams, q, navbar, _queryConditions, queryConditionsProduct, searchCategory, _searchProduct, brand, Category2, perPage, page, arrayInvoice, queryConditions, searchProduct, searchCountProduct, threeData, _blog, _imageData, count, countData, blog, imageData;

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
            _context.next = 14;
            break;
          }

          _queryConditions = _objectSpread({}, q && {
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
          });
          queryConditionsProduct = _objectSpread({}, q && {
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
            }, // جستجو در زیرعنوان
            {
              codeProduct: {
                $elemMatch: {
                  code: {
                    $regex: q,
                    $options: "i"
                  }
                }
              }
            }]
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(_Category["default"].find(_queryConditions, "-__v").sort({
            createdAt: -1
          }).limit(3)["catch"](function (err) {
            console.log(err);
          }));

        case 9:
          searchCategory = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_Product["default"].find(queryConditionsProduct, "-__v").sort({
            createdAt: -1
          }).limit(3)["catch"](function (err) {
            console.log(err);
          }));

        case 12:
          _searchProduct = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            // blog: searchBlog,
            category: searchCategory,
            product: _searchProduct
          }));

        case 14:
          brand = searchParams.get("brand");
          Category2 = searchParams.get("Category");

          if (!((!brand || brand == "undefined") && (!Category2 || Category2 == "undefined") && (!q || q == "undefined"))) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            product: [],
            total_item: 0
          }));

        case 18:
          perPage = searchParams.get("perPage");
          page = searchParams.get("page");
          arrayInvoice = [];
          queryConditions = _objectSpread({}, q && {
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
            }, // جستجو در زیرعنوان
            {
              codeProduct: {
                $elemMatch: {
                  code: {
                    $regex: q,
                    $options: "i"
                  }
                }
              }
            }]
          }); // اگر برند وجود داشته باشد، شرط آن را اضافه می‌کنیم

          if (brand && brand !== null && brand !== "undefined") {
            queryConditions.brand = brand; // فرض می‌کنیم در مدل Product یک فیلد به نام brand دارید
          }

          if (Category2 && Category2 !== null && Category2 !== "undefined") {
            queryConditions.routeCategory = Category2; // فرض می‌کنیم در مدل Product یک فیلد به نام brand دارید
          }

          _context.next = 26;
          return regeneratorRuntime.awrap(_Product["default"].find(queryConditions, "-__v").sort({
            createdAt: -1
          }).limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 26:
          searchProduct = _context.sent;
          searchProduct.map(function (e, i) {
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
          _context.next = 30;
          return regeneratorRuntime.awrap(_Product["default"].countDocuments(queryConditions)["catch"](function (err) {
            console.log(err);
          }));

        case 30:
          searchCountProduct = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            product: arrayInvoice,
            total_item: searchCountProduct
          }));

        case 36:
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

        case 39:
          count = searchParams.get("count");

          if (!count) {
            _context.next = 45;
            break;
          }

          _context.next = 43;
          return regeneratorRuntime.awrap(_Blog["default"].countDocuments()["catch"](function (err) {
            console.log(err);
          }));

        case 43:
          countData = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            countData: countData
          }));

        case 45:
          _context.next = 47;
          return regeneratorRuntime.awrap(_Blog["default"].find({}, "-__v")["catch"](function (err) {
            console.log(err);
          }));

        case 47:
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

        case 50:
        case "end":
          return _context.stop();
      }
    }
  });
}