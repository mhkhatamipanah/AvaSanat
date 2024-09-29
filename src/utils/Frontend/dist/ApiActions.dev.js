"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiActions = exports.MONGOOSE = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _sonner = require("sonner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MONGOOSE = process.env.MONGOOSE; // Function For Params

exports.MONGOOSE = MONGOOSE;

var params = function params(obj) {
  var page = obj.page;
  var perpage = obj.perpage;
  var search = obj.search;
  var queryParams = [];

  if (page !== undefined && page !== null) {
    queryParams.push("page=".concat(page));
  }

  if (perpage !== undefined && perpage !== null) {
    queryParams.push("per_page=".concat(perpage));
  }

  if (search !== undefined && search !== null) {
    queryParams.push("search=".concat(search));
  }

  var queryString = queryParams.length > 0 ? "?".concat(queryParams.join("&")) : "";
  return queryString;
}; //** POST_METHOD **  */
// Post


var PostMethod = function PostMethod(url, data) {
  var res;
  return regeneratorRuntime.async(function PostMethod$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Promise


var postPromise = function postPromise(url, data) {
  return new Promise(function _callee(resolve, reject) {
    var res, result;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(PostMethod(url, data));

          case 3:
            res = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            result = _context2.sent;

            if (res.status === 200 || res.status === 201) {
              resolve(result);
            } else {
              reject(result.message);
            }

            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log("error", _context2.t0);
            reject("ارور در درخواست");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
}; // PostApi


var postApi = function postApi(url, data) {
  try {
    _sonner.toast.promise(postPromise(url, data), {
      loading: "در حال پردازش اطلاعات...",
      success: function success(data) {
        // بعدا برداشته شود
        if (data.otp) {
          _sonner.toast.info(data.otp);
        }

        return "".concat(data.message);
      },
      error: function error(e) {
        console.log(e);
        return "".concat(e);
      }
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}; // OTP


var sendOtp = function sendOtp(data) {
  var result = postApi("/api/contact_us/send/", data);
  return result;
};

var checkOtp = function checkOtp(data) {
  var result;
  return regeneratorRuntime.async(function checkOtp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = postApi("/api/contact_us/check/", data);
          return _context3.abrupt("return", result);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // ***/ DASHBOARD /* ///
// ContactUs


var get_ContactUs = function get_ContactUs(data) {
  var queryString, res, result;
  return regeneratorRuntime.async(function get_ContactUs$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          queryString = params(data);
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/contact_us".concat(queryString)));

        case 4:
          res = _context4.sent;

          if (!(res.status === 200)) {
            _context4.next = 12;
            break;
          }

          _context4.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 12:
          return _context4.abrupt("return", false);

        case 13:
          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log("error", _context4.t0);
          return _context4.abrupt("return", false);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var get_OneContactUs = function get_OneContactUs(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneContactUs$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id)));

        case 3:
          res = _context5.sent;

          if (!(res.status === 200)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 11:
          return _context5.abrupt("return", false);

        case 12:
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.log("error", _context5.t0);
          return _context5.abrupt("return", false);

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_ContactUs = function delete_ContactUs(id) {
  var res, result;
  return regeneratorRuntime.async(function delete_ContactUs$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id), {
            method: "DELETE"
          }));

        case 3:
          res = _context6.sent;

          if (!(res.status === 200)) {
            _context6.next = 12;
            break;
          }

          _context6.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context6.sent;
          console.log(result);
          return _context6.abrupt("return", result);

        case 12:
          return _context6.abrupt("return", false);

        case 13:
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.log("error", _context6.t0);
          return _context6.abrupt("return", false);

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var edit_ContactUs = function edit_ContactUs(id, data) {
  var res, result;
  return regeneratorRuntime.async(function edit_ContactUs$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context7.sent;

          if (!(res.status === 200)) {
            _context7.next = 11;
            break;
          }

          _context7.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 11:
          return _context7.abrupt("return", false);

        case 12:
          _context7.next = 18;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          console.log("error", _context7.t0);
          return _context7.abrupt("return", false);

        case 18:
        case "end":
          return _context7.stop();
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
    get_ContactUs: get_ContactUs,
    get_OneContactUs: get_OneContactUs,
    edit_ContactUs: edit_ContactUs,
    delete_ContactUs: delete_ContactUs
  };
};

exports.ApiActions = ApiActions;