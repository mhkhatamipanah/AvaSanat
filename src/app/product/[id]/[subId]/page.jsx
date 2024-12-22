import DetailProduct from "@/src/components/Main/DetailProduct/DetailProduct";
import { BASE_URL } from '@/src/utils/Frontend/ApiActions';
import { get_SSR_Data } from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';


// Generate Metadata Dynamically
export async function generateMetadata({ params , headers }) {
  const { subId } = params;

  try {
    let data = {
      detailProduct: subId
    };
    const baseUrl = BASE_URL || 'http://localhost:3000';
    const detailProduct = await get_SSR_Data(`${baseUrl}/api/product?${(new URLSearchParams(data)).toString()}`);
    const productCodes = detailProduct.data.codeProduct || []; // از API دریافت شود
    const title = detailProduct.data.title
    const description = detailProduct.data.subtitle

      // بررسی URL یا Referrer
      const referrer = headers.get("referer") || ""; // در Next.js می‌توانید از headers استفاده کنید
      let matchedCode = null;
  
      // اگر از گوگل آمده باشد، عبارت جستجو را استخراج کن
      if (referrer.includes("google")) {
        const queryMatch = referrer.match(/q=([^&]*)/); // پیدا کردن کوئری `q` از URL
        if (queryMatch && queryMatch[1]) {
          const query = decodeURIComponent(queryMatch[1]);
  
          // بررسی کدهای فنی در Query
          matchedCode = productCodes.find(item => query.includes(item.code));  // مقایسه با کد `code`
        }
      }
  
      // تیتر نهایی
      const finalTitle = matchedCode
        ? `${title} ${matchedCode.code} | آواصنعت`  // در صورتی که کد پیدا شود، کد به تیتر افزوده می‌شود
        : `${title} | آواصنعت`;  // در غیر این صورت تیتر فقط نام محصول را نمایش می‌دهد
  
    return {
      title: `${finalTitle} | آواصنعت` || 'Default Title',
      description: description || 'Default Description',
      openGraph: {
        title: `${title} | آواصنعت` || 'Default Title',
        description: description || 'Default Description',
     
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The requested blog does not exist.',
    };
  }
}

export default async function Page({ params }) {
  const { subId } = params;

  try {
    let data = {
      detailProduct: subId
    };

    const baseUrl = BASE_URL || 'http://localhost:3000';

    const detailProduct = await get_SSR_Data(`${baseUrl}/api/product?${(new URLSearchParams(data)).toString()}`);


    return (
      <DetailProduct subId={subId} dataServer={detailProduct} />
    );
  } catch (error) {
    console.error('Error in Page Component:', error);

    return (
      <div className="min-h-[70vh]">
        <p>مشکلی پیش آمده</p>
      </div>
    );
  }

}