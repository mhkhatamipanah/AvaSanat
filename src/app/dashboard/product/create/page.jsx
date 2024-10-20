"use client"

import CreateProduct from "@/src/components/Dashboard/Product/Create/CreateProduct"
import { Suspense } from "react"

const page = () => {

  return (
    <Suspense>
    <CreateProduct/>
    </Suspense>
  )
}

export default page