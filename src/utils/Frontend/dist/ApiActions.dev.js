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
}; // 3- PostApi


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
}; // 1- Edit


var EditMethod = function EditMethod(url, data) {
  var res;
  return regeneratorRuntime.async(function EditMethod$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "PUT",
            body: data
          }));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // 2- Promise Edit


var editPromise = function editPromise(url, data) {
  return new Promise(function _callee2(resolve, reject) {
    var res, result;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(EditMethod(url, data));

          case 3:
            res = _context4.sent;
            _context4.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            result = _context4.sent;

            if (res.status === 200 || res.status === 201) {
              resolve(result);
            } else {
              reject(result.message);
            }

            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.log("error", _context4.t0);
            reject("ارور در درخواست");

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
}; // 3- EditApi


var editApi = function editApi(url, data) {
  try {
    _sonner.toast.promise(editPromise(url, data), {
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
};

var deleteMethod = function deleteMethod(url) {
  var res;
  return regeneratorRuntime.async(function deleteMethod$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "Delete"
          }));

        case 2:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Promise Delete


var deletePromise = function deletePromise(url) {
  return new Promise(function _callee3(resolve, reject) {
    var res, result;
    return regeneratorRuntime.async(function _callee3$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(deleteMethod(url));

          case 3:
            res = _context6.sent;
            _context6.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            result = _context6.sent;
            console.log(result);

            if (res.status === 200 || res.status === 201) {
              resolve(result);
            } else {
              reject(result.message);
            }

            _context6.next = 15;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            console.log("error", _context6.t0);
            reject("ارور در درخواست");

          case 15:
          case "end":
            return _context6.stop();
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
}; // OTP


var sendOtp = function sendOtp(data) {
  var result = postApi("/api/contact_us/send/", data);
  return result;
};

var checkOtp = function checkOtp(data) {
  var result;
  return regeneratorRuntime.async(function checkOtp$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          result = postApi("/api/contact_us/check/", data);
          return _context7.abrupt("return", result);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
}; // ***/ DASHBOARD /* ///
// ContactUs


var get_ContactUs = function get_ContactUs(data) {
  var queryString, res, result;
  return regeneratorRuntime.async(function get_ContactUs$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          queryString = params(data);
          _context8.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/contact_us".concat(queryString)));

        case 4:
          res = _context8.sent;

          if (!(res.status === 200)) {
            _context8.next = 12;
            break;
          }

          _context8.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 12:
          return _context8.abrupt("return", false);

        case 13:
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.log("error", _context8.t0);
          return _context8.abrupt("return", false);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var get_OneContactUs = function get_OneContactUs(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneContactUs$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id)));

        case 3:
          res = _context9.sent;

          if (!(res.status === 200)) {
            _context9.next = 11;
            break;
          }

          _context9.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context9.sent;
          return _context9.abrupt("return", result);

        case 11:
          return _context9.abrupt("return", false);

        case 12:
          _context9.next = 18;
          break;

        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](0);
          console.log("error", _context9.t0);
          return _context9.abrupt("return", false);

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_ContactUs = function delete_ContactUs(id) {
  var res, result;
  return regeneratorRuntime.async(function delete_ContactUs$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id), {
            method: "DELETE"
          }));

        case 3:
          res = _context10.sent;

          if (!(res.status === 200)) {
            _context10.next = 12;
            break;
          }

          _context10.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context10.sent;
          console.log(result);
          return _context10.abrupt("return", result);

        case 12:
          return _context10.abrupt("return", false);

        case 13:
          _context10.next = 19;
          break;

        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](0);
          console.log("error", _context10.t0);
          return _context10.abrupt("return", false);

        case 19:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var edit_ContactUs = function edit_ContactUs(id, data) {
  var res, result;
  return regeneratorRuntime.async(function edit_ContactUs$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/contact_us/".concat(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 3:
          res = _context11.sent;

          if (!(res.status === 200)) {
            _context11.next = 11;
            break;
          }

          _context11.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context11.sent;
          return _context11.abrupt("return", result);

        case 11:
          return _context11.abrupt("return", false);

        case 12:
          _context11.next = 18;
          break;

        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          console.log("error", _context11.t0);
          return _context11.abrupt("return", false);

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; //Product


var create_Product = function create_Product(url, data) {
  return regeneratorRuntime.async(function create_Product$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          return _context12.abrupt("return", postApi(url, data));

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var edit_Product = function edit_Product(url, data) {
  return regeneratorRuntime.async(function edit_Product$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var delete_Product = function delete_Product(id) {
  return regeneratorRuntime.async(function delete_Product$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", deleteApi("/api/product/".concat(id)));

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var get_OneProduct = function get_OneProduct(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneProduct$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/product/".concat(id)));

        case 3:
          res = _context15.sent;

          if (!(res.status === 200)) {
            _context15.next = 11;
            break;
          }

          _context15.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context15.sent;
          return _context15.abrupt("return", result);

        case 11:
          return _context15.abrupt("return", false);

        case 12:
          _context15.next = 18;
          break;

        case 14:
          _context15.prev = 14;
          _context15.t0 = _context15["catch"](0);
          console.log("error", _context15.t0);
          return _context15.abrupt("return", false);

        case 18:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var get_CategoryProduct = function get_CategoryProduct(data) {
  var res, result;
  return regeneratorRuntime.async(function get_CategoryProduct$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/category?".concat(new URLSearchParams(data).toString())));

        case 3:
          res = _context16.sent;

          if (!(res.status === 200)) {
            _context16.next = 11;
            break;
          }

          _context16.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          result = _context16.sent;
          return _context16.abrupt("return", result);

        case 11:
          return _context16.abrupt("return", false);

        case 12:
          _context16.next = 18;
          break;

        case 14:
          _context16.prev = 14;
          _context16.t0 = _context16["catch"](0);
          console.log("error", _context16.t0);
          return _context16.abrupt("return", false);

        case 18:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var delete_Image_Product = function delete_Image_Product(id, id_image) {
  return regeneratorRuntime.async(function delete_Image_Product$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", deleteApi("/api/product/".concat(id, "/").concat(id_image)));

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
}; // Category


var get_OneCategory = function get_OneCategory(id) {
  var res, result;
  return regeneratorRuntime.async(function get_OneCategory$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/category/".concat(id)));

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

var create_Category = function create_Category(url, data) {
  return regeneratorRuntime.async(function create_Category$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          return _context19.abrupt("return", postApi(url, data));

        case 1:
        case "end":
          return _context19.stop();
      }
    }
  });
};

var edit_Category = function edit_Category(url, data) {
  return regeneratorRuntime.async(function edit_Category$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          return _context20.abrupt("return", editApi(url, data));

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
};

var delete_Category = function delete_Category(id) {
  return regeneratorRuntime.async(function delete_Category$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          return _context21.abrupt("return", deleteApi("/api/category/".concat(id)));

        case 1:
        case "end":
          return _context21.stop();
      }
    }
  });
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
    delete_Category: delete_Category
  };
};

exports.ApiActions = ApiActions;