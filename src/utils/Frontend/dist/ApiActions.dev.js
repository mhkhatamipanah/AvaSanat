"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiActions = exports.API_KEY_SMSIR = exports.BASE_URL = exports.JWT_KEY = exports.MONGOOSE = void 0;

var _sonner = require("sonner");

var MONGOOSE = process.env.MONGOOSE;
exports.MONGOOSE = MONGOOSE;
var JWT_KEY = process.env.JWT_KEY;
exports.JWT_KEY = JWT_KEY;
var BASE_URL = process.env.BASE_URL;
exports.BASE_URL = BASE_URL;
var API_KEY_SMSIR = process.env.API_KEY_SMSIR; // Function For Params

exports.API_KEY_SMSIR = API_KEY_SMSIR;

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
// 1- Post


var PostMethod = function PostMethod(url, data) {
  var res;
  return regeneratorRuntime.async(function PostMethod$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: data
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
}; // 2- Promise Post


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
};

var postApi = function postApi(url, data) {
  var resultPromise, result;
  return regeneratorRuntime.async(function postApi$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // 1. فراخوانی postPromise و گرفتن نتیجه به صورت مستقیم
          resultPromise = postPromise(url, data); // 2. نمایش پیام‌ها با استفاده از toast.promise بدون وابستگی به نتیجه نهایی

          _sonner.toast.promise(resultPromise, // postPromise که یک Promise است به عنوان ورودی داده می‌شود
          {
            loading: "در حال پردازش اطلاعات...",
            success: function success(response) {
              return response.message; // پیام موفقیت را برمی‌گرداند
            },
            error: function error(err) {
              return err || "خطا در ارتباط با سرور"; // نمایش پیام خطا
            }
          }); // 3. منتظر ماندن برای نتیجه اصلی (موفقیت یا خطا)


          _context3.next = 5;
          return regeneratorRuntime.awrap(resultPromise);

        case 5:
          result = _context3.sent;
          return _context3.abrupt("return", result.success ? true : false);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log("Error in postApi:", _context3.t0);
          return _context3.abrupt("return", false);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // 1- Edit


var EditMethod = function EditMethod(url, data) {
  var res;
  return regeneratorRuntime.async(function EditMethod$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "PUT",
            body: data
          }));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // 2- Promise Edit


var editPromise = function editPromise(url, data) {
  return new Promise(function _callee2(resolve, reject) {
    var res, result;
    return regeneratorRuntime.async(function _callee2$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(EditMethod(url, data));

          case 3:
            res = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            result = _context5.sent;

            if (res.status === 200 || res.status === 201) {
              resolve(result);
            } else {
              reject(result.message);
            }

            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log("error", _context5.t0);
            reject("ارور در درخواست");

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
}; // 3- EditApi


var editApi = function editApi(url, data) {
  var resultPromise, result;
  return regeneratorRuntime.async(function editApi$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          resultPromise = editPromise(url, data);

          _sonner.toast.promise(resultPromise, {
            loading: "در حال پردازش اطلاعات...",
            success: function success(data) {
              return "".concat(data.message);
            },
            error: function error(e) {
              console.log(e);
              return "".concat(e);
            }
          });

          _context6.next = 5;
          return regeneratorRuntime.awrap(resultPromise);

        case 5:
          result = _context6.sent;
          return _context6.abrupt("return", result.success ? true : false);

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", false);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var deleteMethod = function deleteMethod(url) {
  var res;
  return regeneratorRuntime.async(function deleteMethod$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "Delete"
          }));

        case 2:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}; // Promise Delete


var deletePromise = function deletePromise(url) {
  return new Promise(function _callee3(resolve, reject) {
    var res, result;
    return regeneratorRuntime.async(function _callee3$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return regeneratorRuntime.awrap(deleteMethod(url));

          case 3:
            res = _context8.sent;
            _context8.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            result = _context8.sent;
            console.log(result);

            if (res.status === 200 || res.status === 201) {
              resolve(result);
            } else {
              reject(result.message);
            }

            _context8.next = 15;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            console.log("error", _context8.t0);
            reject("ارور در درخواست");

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
}; // deleteApi


var deleteApi = function deleteApi(url) {
  try {
    _sonner.toast.promise(deletePromise(url), {
      loading: "در حال پردازش اطلاعات...",
      success: function success(data) {
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
}; // Login


var login = function login(data) {
  var result = postApi("/api/login/", data);
  return result;
}; // OTP Countact us


var sendOtp = function sendOtp(data) {
  var result = postApi("/api/contact_us/send/", data);
  return result;
};

var checkOtp = function checkOtp(data) {
  var result;
  return regeneratorRuntime.async(function checkOtp$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          result = postApi("/api/contact_us/check/", data);
          return _context9.abrupt("return", result);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  });
}; // OTP Invoice


var sendOtpInvoice = function sendOtpInvoice(data) {
  var result = postApi("/api/invoice/send/", data);
  return result;
};

var checkOtpInvoice = function checkOtpInvoice(data) {
  var result;
  return regeneratorRuntime.async(function checkOtpInvoice$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          result = postApi("/api/invoice/check/", data);
          return _context10.abrupt("return", result);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
}; // ***/ DASHBOARD /* ///
// ContactUs


var get_ContactUs = function get_ContactUs(data) {
  var queryString, res, result;
  return regeneratorRuntime.async(function get_ContactUs$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          queryString = params(data);
          _context11.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/contact_us".concat(queryString)));

        case 4:
          res = _context11.sent;

          if (!(res.status === 200)) {
            _context11.next = 12;
            break;
          }

          _context11.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          result = _context11.sent;
          return _context11.abrupt("return", result);

        case 12:
          return _context11.abrupt("return", false);

        case 13:
          _context11.next = 19;
          break;

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          console.log("error", _context11.t0);
          return _context11.abrupt("return", false);

        case 19:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var get_OneContactUs = function get_OneContactUs(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneContactUs$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id)));

        case 3:
          res = _context12.sent;

          if (!(res.status === 200)) {
            _context12.next = 11;
            break;
          }

          _context12.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context12.sent;
          return _context12.abrupt("return", result);

        case 11:
          return _context12.abrupt("return", false);

        case 12:
          _context12.next = 18;
          break;

        case 14:
          _context12.prev = 14;
          _context12.t0 = _context12["catch"](0);
          console.log("error", _context12.t0);
          return _context12.abrupt("return", false);

        case 18:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_ContactUs = function delete_ContactUs(id) {
  return regeneratorRuntime.async(function delete_ContactUs$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", deleteApi("/api/contact_us/".concat(id)));

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var edit_ContactUs = function edit_ContactUs(id, data) {
  var res, result;
  return regeneratorRuntime.async(function edit_ContactUs$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context14.sent;

          if (!(res.status === 200)) {
            _context14.next = 11;
            break;
          }

          _context14.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context14.sent;
          return _context14.abrupt("return", result);

        case 11:
          return _context14.abrupt("return", false);

        case 12:
          _context14.next = 18;
          break;

        case 14:
          _context14.prev = 14;
          _context14.t0 = _context14["catch"](0);
          console.log("error", _context14.t0);
          return _context14.abrupt("return", false);

        case 18:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; //Product


var create_Product = function create_Product(url, data) {
  return regeneratorRuntime.async(function create_Product$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", postApi(url, data));

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var edit_Product = function edit_Product(url, data) {
  return regeneratorRuntime.async(function edit_Product$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var delete_Product = function delete_Product(id) {
  return regeneratorRuntime.async(function delete_Product$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", deleteApi("/api/product/".concat(id)));

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var get_OneProduct = function get_OneProduct(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneProduct$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/product/".concat(id)));

        case 3:
          res = _context18.sent;

          if (!(res.status === 200)) {
            _context18.next = 11;
            break;
          }

          _context18.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context18.sent;
          return _context18.abrupt("return", result);

        case 11:
          return _context18.abrupt("return", false);

        case 12:
          _context18.next = 18;
          break;

        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](0);
          console.log("error", _context18.t0);
          return _context18.abrupt("return", false);

        case 18:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var get_CategoryProduct = function get_CategoryProduct(data) {
  var res, result;
  return regeneratorRuntime.async(function get_CategoryProduct$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/category?".concat(new URLSearchParams(data).toString())));

        case 3:
          res = _context19.sent;

          if (!(res.status === 200)) {
            _context19.next = 11;
            break;
          }

          _context19.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context19.sent;
          return _context19.abrupt("return", result);

        case 11:
          return _context19.abrupt("return", false);

        case 12:
          _context19.next = 18;
          break;

        case 14:
          _context19.prev = 14;
          _context19.t0 = _context19["catch"](0);
          console.log("error", _context19.t0);
          return _context19.abrupt("return", false);

        case 18:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_Image_Product = function delete_Image_Product(id, id_image) {
  return regeneratorRuntime.async(function delete_Image_Product$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          return _context20.abrupt("return", deleteApi("/api/product/".concat(id, "/").concat(id_image)));

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
}; // Category


var get_OneCategory = function get_OneCategory(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneCategory$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/category/".concat(id)));

        case 3:
          res = _context21.sent;

          if (!(res.status === 200)) {
            _context21.next = 11;
            break;
          }

          _context21.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context21.sent;
          return _context21.abrupt("return", result);

        case 11:
          return _context21.abrupt("return", false);

        case 12:
          _context21.next = 18;
          break;

        case 14:
          _context21.prev = 14;
          _context21.t0 = _context21["catch"](0);
          console.log("error", _context21.t0);
          return _context21.abrupt("return", false);

        case 18:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var create_Category = function create_Category(url, data) {
  return regeneratorRuntime.async(function create_Category$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          return _context22.abrupt("return", postApi(url, data));

        case 1:
        case "end":
          return _context22.stop();
      }
    }
  });
};

var edit_Category = function edit_Category(url, data) {
  return regeneratorRuntime.async(function edit_Category$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          return _context23.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context23.stop();
      }
    }
  });
};

var delete_Category = function delete_Category(id) {
  return regeneratorRuntime.async(function delete_Category$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          return _context24.abrupt("return", deleteApi("/api/category/".concat(id)));

        case 1:
        case "end":
          return _context24.stop();
      }
    }
  });
};

var fetchCategory = function fetchCategory() {
  var data, fetchData;
  return regeneratorRuntime.async(function fetchCategory$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          data = {
            listCategory: true
          };
          _context25.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/category?".concat(new URLSearchParams(data).toString())));

        case 3:
          fetchData = _context25.sent;
          return _context25.abrupt("return", fetchData.json());

        case 5:
        case "end":
          return _context25.stop();
      }
    }
  });
}; // Invoice


var create_Invoice = function create_Invoice(url, data) {
  return regeneratorRuntime.async(function create_Invoice$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          return _context26.abrupt("return", postPromise(url, data));

        case 1:
        case "end":
          return _context26.stop();
      }
    }
  });
};

var get_Invoice = function get_Invoice(data) {
  var queryString, res, result;
  return regeneratorRuntime.async(function get_Invoice$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          queryString = params(data);
          _context27.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/invoice".concat(queryString)));

        case 4:
          res = _context27.sent;

          if (!(res.status === 200)) {
            _context27.next = 12;
            break;
          }

          _context27.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          result = _context27.sent;
          return _context27.abrupt("return", result);

        case 12:
          return _context27.abrupt("return", false);

        case 13:
          _context27.next = 19;
          break;

        case 15:
          _context27.prev = 15;
          _context27.t0 = _context27["catch"](0);
          console.log("error", _context27.t0);
          return _context27.abrupt("return", false);

        case 19:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var get_OneInvoice = function get_OneInvoice(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneInvoice$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/invoice/".concat(id)));

        case 3:
          res = _context28.sent;

          if (!(res.status === 200)) {
            _context28.next = 11;
            break;
          }

          _context28.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context28.sent;
          return _context28.abrupt("return", result);

        case 11:
          return _context28.abrupt("return", false);

        case 12:
          _context28.next = 18;
          break;

        case 14:
          _context28.prev = 14;
          _context28.t0 = _context28["catch"](0);
          console.log("error", _context28.t0);
          return _context28.abrupt("return", false);

        case 18:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_Invoice = function delete_Invoice(id) {
  return regeneratorRuntime.async(function delete_Invoice$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          return _context29.abrupt("return", deleteApi("/api/invoice/".concat(id)));

        case 1:
        case "end":
          return _context29.stop();
      }
    }
  });
};

var edit_Invoice = function edit_Invoice(id, data) {
  var res, result;
  return regeneratorRuntime.async(function edit_Invoice$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/invoice/".concat(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context30.sent;

          if (!(res.status === 200)) {
            _context30.next = 11;
            break;
          }

          _context30.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context30.sent;
          return _context30.abrupt("return", result);

        case 11:
          return _context30.abrupt("return", false);

        case 12:
          _context30.next = 18;
          break;

        case 14:
          _context30.prev = 14;
          _context30.t0 = _context30["catch"](0);
          console.log("error", _context30.t0);
          return _context30.abrupt("return", false);

        case 18:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; //blod


var create_Blog = function create_Blog(url, data) {
  return regeneratorRuntime.async(function create_Blog$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          return _context31.abrupt("return", postApi(url, data));

        case 1:
        case "end":
          return _context31.stop();
      }
    }
  });
};

var edit_Blog = function edit_Blog(url, data) {
  return regeneratorRuntime.async(function edit_Blog$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          return _context32.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context32.stop();
      }
    }
  });
};

var delete_Blog = function delete_Blog(id) {
  return regeneratorRuntime.async(function delete_Blog$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          return _context33.abrupt("return", deleteApi("/api/blog/".concat(id)));

        case 1:
        case "end":
          return _context33.stop();
      }
    }
  });
};

var get_OneBlog = function get_OneBlog(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneBlog$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/blog/".concat(id)));

        case 3:
          res = _context34.sent;

          if (!(res.status === 200)) {
            _context34.next = 11;
            break;
          }

          _context34.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context34.sent;
          return _context34.abrupt("return", result);

        case 11:
          return _context34.abrupt("return", false);

        case 12:
          _context34.next = 18;
          break;

        case 14:
          _context34.prev = 14;
          _context34.t0 = _context34["catch"](0);
          console.log("error", _context34.t0);
          return _context34.abrupt("return", false);

        case 18:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var downloadPdf = function downloadPdf(url, data, id) {
  return regeneratorRuntime.async(function downloadPdf$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          // استفاده از toast.promise برای مدیریت وضعیت دانلود
          _sonner.toast.promise(new Promise(function _callee4(resolve, reject) {
            var response, errorData, responseData, message, success, fileName, base64File, byteCharacters, byteArrays, offset, slice, byteNumbers, i, byteArray, blob, fileUrl, link;
            return regeneratorRuntime.async(function _callee4$(_context35) {
              while (1) {
                switch (_context35.prev = _context35.next) {
                  case 0:
                    _context35.prev = 0;
                    _context35.next = 3;
                    return regeneratorRuntime.awrap(fetch(url, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json" // تعیین نوع محتوا

                      },
                      body: JSON.stringify(data) // ارسال داده‌ها به سرور

                    }));

                  case 3:
                    response = _context35.sent;

                    if (response.ok) {
                      _context35.next = 10;
                      break;
                    }

                    _context35.next = 7;
                    return regeneratorRuntime.awrap(response.json());

                  case 7:
                    errorData = _context35.sent;
                    reject(errorData.message || "کاتالوگ یافت نشد");
                    return _context35.abrupt("return");

                  case 10:
                    _context35.next = 12;
                    return regeneratorRuntime.awrap(response.json());

                  case 12:
                    responseData = _context35.sent;
                    message = responseData.message;
                    success = responseData.success;
                    fileName = responseData.fileName;
                    base64File = responseData.fileData;

                    if (success) {
                      // تبدیل Base64 به Blob
                      byteCharacters = atob(base64File); // تبدیل Base64 به بایت

                      byteArrays = [];

                      for (offset = 0; offset < byteCharacters.length; offset += 1024) {
                        slice = byteCharacters.slice(offset, offset + 1024);
                        byteNumbers = new Array(slice.length);

                        for (i = 0; i < slice.length; i++) {
                          byteNumbers[i] = slice.charCodeAt(i);
                        }

                        byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                      }

                      blob = new Blob(byteArrays, {
                        type: "application/pdf"
                      });
                      fileUrl = window.URL.createObjectURL(blob);
                      link = document.createElement("a");
                      link.href = fileUrl;
                      link.download = fileName || "".concat(id, ".pdf"); // استفاده از نام فایل بدون encode

                      link.click();
                      window.URL.revokeObjectURL(fileUrl);
                      resolve(message || "دانلود موفق");
                    } else {
                      reject("Download failed");
                    }

                    _context35.next = 23;
                    break;

                  case 20:
                    _context35.prev = 20;
                    _context35.t0 = _context35["catch"](0);
                    reject(_context35.t0.message || "Failed to download file.");

                  case 23:
                  case "end":
                    return _context35.stop();
                }
              }
            }, null, null, [[0, 20]]);
          }), {
            loading: "در حال دانلود فایل...",
            success: function success(message) {
              return message; // پیام موفقیت که از resolve بازگشت داده می‌شود
            },
            error: function error(err) {
              return err; // پیام خطا که از reject بازگشت داده می‌شود
            }
          });

        case 1:
        case "end":
          return _context36.stop();
      }
    }
  });
};

