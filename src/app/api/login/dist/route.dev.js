"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _db = _interopRequireDefault(require("@/src/configs/db"));

var _server = require("next/server");

var _jsonwebtoken = require("jsonwebtoken");

var _ApiActions = require("@/src/utils/Frontend/ApiActions");

var _cookieSet = _interopRequireDefault(require("@/src/utils/Backend/cookieSet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(data) {
  var token = (0, _jsonwebtoken.sign)(data, _ApiActions.JWT_KEY, {
    // algorithm
    expiresIn: "7 days"
  });
  return token;
};

var verifyToken = function verifyToken(token) {
  try {
    var validationResult = (0, _jsonwebtoken.verify)(token, process.env.JWT_KEY);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Err =>", err);
    return false;
  }
};

function POST(req, res) {
  var body, username, password, token;
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
          username = body.username, password = body.password;

          if (!(username === "admin" && password === "admin")) {
            _context.next = 12;
            break;
          }

          token = generateToken({
            username: username
          });
          (0, _cookieSet["default"])(token);
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "ورود موفق",
            data: token,
            password: password
          }));

        case 12:
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "رمز عبور یا پسورد اشتباه است"
          }, {
            status: 400
          }));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "مشکلی پیش آمده"
          }, {
            status: 500
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}