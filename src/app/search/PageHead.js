"use client";

import Head from "next/head";
import { useSearchParams } from "next/navigation";

const PageHead = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("Category");
  const brand = searchParams.get("brand");

  // ساخت عنوان و توضیحات داینامیک
  const title = query
    ? `نتایج جستجو برای "${query}" | آواصنعت`
    : "جستجو در آواصنعت";
  const description = query
    ? `جستجوی "${query}" در دسته‌بندی ${category || "تمامی دسته‌ها"} و برند ${
        brand || "تمامی برندها"
      }. بهترین محصولات صنعتی را بیابید.`
    : "از قابلیت جستجوی پیشرفته آواصنعت برای یافتن محصولات و قطعات صنعتی استفاده کنید.";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`جستجو, ${query}, ${category}, ${brand}`} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      {/* <meta property="og:image" content="/images/no-resualt.png" /> */}
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
    </Head>
  );
};

export default PageHead;
