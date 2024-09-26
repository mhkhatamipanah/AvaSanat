"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiActions = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _sonner = require("sonner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendOtp = function sendOtp(data) {
  var res, result;
  return regeneratorRuntime.async(function sendOtp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/send/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context.sent;

          if (!(res.status === 200)) {
            _context.next = 13;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context.sent;
          console.log(result);

          _sonner.toast.info(result.otp);

          return _context.abrupt("return", true);

        case 13:
          return _context.abrupt("return", false);

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log("error", _context.t0);
          return _context.abrupt("return", false);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var checkOtp = function checkOtp(data) {
  var res, result;
  return regeneratorRuntime.async(function checkOtp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/check/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context2.sent;

          if (!(res.status === 200)) {
            _context2.next = 13;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context2.sent;
          console.log(result);

          _sonner.toast.info(result.otp);

          return _context2.abrupt("return", true);

        case 13:
          return _context2.abrupt("return", false);

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log("error", _context2.t0);
          return _context2.abrupt("return", false);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // ContactUs


var getContactUs = function getContactUs(data) {
  var res, result;
  return regeneratorRuntime.async(function getContactUs$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/"));

        case 3:
          res = _context3.sent;

          if (!(res.status === 200)) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 11:
          return _context3.abrupt("return", false);

        case 12:
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.log("error", _context3.t0);
          return _context3.abrupt("return", false);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var ApiActions = function ApiActions() {
  return {
    // Otp ContactUs
    sendOtp: sendOtp,
    checkOtp: checkOtp,
    // ContactUs
    getContactUs: getContactUs
  };
};

exports.ApiActions = ApiActions;