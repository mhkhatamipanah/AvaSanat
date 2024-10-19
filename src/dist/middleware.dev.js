"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = middleware;
exports.config = void 0;

var _server = require("next/server");

var _authMiddleware = require("./middleware/authMiddleware");

var _apiAuthMiddleware = require("./middleware/apiAuthMiddleware");

// import { authMiddleware } from "./src/middleware/authMiddleware"; // وارد کردن Middleware احراز هویت
// import { apiAuthMiddleware } from "./src/middleware/apiAuthMiddleware"; // وارد کردن Middleware بررسی توکن API
function middleware(request) {
  var authResponse = (0, _authMiddleware.authMiddleware)(request);
  if (authResponse) return authResponse;
  var apiResponse = (0, _apiAuthMiddleware.apiAuthMiddleware)(request);
  if (apiResponse) return apiResponse;
  console.log("Final Middleware execution complete"); // لاگ نهایی

  console.log("Auth Middleware executed:", isAuthMiddlewareExecuted());
  console.log("API Auth Middleware executed:", isApiAuthMiddlewareExecuted());
  return _server.NextResponse.next();
}

var config = {
  matcher: ["/((?!_next/static|_next/image|api|admin|.*\\.png$).*)"]
};
exports.config = config;