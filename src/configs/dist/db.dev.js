"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDB = function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!_mongoose["default"].connections[0].readyState) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", false);

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGOOSE));

        case 5:
          console.log("Connected");
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var _default = connectDB;
exports["default"] = _default;