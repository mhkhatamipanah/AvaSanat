import Cookies from "js-cookie";

function getCookie(name) {
  return Cookies.get(name);
}

function setCookie(name, value, options = { expires: 7, path: "/" ,sameSite: "None", secure: true }) {
  Cookies.set(name, value, options);
}
function addToCart(productId, quantity) {
  let cart = getCookie("Avasanat");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  }

  // پارس کردن quantity به یک شیء جاوااسکریپت
  const productDetails = JSON.parse(quantity);

  // اگر محصول قبلاً در سبد خرید موجود است، مقدار count را افزایش دهید
  if (cart[productId]) {
    cart[productId].count++;
  } else {
    // اگر محصول موجود نیست، آن را اضافه کنید
    cart[productId] = { ...productDetails, count: 1 };
  }

  setCookie("Avasanat", JSON.stringify(cart));
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


function removeFromCart(productId) {
  let cart = getCookie("Avasanat");
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

export { getCookie, addToCart, removeFromCart, setCookie, clearCart , decreaseItemCount , getTotalUniqueItems , getItemCount };
