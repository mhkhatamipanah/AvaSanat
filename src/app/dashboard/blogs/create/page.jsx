"use client"
import CreateBlog from '@/src/components/Dashboard/Blog/Create/CreateBlog'
import { Suspense } from 'react'
const Page = () => {

  return (
    <Suspense>
    <CreateBlog/>
    </Suspense>
  )
}

export default Page