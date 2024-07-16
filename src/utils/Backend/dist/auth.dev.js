"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whoAreYou = exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _db = _interopRequireDefault(require("@/src/configs/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(data) {
  var token = (0, _jsonwebtoken.sign)(data, process.env.JWT_KEY, {
    // algorithm
    expiresIn: "7 days"
  });
  return token;
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(token) {
  try {
    var validationResult = (0, _jsonwebtoken.verify)(token, process.env.JWT_KEY);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Err =>", err);
    return false;
  }
};

exports.verifyToken = verifyToken;

var whoAreYou = function whoAreYou(req) {
  var getVersanToken, token, tokenPayload;
  return regeneratorRuntime.async(function whoAreYou$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _db["default"])();
          getVersanToken = req.cookies.get("versanToken");

          if (getVersanToken) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", false);

        case 4:
          token = getVersanToken.value;

          if (token) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", false);

        case 7:
          tokenPayload = verifyToken(token);

          if (tokenPayload) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", false);

        case 10:
          return _context.abrupt("return", user);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.whoAreYou = whoAreYou;