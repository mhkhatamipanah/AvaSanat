"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _otp = _interopRequireDefault(require("@/src/models/otp"));

var _axios = _interopRequireDefault(require("axios"));

var _ApiActions = require("@/src/utils/Frontend/ApiActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isInteger = function isInteger(str) {
  return !isNaN(parseInt(str));
};

var sixDigitOTP = function sixDigitOTP() {
  var randomNumber;

  do {
    randomNumber = String(Math.floor(Math.random() * 1000000));
  } while (randomNumber.length < 6);

  return randomNumber;
};

function POST(req, res) {
  var body, phone, oneHoureBefore, countRequestOneHour, sendBefore, date, expireOTP, otpCode, data, config, result;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          (0, _db["default"])();
          _context.next = 4;
          return regeneratorRuntime.awrap(req.json());

        case 4:
          body = _context.sent;
          phone = body.phone;

          if (!(!phone.trim() || phone.trim().length !== 11)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: " شماره را به درستی وارد کنید"
          }, {
            status: 400
          }));

        case 8:
          if (isInteger(phone)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: " شماره باید عدد باشد"
          }, {
            status: 400
          }));

        case 10:
          oneHoureBefore = new Date().getTime() - 1000 * 60 * 60;
          _context.next = 13;
          return regeneratorRuntime.awrap(_otp["default"].countDocuments({
            phone: phone,
            expTime: {
              $gt: oneHoureBefore
            }
          })["catch"](function (err) {
            console.log(err);
          }));

        case 13:
          countRequestOneHour = _context.sent;

          if (!(countRequestOneHour > 4)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "تعداد درخواست زیاد ساعات دیگر مجدد وارد شوید"
          }, {
            status: 429
          }));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(_otp["default"].countDocuments({
            phone: phone,
            expTime: {
              $gt: new Date().getTime()
            } // زمان فعلی برای چک کردن تاریخ انقضا

          })["catch"](function (err) {
            console.log(err);
          }));

        case 18:
          sendBefore = _context.sent;

          if (!(sendBefore > 0)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "کد برای شما از قبل ارسال شده "
          }));

        case 21:
          date = new Date();
          expireOTP = date.getTime() + 1000 * 60 * 2;
          otpCode = sixDigitOTP();
          console.log(otpCode);

          _otp["default"].create({
            phone: body.phone,
            code: otpCode,
            expTime: expireOTP
          }); // return NextResponse.json({ success: true, message: "کد ارسال شد" });


          data = JSON.stringify({
            mobile: body.phone,
            templateId: "784035",
            parameters: [{
              name: "CODE",
              value: otpCode
            }]
          });
          config = {
            method: "post",
            url: "https://api.sms.ir/v1/send/verify",
            headers: {
              "Content-Type": "application/json",
              Accept: "text/plain",
              "x-api-key": _ApiActions.API_KEY_SMSIR
            },
            data: data
          };
          _context.next = 30;
          return regeneratorRuntime.awrap((0, _axios["default"])(config)["catch"](function (error) {
            console.log(error);
          }));

        case 30:
          result = _context.sent;

          if (!JSON.stringify(result.data.message === "موفق")) {
            _context.next = 36;
            break;
          }

          _otp["default"].create({
            phone: body.phone,
            code: otpCode,
            expTime: expireOTP
          });

          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "کد ارسال شد"
          }));

        case 36:
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "مشکلی پیش آمده"
          }, {
            status: 400
          }));

        case 37:
          _context.next = 43;
          break;

        case 39:
          _context.prev = 39;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 39]]);
}