var deleteFile = function deleteFile(url, data) {
  return regeneratorRuntime.async(function deleteFile$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          return _context37.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context37.stop();
      }
    }
  });
};

var ApiActions = function ApiActions() {
  return {
    // Login
    login: login,
    // Otp ContactUs
    sendOtp: sendOtp,
    checkOtp: checkOtp,
    // Otp Invoice
    sendOtpInvoice: sendOtpInvoice,
    checkOtpInvoice: checkOtpInvoice,
    // ContactUs
    get_ContactUs: get_ContactUs,
    get_OneContactUs: get_OneContactUs,
    edit_ContactUs: edit_ContactUs,
    delete_ContactUs: delete_ContactUs,
    // Product
    create_Product: create_Product,
    get_OneProduct: get_OneProduct,
    delete_Product: delete_Product,
    edit_Product: edit_Product,
    get_CategoryProduct: get_CategoryProduct,
    delete_Image_Product: delete_Image_Product,
    // Category
    get_OneCategory: get_OneCategory,
    create_Category: create_Category,
    edit_Category: edit_Category,
    delete_Category: delete_Category,
    fetchCategory: fetchCategory,
    // Invoice
    create_Invoice: create_Invoice,
    get_Invoice: get_Invoice,
    get_OneInvoice: get_OneInvoice,
    delete_Invoice: delete_Invoice,
    edit_Invoice: edit_Invoice,
    // Invoice
    create_Blog: create_Blog,
    edit_Blog: edit_Blog,
    delete_Blog: delete_Blog,
    get_OneBlog: get_OneBlog,
    downloadPdf: downloadPdf,
    deleteFile: deleteFile
  };
};

exports.ApiActions = ApiActions;