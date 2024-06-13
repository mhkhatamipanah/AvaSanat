"use client"
import { usePathname } from "next/navigation"
import { Main } from "./Main/Main"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <>
    {pathname!=="/login" && <Main/> }
   
    </>
  )
}

export default Navbar