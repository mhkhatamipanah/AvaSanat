"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function setCookie(name, value, options) {
  var cookieString = name + "=" + value;

  if (options.expires) {
    cookieString += "; expires=" + options.expires.toGMTString();
  }

  if (options.path) {
    cookieString += "; path=" + options.path;
  }

  if (options.domain) {
    cookieString += "; domain=" + options.domain;
  }

  if (options.secure) {
    cookieString += "; secure";
  }

  if (options.httponly) {
    cookieString += "; httponly";
  }

  document.cookie = cookieString;
}

var _default = setCookie;
exports["default"] = _default;