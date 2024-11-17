"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _Product = _interopRequireDefault(require("@/src/models/Product"));

var _Category = _interopRequireDefault(require("@/src/models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

function POST(req, _ref) {
  var params, id, pdfDownload, product;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _ref.params;
          _context.prev = 1;
          (0, _db["default"])();
          id = params.id;
          _context.next = 6;
          return regeneratorRuntime.awrap(_Product["default"].find({
            id_Product: id
          }, "-__v")["catch"](function (err) {
            console.log(err);
          }));

        case 6:
          pdfDownload = _context.sent;
          console.log(pdfDownload);

          _server.NextResponse.json({
            success: true,
            message: "دانلود شد"
          }, {
            status: 201
          });

          _context.prev = 9;
          _context.next = 12;
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
          })));

        case 12:
          product = _context.sent;

          if (!product) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "ساخته شد"
          }, {
            status: 201
          }));

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](9);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 21:
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t1 = _context["catch"](1);
          console.error(_context.t1); // خطاها را نمایش دهید

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 23], [9, 17]]);
}