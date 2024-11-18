import AllCategory from "@/src/components/Main/AllCategory/AllCategory";

export const metadata = {
  title: "دسته‌بندی‌های آوا صنعت | محصولات صنعتی و ابزار ",
  description: "مروری بر تمامی دسته‌بندی‌های محصولات و خدمات آوا صنعت. از ابزار دقیق تا قطعات اتوماسیون صنعتی، بهترین کیفیت و قیمت را تجربه کنید.",
  keywords: "دسته‌بندی‌ها, محصولات صنعتی, ابزار دقیق, آوا صنعت, قطعات صنعتی, اتوماسیون صنعتی",
  openGraph: {
    title: "دسته‌بندی‌های آوا صنعت",
    description: "با تمامی دسته‌بندی‌های محصولات آوا صنعت آشنا شوید و بهترین قطعات صنعتی را بیابید.",
    // image: "/images/categories-banner.png", // لینک به یک تصویر مناسب
    // url: "https://yourwebsite.com/categories", // لینک به صفحه دسته‌بندی‌ها
  },

};


const Page = () => {


  return (
    <>
     <AllCategory/>

    </>
  )
}

export default Page;