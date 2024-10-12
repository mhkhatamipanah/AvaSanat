"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _otp = _interopRequireDefault(require("@/src/models/otp"));

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _Invoice = _interopRequireDefault(require("@/src/models/Invoice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isInteger = function isInteger(str) {
  return !isNaN(parseInt(str));
};

function POST(req, res) {
  var body, phone, code, invoice, description, otp, date, now, newMessage;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _db["default"])();
          _context.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          body = _context.sent;
          phone = body.phone, code = body.code, invoice = body.invoice, description = body.description;

          if (!(!phone.trim() || phone.trim().length !== 11)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: " شماره را به درستی وارد کنید"
          }, {
            status: 400
          }));

        case 7:
          if (isInteger(phone)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: " شماره باید عدد باشد"
          }, {
            status: 400
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_otp["default"].findOne({
            phone: phone,
            code: code
          })["catch"](function (err) {
            console.log(err);
          }));

        case 11:
          otp = _context.sent;

          if (otp) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "کد نا معتبر"
          }, {
            status: 400
          }));

        case 14:
          date = new Date();
          now = date.getTime();

          if (!(otp.expTime < now)) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "کد منقضی شده "
          }, {
            status: 400
          }));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(_Invoice["default"].create({
            phone: phone,
            invoice: invoice,
            description: description
          }));

        case 20:
          newMessage = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "ساخته شد"
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}