module.exports = {
  siteUrl: "https://ava-sanat.vercel.app/", // آدرس اصلی سایت
  generateRobotsTxt: true, // تولید فایل robots.txt
  changefreq: "daily", // به‌روزرسانی روزانه
  priority: 0.7, // اولویت نسبی URL‌ها
  sitemapSize: 5000, // حداکثر URL‌ها در هر فایل سایت‌مپ
  autoLastmod: true, // افزودن تاریخ آخرین به‌روزرسانی
  exclude: [
    "/dashboard/*", // مسیر داشبورد
    "/login", // صفحه لاگین
    "/api/*", // مسیرهای API
  ],
  transform: async (config, url) => {
    if (url === "/") {
      return { loc: url, changefreq: "daily", priority: 1.0 };
    }
    if (url.startsWith("/products")) {
      return { loc: url, changefreq: "weekly", priority: 0.8 };
    }
    return { loc: url, changefreq: "monthly", priority: 0.7 };
  },
 
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "BadBot", disallow: "/" },
    ],
  
  },
};
