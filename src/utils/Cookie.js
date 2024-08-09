import Cookies from "js-cookie";

function getCookie(name) {
  return Cookies.get(name);
}

function setCookie(name, value, options = { expires: 7, path: "/" }) {
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
 
function getTotalItemCount() {
  const cart = getCookie("Avasanat");
  if (cart) {
    const parsedCart = JSON.parse(cart);
    // جمع کل تعداد اقلام
    return Object.values(parsedCart).reduce((total, item) => total + item.count, 0);
  }
  return 0;
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

function updateLocalStorageItemCount() {
  const cart = Cookies.get("Avasanat");
  let totalItems = 0;
  
  if (cart) {
    const parsedCart = JSON.parse(cart);
    totalItems = Object.values(parsedCart).reduce((total, item) => total + item.count, 0);
  }
  
  localStorage.setItem('itemCount', totalItems);
}

export { getCookie, addToCart, removeFromCart, setCookie, clearCart };
