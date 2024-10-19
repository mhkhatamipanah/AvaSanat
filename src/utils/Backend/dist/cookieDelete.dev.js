"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _headers = require("next/headers");

function removeTokens(data) {
  return regeneratorRuntime.async(function removeTokens$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _headers.cookies)().set(data, "");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = removeTokens;
exports["default"] = _default;