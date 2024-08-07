import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Blogs from './Blogs/Blogs'
import Brands from './Brands/Brands'
import Landing from './Landing/Landing'
import Proforma_Invoice from './Proforma_Invoice/Proforma_Invoice'

const Home = () => {
  return (
    <>
    <Landing/>
    <Brands/>
    <AboutUs/>
    <Proforma_Invoice/>
    <Blogs/>
    </>
  )
}

export default Home