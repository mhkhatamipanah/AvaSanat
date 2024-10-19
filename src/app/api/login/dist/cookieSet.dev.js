"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _headers = require("next/headers");

function create(data) {
  var oneDay;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          oneDay = 24 * 60 * 60 * 24000; // Corrected the calculation for one day in milliseconds

          (0, _headers.cookies)().set({
            name: "AvaSanatToken",
            value: data,
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + oneDay),
            // Adjusted the expiration time
            sameSite: "None",
            // Set SameSite attribute to None
            secure: true // Make sure to set secure flag when SameSite is None

          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = create;
exports["default"] = _default;