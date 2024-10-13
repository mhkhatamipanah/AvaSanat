import DetailBlog from '@/src/components/Main/DetailBlog/DetailBlog';
import React from 'react'

const Page = ({params}) => {
  const { id } = params;

  return (
    <>
    <DetailBlog id={id}/>
    </>
  )
}

export default Page