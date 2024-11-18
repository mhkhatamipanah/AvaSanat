"use client"
import SearchPage from '@/src/components/Main/SearchPage/SearchPage'
import { Suspense } from 'react'
import PageHead from './PageHead'
const Page = () => {

  return (
    <>
    <PageHead />
    <Suspense>
      <SearchPage />
    </Suspense>
  </>
  )
}

export default Page