"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.GET = GET;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _Product = _interopRequireDefault(require("@/src/models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req, res) {
  var body, arrayInvoice, promises;
  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          (0, _db["default"])();
          _context2.next = 4;
          return regeneratorRuntime.awrap(req.json());

        case 4:
          body = _context2.sent;
          arrayInvoice = []; // استفاده از promises

          promises = Object.values(body).map(function _callee(value) {
            var obj, oneProduct, imageData;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    obj = {};
                    _context.next = 3;
                    return regeneratorRuntime.awrap(_Product["default"].findOne({
                      id_Product: value.id
                    }, "-__v -createdAt -updatedAt")["catch"](function (err) {
                      console.log(err);
                    }));

                  case 3:
                    oneProduct = _context.sent;

                    if (oneProduct) {
                      imageData = oneProduct.file.map(function (e) {
                        if (oneProduct.indexMainImage === e.index) {
                          var thumbnailBuffer = Buffer.from(e.thumbnail, "base64");
                          var thumbnailBase64 = thumbnailBuffer.toString("base64");
                          return {
                            thumbnailBase64: thumbnailBase64
                          };
                        }
                      });
                      obj.title = oneProduct.title;
                      obj.subtitle = oneProduct.subtitle;
                      obj.image = imageData[0].thumbnailBase64;
                      arrayInvoice.push(obj);
                    }

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }); // انتظار برای اتمام همه promises

          _context2.next = 9;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 9:
          return _context2.abrupt("return", _server.NextResponse.json({
            data: arrayInvoice
          }));

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function GET(req, res) {
  var _ref, searchParams, perPage, page, search, query, countData, category;

  return regeneratorRuntime.async(function GET$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          (0, _db["default"])();
          _ref = new URL(req.url), searchParams = _ref.searchParams;
          perPage = searchParams.get("per_page");
          page = searchParams.get("page");
          search = searchParams.get("search");
          query = {};

          if (search && search.trim() !== "") {
            query = {
              $or: [{
                title: {
                  $regex: search,
                  $options: "i"
                }
              }, {
                description: {
                  $regex: search,
                  $options: "i"
                }
              }]
            };
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(MessageModel.countDocuments(query)["catch"](function (err) {
            console.log(err);
          }));

        case 9:
          countData = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(MessageModel.find(query, "-__v").sort({
            createdAt: -1
          }).limit(perPage ? perPage : 20).skip(perPage && page ? perPage * (page - 1) : 0)["catch"](function (err) {
            console.log(err);
          }));

        case 12:
          category = _context3.sent;
          return _context3.abrupt("return", _server.NextResponse.json({
            results: category,
            total_items: countData
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}