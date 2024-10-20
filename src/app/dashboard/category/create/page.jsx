"use client"
import Category from '@/src/components/Dashboard/Category/Create/CreateCategory'
import { Suspense } from 'react'
const Page = () => {

  return (
    <Suspense>
    <Category/>
    </Suspense>
  )
}

export default Page