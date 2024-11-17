"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePdfBuffer = void 0;

var handlePdfBuffer = function handlePdfBuffer(pdfFile) {
  var MAX_FILE_SIZE, bufferData, buffer;
  return regeneratorRuntime.async(function handlePdfBuffer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (pdfFile) {
            _context.next = 3;
            break;
          }

          throw new Error("No file provided");

        case 3:
          // محدود کردن حجم فایل به 15 مگابایت
          MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 مگابایت

          if (!(pdfFile.size > MAX_FILE_SIZE)) {
            _context.next = 6;
            break;
          }

          throw new Error("File size exceeds the 15MB limit");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(pdfFile.arrayBuffer());

        case 8:
          bufferData = _context.sent;
          // تبدیل ArrayBuffer به Node.js Buffer
          buffer = Buffer.from(bufferData);
          return _context.abrupt("return", buffer);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Error while buffering PDF file:", _context.t0.message);
          throw _context.t0;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.handlePdfBuffer = handlePdfBuffer;