"use client"
import { usePathname } from "next/navigation"
import { Main } from "./Main/Main"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <>
    {(pathname!=="/login" && !pathname.includes("/dashboard")) && <Main/> }
   
    </>
  )
}

export default Navbar