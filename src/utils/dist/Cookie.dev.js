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
  // خواندن مقدار فعلی کوکی
  var cookieValue = getCookie("Avasanat");
  var cart = cookieValue ? JSON.parse(cookieValue) : {}; // اگر کوکی خالی بود، یک شیء جدید ایجاد کن
  // اضافه کردن آیتم جدید با کلید یونیک

  cart[Date.now()] = {
    id: productId,
    quantity: quantity
  }; // ذخیره دوباره در کوکی

  setCookie("Avasanat", JSON.stringify(cart));
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