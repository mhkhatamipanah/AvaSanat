import { Button } from "@nextui-org/react";
import Link from "next/link";

export const metadata = {
  title: "صفحه یافت نشد (404) | آوا صنعت",
  description:
    "صفحه‌ای که به دنبال آن هستید وجود ندارد. لطفاً به صفحه اصلی بازگردید یا از بخش مقالات تخصصی ما دیدن کنید.",
  keywords: "صفحه 404, خطای 404, صفحه یافت نشد, آوا صنعت, بازگشت به صفحه اصلی",
  openGraph: {
    title: "صفحه یافت نشد (404)",
    description:
      "متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد. برای ادامه از گزینه‌های دیگر استفاده کنید.",
  },
};

// app/not-found.js
export default function NotFound() {
  return (
    <div className="h-[70vh] flex justify-center items-center flex-col" style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="vazirDemibold mb-5 text-sm sm:text-md md:text-xl">
        صفحه یافت نشد (404)
      </h1>
      <p className="vazirMedium mb-5 text-xs sm:text-base md:text-md">
        متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد.
      </p>
      <Link href="/">
        <Button className="vazirMedium">بازگشت به صفحه اصلی</Button>
      </Link>
    </div>
  );
}
