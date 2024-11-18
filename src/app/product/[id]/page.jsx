import AllProductInCategory from "@/src/components/Main/AllProductInCategory/AllProductInCategory";
import { BASE_URL } from '@/src/utils/Frontend/ApiActions';
import { get_SSR_Data } from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';


// Generate Metadata Dynamically
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    let data = {
      filterCategory: id
    };
    const baseUrl = BASE_URL || 'http://localhost:3000';
    const productCategory = await get_SSR_Data(`${baseUrl}/api/product?${(new URLSearchParams(data)).toString()}`);
    const title = productCategory.category.title
    const description = productCategory.category.description
    return {
      title: `${title} | آواصنعت` || 'Default Title',
      description: description || 'Default Description',
      openGraph: {
        title: `${title} | آواصنعت` || 'Default Title',
        description: description || 'Default Description',
        // images: [
        //   {
        //     url: blog?.image ? `data:image/webp;base64,${blogData.image}` : '/images/default-og-image.jpg',
        //     width: 1200,
        //     height: 630,
        //     alt:title || 'Default Title',
        //   },
        // ],
      },
    };
  } catch {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog does not exist.',
    };
  }
}

export default async function Page({ params }) {
  const { id } = params;

  try {
    let data = {
      filterCategory: id
    };

    const baseUrl = BASE_URL || 'http://localhost:3000';

    const productCategory = await get_SSR_Data(`${baseUrl}/api/product?${(new URLSearchParams(data)).toString()}`);


    return (
      <AllProductInCategory id={id} dataServer={productCategory} />
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
