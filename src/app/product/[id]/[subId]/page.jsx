import DetailProduct from "@/src/components/Main/DetailProduct/DetailProduct";
import { BASE_URL } from '@/src/utils/Frontend/ApiActions';
import { get_SSR_Data } from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';


// Generate Metadata Dynamically
export async function generateMetadata({ params  }) {
  const { subId } = params;

  try {
    let data = {
      detailProduct: subId
    };
    const baseUrl = BASE_URL || 'http://localhost:3000';
    const detailProduct = await get_SSR_Data(`${baseUrl}/api/product?${(new URLSearchParams(data)).toString()}`);
    const title = detailProduct.data.title
    const description = detailProduct.data.subtitle

    const productCodes = detailProduct.data.feature
    .flatMap(e => e.values) // تمام مقادیر آرایه values در هر feature را مسطح می‌کنیم
    .filter(e => e.productCode) // فقط مقادیری که productCode دارند را فیلتر می‌کنیم
    .map(e => e.productCode) // فقط productCode ها را برمی‌گردانیم
    .join(" - "); // آن‌ها را با کاما به هم وصل می‌کنیم
  
    const fullDescription = `${description} ${productCodes}`;
    return {
      title: `${title} | آواصنعت` || 'Default Title',
      description: fullDescription || 'Default Description',
      openGraph: {
        title: `${title}` || 'Default Title',
        description: fullDescription || 'Default Description',
     
      },
    };
  } catch (err) {
    console.log(err)

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