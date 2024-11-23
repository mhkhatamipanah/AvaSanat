"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.setCookie = setCookie;
exports.clearCart = clearCart;
exports.decreaseItemCount = decreaseItemCount;
exports.getTotalUniqueItems = getTotalUniqueItems;
exports.getItemCount = getItemCount;
exports.updateCartQuantity = updateCartQuantity;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getCookie(name) {
  return _jsCookie["default"].get(name);
}

function setCookie(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    expires: 7,
    path: "/",
    sameSite: "None",
    secure: true
  };

  _jsCookie["default"].set(name, value, options);
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // اگر دقیقاً یکسان باشند

  if (_typeof(obj1) !== "object" || _typeof(obj2) !== "object" || obj1 == null || obj2 == null) return false;
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every(function (key) {
    return deepEqual(obj1[key], obj2[key]);
  });
}

function addToCart(productId, quantity) {
  var cart = getCookie("Avasanat");
  cart = JSON.parse(cart);
  var quantityParse = JSON.parse(quantity);
  var hasEqualFeature = Object.entries(cart).some(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return deepEqual(JSON.parse(value.quantity).feature, quantityParse.feature);
  });
  console.log(hasEqualFeature);

  if (hasEqualFeature) {
    return false;
  } else {
    // خواندن مقدار فعلی کوکی
    var cookieValue = getCookie("Avasanat");

    var _cart = cookieValue ? JSON.parse(cookieValue) : {}; // اگر کوکی خالی بود، یک شیء جدید ایجاد کن
    // اضافه کردن آیتم جدید با کلید یونیک


    _cart[Date.now()] = {
      id: productId,
      quantity: quantity
    }; // ذخیره دوباره در کوکی

    setCookie("Avasanat", JSON.stringify(_cart));
    return true;
  }
}

function removeFromCart(uniqueKey) {
  var cart = getCookie("Avasanat");

  if (cart) {
    cart = JSON.parse(cart);

    if (cart[uniqueKey]) {
      delete cart[uniqueKey]; // حذف آیتم با کلید خاص

      setCookie("Avasanat", JSON.stringify(cart)); // ذخیره دوباره در کوکی
    }
  }
}

function updateCartQuantity(uniqueKey, newCount) {
  // خواندن مقدار فعلی کوکی
  var cookieValue = getCookie("Avasanat");
  var cart = cookieValue ? JSON.parse(cookieValue) : {}; // اگر کوکی خالی بود، یک شیء جدید ایجاد کن
  // بررسی وجود کلید در شیء

  if (cart[uniqueKey]) {
    // فرض بر این است که quantity یک آبجکت است
    var quantityObj = JSON.parse(cart[uniqueKey].quantity); // ابتدا quantity را تجزیه کنید

    quantityObj.count = newCount; // مقدار count را آپدیت کنید

    cart[uniqueKey].quantity = JSON.stringify(quantityObj); // مقدار جدید را در cart قرار دهید
    // ذخیره دوباره در کوکی

    setCookie("Avasanat", JSON.stringify(cart));
  } else {
    console.log("Item with the given key does not exist in the cart.");
  }
}

function getItemCount(productId) {
  // Retrieve the cart from the cookie
  var cart = getCookie("Avasanat"); // If the cart exists

  if (cart) {
    // Parse the cart JSON into a JavaScript object
    var parsedCart = JSON.parse(cart); // Check if the item exists in the cart

    if (parsedCart[productId]) {
      // Return the count of the specific item
      return parsedCart[productId].count;
    }
  } // Return 0 if the item does not exist in the cart


  return 0;
}

function clearCart() {
  setCookie("Avasanat", JSON.stringify({}));
}

function decreaseItemCount(productId) {
  var cart = getCookie("Avasanat");

  if (cart) {
    cart = JSON.parse(cart); // چک کردن وجود محصول در سبد خرید

    if (cart[productId]) {
      // اگر تعداد بیشتر از 1 بود، یک عدد کم کن
      if (cart[productId].count > 1) {
        cart[productId].count--;
      } else {
        // در غیر این صورت محصول را کاملاً حذف کن
        delete cart[productId];
      }

      setCookie("Avasanat", JSON.stringify(cart));
    }
  }
}

function getTotalUniqueItems() {
  var cart = getCookie("Avasanat");

  if (cart) {
    var parsedCart = JSON.parse(cart); // تعداد کل آیتم‌های مختلف (محصولات یکتا)

    return Object.keys(parsedCart).length;
  }

  return 0;
}