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

var _BufferPdf = require("@/src/utils/Backend/BufferPdf/BufferPdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var sharp = require("sharp");

function POST(req, res) {
  var formData, feature, featureData, specifications, specificationsData, title, description, subtitle, brand, category, indexMainImage, pdfFile, objectId, oneCategory, routeCategory, titleCategory, pdfBuffer, files, i, file, filesArray, product;
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
          feature = formData.get("feature");
          featureData = JSON.parse(feature);
          specifications = formData.get("specifications");
          specificationsData = JSON.parse(specifications);
          title = formData.get("title");
          description = formData.get("description");
          subtitle = formData.get("subtitle");
          brand = formData.get("brand");
          category = formData.get("category");
          indexMainImage = formData.get("indexMainImage");
          pdfFile = formData.get("pdfFile");
          console.log(pdfFile.name);
          objectId = new mongoose.Types.ObjectId(category);
          _context2.next = 20;
          return regeneratorRuntime.awrap(_Category["default"].findOne({
            _id: category
          }, "-__v")["catch"](function (err) {
            console.log(err);
          }));

        case 20:
          oneCategory = _context2.sent;
          routeCategory = oneCategory.route;
          titleCategory = oneCategory.title;

          if (!pdfFile) {
            _context2.next = 28;
            break;
          }

          _context2.next = 26;
          return regeneratorRuntime.awrap((0, _BufferPdf.handlePdfBuffer)(pdfFile));

        case 26:
          pdfBuffer = _context2.sent;
          console.log(pdfBuffer);

        case 28:
          files = [];

          for (i = 0; i < 20; i++) {
            file = formData.get("file".concat(i));

            if (file) {
              files.push(file);
            }
          }

          _context2.prev = 30;
          _context2.next = 33;
          return regeneratorRuntime.awrap(Promise.all(files.map(function _callee(e, i) {
            var bufferData, buffer, res;
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
                    return _context.abrupt("return", {
                      thumbnail: res,
                      index: i
                    });

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 33:
          filesArray = _context2.sent;
          _context2.next = 36;
          return regeneratorRuntime.awrap(_Product["default"].create(_objectSpread({
            title: title,
            subtitle: subtitle,
            description: description,
            brand: brand,
            category: objectId,
            file: filesArray,
            routeCategory: routeCategory,
            titleCategory: titleCategory,
            feature: featureData,
            specifications: specificationsData
          }, indexMainImage && {
            indexMainImage: indexMainImage
          }, {}, pdfBuffer && {
            pdfFile: pdfBuffer
          }, {}, pdfFile.name && {
            pdfFileName: pdfFile.name
          })));

        case 36:
          product = _context2.sent;

          if (!product) {
            _context2.next = 39;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "ساخته شد"
          }, {
            status: 201
          }));

        case 39:
          _context2.next = 45;
          break;

        case 41:
          _context2.prev = 41;
          _context2.t0 = _context2["catch"](30);
          console.log(_context2.t0);
          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 45:
          _context2.next = 50;
          break;

        case 47:
          _context2.prev = 47;
          _context2.t1 = _context2["catch"](0);
          console.error(_context2.t1); // خطاها را نمایش دهید

        case 50:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 47], [30, 41]]);
}

function GET(req, res) {
  var _ref, searchParams, count, countData, perPage, page, countFilterCategory, _countData, filterCategory, _category, _imageData, detailProduct, oneProduct, bottomImageCount, _imageData2, productObject, category, imageData;

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
          countFilterCategory = searchParams.get("countFilterCategory");

          if (!countFilterCategory) {
            _context3.next = 16;
            break;
          }

          _context3.next = 14;
          return regeneratorRuntime.awrap(_Product["default"].countDocuments({
            routeCategory: countFilterCategory
          })["catch"](function (err) {
            console.log(err);
          }));

        case 14:
          _countData = _context3.sent;
          return _context3.abrupt("return", _server.NextResponse.json({
            countData: _countData
          }));

        case 16:
          filterCategory = searchParams.get("filterCategory");

          if (!filterCategory) {
            _context3.next = 23;
            break;
          }

          _context3.next = 20;
          return regeneratorRuntime.awrap(_Product["default"].find({
            routeCategory: filterCategory
          }, "-__v").limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 20:
          _category = _context3.sent;
          _imageData = _category.map(function (ducomentProduct) {
            var imageTransfer = ducomentProduct.file.map(function (e) {
              if (ducomentProduct.indexMainImage === e.index) {
                var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
                var thumbnailBase64 = thumbnailBuffer.toString("base64");
                return {
                  fileName: "uploaded_image_".concat(Date.now(), ".webp"),
                  // For reference
                  thumbnailBase64: thumbnailBase64
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
              id: ducomentProduct.id_Product,
              indexMainImage: ducomentProduct.indexMainImage
            };
          });
          return _context3.abrupt("return", _server.NextResponse.json({
            data: _imageData
          }));

        case 23:
          // detailProduct
          detailProduct = searchParams.get("detailProduct");

          if (!detailProduct) {
            _context3.next = 36;
            break;
          }

          _context3.next = 27;
          return regeneratorRuntime.awrap(_Product["default"].findOne({
            id_Product: detailProduct
          }, "-__v -createdAt -updatedAt")["catch"](function (err) {
            console.log(err);
          }));

        case 27:
          oneProduct = _context3.sent;

          if (!oneProduct) {
            _context3.next = 35;
            break;
          }

          bottomImageCount = 0; // شمارنده برای تصاویر فرعی

          _imageData2 = oneProduct.file.map(function (e) {
            var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
            var thumbnailBase64 = thumbnailBuffer.toString("base64");

            if (oneProduct.indexMainImage === e.index) {
              // اگر تصویر اصلی باشد
              return {
                type: "main_image",
                image: thumbnailBase64
              };
            } else if (bottomImageCount < 3) {
              // اگر تصویر فرعی باشد و هنوز کمتر از 3 تصویر فرعی اضافه شده باشد
              bottomImageCount++;
              return {
                type: "bottom_image",
                image: thumbnailBase64
              };
            }

            return null; // برای مواردی که بیشتر از 3 تصویر فرعی وجود دارد، null برمی‌گردد
          }).filter(function (item) {
            return item !== null;
          }); // حذف موارد null

          productObject = oneProduct.toObject();
          return _context3.abrupt("return", _server.NextResponse.json({
            data: productObject,
            image: _imageData2
          }));

        case 35:
          return _context3.abrupt("return", _server.NextResponse.json({
            data: null,
            image: null
          }));

        case 36:
          _context3.next = 38;
          return regeneratorRuntime.awrap(_Product["default"].find({}, "-__v").limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 38:
          category = _context3.sent;
          imageData = category.map(function (ducomentProduct) {
            var imageTransfer = ducomentProduct.file.map(function (e) {
              if (ducomentProduct.indexMainImage === e.index) {
                var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
                var thumbnailBase64 = thumbnailBuffer.toString("base64");
                return {
                  fileName: "uploaded_image_".concat(Date.now(), ".webp"),
                  // For reference
                  thumbnailBase64: thumbnailBase64
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
              id: ducomentProduct.id_Product,
              subtitle: ducomentProduct.subtitle,
              brand: ducomentProduct.brand,
              titleCategory: ducomentProduct.titleCategory
            };
          });
          return _context3.abrupt("return", _server.NextResponse.json({
            data: imageData
          }));

        case 41:
        case "end":
          return _context3.stop();
      }
    }
  });
}