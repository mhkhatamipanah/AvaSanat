// Import Dependencies
import DetailBlog from '@/src/components/Main/DetailBlog/DetailBlog';
import { BASE_URL } from '@/src/utils/Frontend/ApiActions';
import { get_SSR_Data } from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';


// Generate Metadata Dynamically
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const baseUrl = BASE_URL || 'http://localhost:3000';
    const blogData = await get_SSR_Data(`${baseUrl}/api/blog/${id}`, id); // Fetch data once
    const blog = blogData.results[0];

    return {
      title: blog?.title || 'Default Title',
      description: blog?.subtitle || 'Default Description',
      openGraph: {
        title: blog?.title || 'Default Title',
        description: blog?.subtitle || 'Default Description',
        // images: [
        //   {
        //     url: blog?.image ? `data:image/webp;base64,${blogData.image}` : '/images/default-og-image.jpg',
        //     width: 1200,
        //     height: 630,
        //     alt: blog?.title || 'Default Title',
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

// Server Component to Render Blog Detail
export default async function Page({ params }) {
  const { id } = params;

  try {
    const baseUrl = BASE_URL || 'http://localhost:3000';
    const blogData = await get_SSR_Data(`${baseUrl}/api/blog/${id}`, id); // Fetch data once
    const blog = blogData.results[0];
    const image = blogData.image;

    return (
      <DetailBlog blog={blog} id={id} image={image} />
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
