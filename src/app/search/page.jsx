"use client"
import SearchPage from '@/src/components/Main/SearchPage/SearchPage'
import { Suspense } from 'react'
const Page = () => {

  return (
    <Suspense>
        <SearchPage/>
    </Suspense>
  )
}

export default Page