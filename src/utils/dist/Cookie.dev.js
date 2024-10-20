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

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function addToCart(productId, quantity) {
  var cart = getCookie("Avasanat");

  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  } // پارس کردن quantity به یک شیء جاوااسکریپت


  var productDetails = JSON.parse(quantity); // اگر محصول قبلاً در سبد خرید موجود است، مقدار count را افزایش دهید

  if (cart[productId]) {
    cart[productId].count++;
  } else {
    // اگر محصول موجود نیست، آن را اضافه کنید
    cart[productId] = _objectSpread({}, productDetails, {
      count: 1
    });
  }

  setCookie("Avasanat", JSON.stringify(cart));
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

function removeFromCart(productId) {
  var cart = getCookie("Avasanat");

  if (cart) {
    cart = JSON.parse(cart);
    delete cart[productId];
    setCookie("Avasanat", JSON.stringify(cart));
  }
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