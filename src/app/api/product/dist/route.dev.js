"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.GET = GET;

var _Product = _interopRequireDefault(require("@/src/models/Product"));

var _Category = _interopRequireDefault(require("@/src/models/Category"));

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require("mongoose");

var sharp = require("sharp");

function POST(req, res) {
  var formData, title, description, category, urlProduct, objectId, oneCategory, routeCategory, files, i, file, filesArray, product;
  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          (0, _db["default"])();
          _context2.next = 4;
          return regeneratorRuntime.awrap(req.formData());

        case 4:
          formData = _context2.sent;
          title = formData.get("title");
          description = formData.get("description");
          category = formData.get("category");
          urlProduct = formData.get("urlProduct");
          objectId = new mongoose.Types.ObjectId(category);
          _context2.next = 12;
          return regeneratorRuntime.awrap(_Category["default"].findOne({
            _id: category
          }, "-__v")["catch"](function (err) {
            console.log(err);
          }));

        case 12:
          oneCategory = _context2.sent;
          routeCategory = oneCategory.route;
          files = [];

          for (i = 0; i < 20; i++) {
            file = formData.get("file".concat(i));

            if (file) {
              files.push(file);
            }
          }

          _context2.prev = 16;
          _context2.next = 19;
          return regeneratorRuntime.awrap(Promise.all(files.map(function _callee(e, i) {
            var bufferData, buffer, res, res2;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(e.arrayBuffer());

                  case 2:
                    bufferData = _context.sent;
                    buffer = Buffer.from(bufferData);
                    _context.next = 6;
                    return regeneratorRuntime.awrap(sharp(buffer).resize(500, 500).webp({
                      lossless: true,
                      quality: 60,
                      alphaQuality: 80,
                      force: true
                    }).toBuffer());

                  case 6:
                    res = _context.sent;
                    _context.next = 9;
                    return regeneratorRuntime.awrap(sharp(buffer).resize(800, 800) // اندازه تصویر را بزرگتر کنید
                    .webp({
                      lossless: true,
                      // از دست دادن کیفیت را به حداقل برسانید
                      quality: 80,
                      // کیفیت تصویر را بالا ببرید
                      alphaQuality: 90,
                      // کیفیت کانال آلفا را بالا ببرید
                      force: true // تبدیل به فرمت WebP را اجباری کنید

                    }).toBuffer());

                  case 9:
                    res2 = _context.sent;
                    return _context.abrupt("return", {
                      thumbnail: res,
                      mainImage: res2,
                      index: i
                    });

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 19:
          filesArray = _context2.sent;
          _context2.next = 22;
          return regeneratorRuntime.awrap(_Product["default"].create({
            title: title,
            description: description,
            category: objectId,
            file: filesArray,
            routeCategory: routeCategory,
            routeProduct: urlProduct
          }));

        case 22:
          product = _context2.sent;

          if (!product) {
            _context2.next = 25;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            message: "ساخته شد"
          }, {
            status: 201
          }));

        case 25:
          _context2.next = 31;
          break;

        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](16);
          console.log(_context2.t0);
          return _context2.abrupt("return", _server.NextResponse.json({
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 31:
          _context2.next = 36;
          break;

        case 33:
          _context2.prev = 33;
          _context2.t1 = _context2["catch"](0);
          console.error(_context2.t1); // خطاها را نمایش دهید

        case 36:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 33], [16, 27]]);
}

function GET(req, res) {
  var _ref, searchParams, count, countData, perPage, page, filterCategory, _category, _imageData, detailProduct, oneProduct, _imageData2, productObject, category, imageData;

  return regeneratorRuntime.async(function GET$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          (0, _db["default"])();
          _ref = new URL(req.url), searchParams = _ref.searchParams;
          count = searchParams.get("count");

          if (!count) {
            _context3.next = 8;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(_Product["default"].countDocuments()["catch"](function (err) {
            console.log(err);
          }));

        case 6:
          countData = _context3.sent;
          return _context3.abrupt("return", _server.NextResponse.json({
            countData: countData
          }));

        case 8:
          perPage = searchParams.get("perPage");
          page = searchParams.get("page");
          filterCategory = searchParams.get("filterCategory");

          if (!filterCategory) {
            _context3.next = 17;
            break;
          }

          _context3.next = 14;
          return regeneratorRuntime.awrap(_Product["default"].find({
            routeCategory: filterCategory
          }, "-__v").limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 14:
          _category = _context3.sent;
          _imageData = _category.map(function (ducomentProduct) {
            var imageTransfer = ducomentProduct.file.map(function (e) {
              if (ducomentProduct.indexMainImage === e.index) {
                var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
                var thumbnailBase64 = thumbnailBuffer.toString("base64");
                return {
                  fileName: "uploaded_image_".concat(Date.now(), ".webp"),
                  // For reference
                  thumbnailBase64: thumbnailBase64 // mainImageBase64: mainImageBase64,

                };
              }
            });
            var newArr = imageTransfer.filter(function (item) {
              return item !== null && typeof item !== "undefined";
            });
            return {
              newArr: newArr,
              title: ducomentProduct.title,
              description: ducomentProduct.description,
              route: ducomentProduct.routeProduct
            };
          });
          return _context3.abrupt("return", _server.NextResponse.json({
            data: _imageData
          }));

        case 17:
          // detailProduct
          detailProduct = searchParams.get("detailProduct");

          if (!detailProduct) {
            _context3.next = 26;
            break;
          }

          _context3.next = 21;
          return regeneratorRuntime.awrap(_Product["default"].findOne({
            routeProduct: detailProduct
          }, "-__v -createdAt -updatedAt")["catch"](function (err) {
            console.log(err);
          }));

        case 21:
          oneProduct = _context3.sent;
          _imageData2 = oneProduct.file.map(function (e) {
            if (oneProduct.indexMainImage === e.index) {
              var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
              var thumbnailBase64 = thumbnailBuffer.toString("base64");
              return {
                fileName: "uploaded_image_".concat(Date.now(), ".webp"),
                // For reference
                thumbnailBase64: thumbnailBase64 // mainImageBase64: mainImageBase64,

              };
            }
          });
          productObject = oneProduct.toObject();
          delete productObject.file; // const newArr = imageTransfer.filter(
          //   (item) => item !== null && typeof item !== "undefined"
          // );

          return _context3.abrupt("return", _server.NextResponse.json({
            data: productObject,
            file: _imageData2
          }));

        case 26:
          _context3.next = 28;
          return regeneratorRuntime.awrap(_Product["default"].find({}, "-__v") // .populate("category", "-__v")
          // .lean()
          // .sort({ createdAt: -1 })
          .limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 28:
          category = _context3.sent;
          imageData = category.map(function (ducomentProduct) {
            var imageTransfer = ducomentProduct.file.map(function (e) {
              if (ducomentProduct.indexMainImage === e.index) {
                var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
                var thumbnailBase64 = thumbnailBuffer.toString("base64");
                return {
                  fileName: "uploaded_image_".concat(Date.now(), ".webp"),
                  // For reference
                  thumbnailBase64: thumbnailBase64 // mainImageBase64: mainImageBase64,

                };
              }
            });
            var newArr = imageTransfer.filter(function (item) {
              return item !== null && typeof item !== "undefined";
            });
            return {
              newArr: newArr,
              title: ducomentProduct.title,
              description: ducomentProduct.description
            };
          });
          return _context3.abrupt("return", _server.NextResponse.json({
            data: imageData
          }));

        case 31:
        case "end":
          return _context3.stop();
      }
    }
  });
}