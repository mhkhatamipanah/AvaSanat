"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _headers = require("next/headers");

function cookieGet(data) {
  var cookieStore, AvaSanatToken;
  return regeneratorRuntime.async(function cookieGet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cookieStore = (0, _headers.cookies)();
          AvaSanatToken = cookieStore.get('AvaSanatToken');
          return _context.abrupt("return", AvaSanatToken);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = cookieGet;
exports["default"] = _default;