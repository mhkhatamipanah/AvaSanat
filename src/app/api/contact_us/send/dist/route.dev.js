"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _otp = _interopRequireDefault(require("@/src/models/otp"));

var _axios = _interopRequireDefault(require("axios"));

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
  var body, phone, date, expireOTP, otpCode, data, config, result;
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
            message: " شماره باید عدد باشد"
          }, {
            status: 400
          }));

        case 10:
          // const oneHoureBefore =  new Date().getTime() - (1000*60*60)
          // const countRequestOneHour = await OTP.find({ phone , expTime: { $gt: oneHoureBefore }}).count().catch((err) => {
          //   console.log(err);
          // });
          // if(countRequestOneHour > 4 ){
          //   return NextResponse.json({ message: "تعداد درخواست زیاد ساعات دیگر مجدد وارد شوید" } , { status: 429 });
          // }
          // const sendBefore = await OTP.find({ phone , expTime: { $gt: new Date().getTime() }}).count().catch((err) => {
          //   console.log(err);
          // });
          // if(sendBefore > 0 ){
          //   return NextResponse.json({ message: "کد برای شما از قبل ارسال شده " });
          // }
          date = new Date();
          expireOTP = date.getTime() + 1000 * 60 * 2;
          otpCode = sixDigitOTP();
          console.log();

          _otp["default"].create({
            phone: body.phone,
            code: otpCode,
            expTime: expireOTP
          }); // بعدا باید otp رو بردارم که به فرانت نفرستم 


          return _context.abrupt("return", _server.NextResponse.json({
            message: "کد ارسال شد",
            otp: otpCode
          }));

        case 20:
          result = _context.sent;

          if (!JSON.stringify(result.data.message === "موفق")) {
            _context.next = 26;
            break;
          }

          _otp["default"].create({
            phone: body.phone,
            code: otpCode,
            expTime: expireOTP
          });

          return _context.abrupt("return", _server.NextResponse.json({
            message: "کد ارسال شد"
          }));

        case 26:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "مشکلی پیش آمده"
          }, {
            status: 400
          }));

        case 27:
          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: "ارور ناشناخته"
          }, {
            status: 500
          }));

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 29]]);
}