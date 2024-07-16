import React from 'react'
import Title from '../Title/Title'
import AboutUs from './AboutUs/AboutUs'
import Blogs from './Blogs/Blogs'
import Brands from './Brands/Brands'
import Proforma_Invoice from './Proforma_Invoice/Proforma_Invoice'

const Home = () => {
  return (
    <>
    <section className="flex justify-center w-full h-[calc(100vh-96px)] bg-gray-100">
      <Title text={"سلام"} size={32}/>
    </section>
    <Brands/>
    <AboutUs/>
    <Proforma_Invoice/>
    <Blogs/>
    </>
  )
}

export default Home