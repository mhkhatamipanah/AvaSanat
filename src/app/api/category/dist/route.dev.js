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

var sharp = require("sharp");

function POST(req, res) {
  var formData, title, description, route, file, bufferData, buffer, _res, category;

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
          description = formData.get("description");
          route = formData.get("route");
          file = formData.get("file");
          _context.next = 11;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 11:
          bufferData = _context.sent;
          buffer = Buffer.from(bufferData);
          _context.prev = 13;
          _context.next = 16;
          return regeneratorRuntime.awrap(sharp(buffer).resize(500, 500).webp({
            lossless: true,
            quality: 60,
            alphaQuality: 80,
            force: true
          }).toBuffer());

        case 16:
          _res = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(_Category["default"].create({
            title: title,
            description: description,
            route: route,
            file: _res
          }));

        case 19:
          category = _context.sent;

          if (!category) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
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
  var _ref, searchParams, listCategory, data, allId, _data, count, countData, perPage, page, category, newArray, imageData;

  return regeneratorRuntime.async(function GET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _db["default"])();
          _ref = new URL(req.url), searchParams = _ref.searchParams; // }

          listCategory = searchParams.get("listCategory");

          if (!listCategory) {
            _context2.next = 8;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(_Category["default"].find({}, "title route _id")["catch"](function (err) {
            console.log(err);
          }));

        case 6:
          data = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json({
            data: data
          }));

        case 8:
          allId = searchParams.get("allId");

          if (!allId) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(_Category["default"].find({}, "_id title")["catch"](function (err) {
            console.log(err);
          }));

        case 12:
          _data = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json({
            data: _data
          }));

        case 14:
          count = searchParams.get("count");

          if (!count) {
            _context2.next = 20;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(_Category["default"].countDocuments()["catch"](function (err) {
            console.log(err);
          }));

        case 18:
          countData = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json({
            countData: countData
          }));

        case 20:
          perPage = searchParams.get("perPage");
          page = searchParams.get("page");
          _context2.next = 24;
          return regeneratorRuntime.awrap(_Category["default"].find({}, "-__v").limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 24:
          category = _context2.sent;
          newArray = [];
          imageData = category.map(function (e) {
            var imageBuffer = Buffer.from(e.file, "base64"); // Convert buffer to base64 string

            var base64Image = imageBuffer.toString('base64'); // Return the data along with a unique identifier or filename if necessary

            var object = {
              fileName: "uploaded_image_".concat(Date.now(), ".webp"),
              // For reference
              imageBase64: base64Image,
              title: e.title,
              description: e.description,
              route: e.route,
              id: e.id_Category
            };
            newArray.push(object);
          }); // Return the image data in JSON format

          return _context2.abrupt("return", _server.NextResponse.json({
            data: newArray
          }));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  });
}