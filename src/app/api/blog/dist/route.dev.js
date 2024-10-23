"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.GET = GET;

var _Blog = _interopRequireDefault(require("@/src/models/Blog"));

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require("mongoose");

var sharp = require("sharp");

function POST(req, res) {
  var formData, title, subtitle, content, file, bufferData, buffer, _res, blog;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          (0, _db["default"])();
          _context.next = 4;
          return regeneratorRuntime.awrap(req.formData());

        case 4:
          formData = _context.sent;
          title = formData.get("title");
          subtitle = formData.get("subtitle");
          content = formData.get("content");
          file = formData.get("file");
          _context.next = 11;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 11:
          bufferData = _context.sent;
          buffer = Buffer.from(bufferData);
          _context.prev = 13;
          _context.next = 16;
          return regeneratorRuntime.awrap(sharp(buffer).resize(550, 310).webp({
            lossless: true,
            quality: 60,
            alphaQuality: 80,
            force: true
          }).toBuffer());

        case 16:
          _res = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(_Blog["default"].create({
            title: title,
            subtitle: subtitle,
            content: content,
            file: _res
          }));

        case 19:
          blog = _context.sent;

          if (!blog) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "ساخته شد"
          }, {
            status: 201
          }));

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](13);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 28:
          _context.next = 33;
          break;

        case 30:
          _context.prev = 30;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1); // خطاها را نمایش دهید

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 30], [13, 24]]);
}

function GET(req, res) {
  var _ref, searchParams, threeData, _blog, _imageData, count, countData, perPage, page, blog, imageData;

  return regeneratorRuntime.async(function GET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _db["default"])();
          _ref = new URL(req.url), searchParams = _ref.searchParams;
          threeData = searchParams.get("threeData");

          if (!threeData) {
            _context2.next = 9;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(_Blog["default"].find({}, "-__v").sort({
            createdAt: -1
          }).limit(3)["catch"](function (err) {
            console.log(err);
          }));

        case 6:
          _blog = _context2.sent;
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
          return _context2.abrupt("return", _server.NextResponse.json({
            data: _imageData
          }));

        case 9:
          count = searchParams.get("count");

          if (!count) {
            _context2.next = 15;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(_Blog["default"].countDocuments()["catch"](function (err) {
            console.log(err);
          }));

        case 13:
          countData = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json({
            countData: countData
          }));

        case 15:
          perPage = searchParams.get("perPage");
          page = searchParams.get("page");
          _context2.next = 19;
          return regeneratorRuntime.awrap(_Blog["default"].find({}, "-__v").limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 19:
          blog = _context2.sent;
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
          return _context2.abrupt("return", _server.NextResponse.json({
            data: imageData
          }));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
}