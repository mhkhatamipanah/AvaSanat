import Cookies from "js-cookie";

function getCookie(name) {
  return Cookies.get(name);
}

function setCookie(
  name,
  value,
  options = { expires: 7, path: "/", sameSite: "None", secure: true }
) {
  Cookies.set(name, value, options);
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // اگر دقیقاً یکسان باشند
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}
function addToCart(productId, quantity) {
  let quantityParse = JSON.parse(quantity);
  
  // خواندن مقدار فعلی کوکی
  let cart = getCookie("Avasanat");
  cart = cart ? JSON.parse(cart) : {}; // اگر کوکی خالی بود، یک شیء جدید ایجاد کن

  // بررسی اینکه آیا ویژگی مشابه در سبد خرید وجود دارد یا نه
  const hasEqualFeature = Object.entries(cart).some(([key, value]) =>
    deepEqual(JSON.parse(value.quantity).feature, quantityParse.feature)
  );

  if (hasEqualFeature) {
    return false; // اگر ویژگی مشابه پیدا شد، بازگرداندن false
  }

  // اضافه کردن آیتم جدید با کلید یونیک
  cart[Date.now()] = { id: productId, quantity };

  // ذخیره دوباره در کوکی
  setCookie("Avasanat", JSON.stringify(cart));
  
  return true;
}


function removeFromCart(uniqueKey) {
  let cart = getCookie("Avasanat");
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
  let cookieValue = getCookie("Avasanat");
  let cart = cookieValue ? JSON.parse(cookieValue) : {}; // اگر کوکی خالی بود، یک شیء جدید ایجاد کن

  // بررسی وجود کلید در شیء
  if (cart[uniqueKey]) {
    // فرض بر این است که quantity یک آبجکت است
    let quantityObj = JSON.parse(cart[uniqueKey].quantity); // ابتدا quantity را تجزیه کنید
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
  const cart = getCookie("Avasanat");

  // If the cart exists
  if (cart) {
    // Parse the cart JSON into a JavaScript object
    const parsedCart = JSON.parse(cart);

    // Check if the item exists in the cart
    if (parsedCart[productId]) {
      // Return the count of the specific item
      return parsedCart[productId].count;
    }
  }

  // Return 0 if the item does not exist in the cart
  return 0;
}

function clearCart() {
  setCookie("Avasanat", JSON.stringify({}));
}

function decreaseItemCount(productId) {
  let cart = getCookie("Avasanat");
  if (cart) {
    cart = JSON.parse(cart);

    // چک کردن وجود محصول در سبد خرید
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
  const cart = getCookie("Avasanat");
  if (cart) {
    const parsedCart = JSON.parse(cart);
    // تعداد کل آیتم‌های مختلف (محصولات یکتا)
    return Object.keys(parsedCart).length;
  }
  return 0;
}

export {
  getCookie,
  addToCart,
  removeFromCart,
  setCookie,
  clearCart,
  decreaseItemCount,
  getTotalUniqueItems,
  getItemCount,
  updateCartQuantity,
};
