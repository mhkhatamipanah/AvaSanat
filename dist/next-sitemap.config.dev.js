"use strict";

module.exports = {
  siteUrl: "https://ava-sanat.vercel.app/",
  // آدرس اصلی سایت
  generateRobotsTxt: true,
  // تولید فایل robots.txt
  changefreq: "daily",
  // به‌روزرسانی روزانه
  priority: 0.7,
  // اولویت نسبی URL‌ها
  sitemapSize: 5000,
  // حداکثر URL‌ها در هر فایل سایت‌مپ
  autoLastmod: true,
  // افزودن تاریخ آخرین به‌روزرسانی
  exclude: ["/dashboard/*", // مسیر داشبورد
  "/login", // صفحه لاگین
  "/api/*" // مسیرهای API
  ],
  transform: function transform(config, url) {
    return regeneratorRuntime.async(function transform$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(url === "/")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              loc: url,
              changefreq: "daily",
              priority: 1.0
            });

          case 2:
            if (!url.startsWith("/products")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", {
              loc: url,
              changefreq: "weekly",
              priority: 0.8
            });

          case 4:
            return _context.abrupt("return", {
              loc: url,
              changefreq: "monthly",
              priority: 0.7
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  robotsTxtOptions: {
    policies: [{
      userAgent: "*",
      allow: "/"
    }, {
      userAgent: "Googlebot",
      allow: "/"
    }, {
      userAgent: "BadBot",
      disallow: "/"
    }]
  }
};