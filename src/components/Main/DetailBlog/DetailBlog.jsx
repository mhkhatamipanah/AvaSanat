"use client"
import React, { useEffect, useState } from 'react'

import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi'
import PaginationComponent from '../../Dashboard/Pagination/PaginationComponents'
import SideBlog from '../SideBlog/SideBlog'

import parse from 'html-react-parser';
import { Spinner } from '@nextui-org/react'

const DetailBlog = ({  blog , image }) => {

  // const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let data = {
      perPage: perPage,
      page: page,
    };

    // getApi(`/api/blog/${id}`, setData, setLoading)
  }, [page, perPage])

  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )
  return (
    <>
      <section className='flex justify-center w-full my-4 sm:my-8 md:my-11 lg:my-14  min-h-screen'>

        <div className='w-full grid max-[768px]:grid-cols-1 grid-cols-4 gap-3 max-w-[1200px] px-3'>

          <SideBlog />
          <div className='max-[768px]:col-span-1 col-span-3 w-full h-min bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2 flex flex-col justify-center'>
            {blog && blog.length == 0 && LoadingState()}
            {blog && blog.length !== 0 && <>
              <p className='text-right lg:text-xl md:text-lg text-md vazirDemibold text-gray-800 mt-2'>  {blog?.title}</p>
              <p className='text-right text-gray-600 vazirMedium lg:text-lg md:text-base text-sm mb-3 mt-2'>     {blog?.subtitle}</p>


              <div className='w-full flex justify-center'>
                {<img className=' aspect-video object-cover w-full h-full rounded-md max-h-[400px] lg:max-w-[600px] mb-3 border border-gray-200 border-solid shadow-sm' src=
                  {image ? `data:image/webp;base64,${image}` : "/images/placeholder.jpg"} alt="" />}
              </div>

              <div className='custom-container vazirMedium mt-3'>
                {blog?.content && parse(blog?.content)}

              </div>
            </>}

          </div>
        </div>
      </section>
    </>
  )
}

export default DetailBlog