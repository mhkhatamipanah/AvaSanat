"use client"
import { getCookie } from '@/src/utils/Cookie';
import React from 'react'

const page = () => {
  if( getCookie("Avasanat")){
    var cart = JSON.parse(  getCookie("Avasanat"))
    console.log(cart)
  }
  return (
    <>
      <div className='h-fit flex justify-center items-center xl:px-0 px-6 vazirMedium mb-20'>

        <section className='w-full flex flex-col items-center mt-2 lg:mt-8 min-h-screen max-w-screen-2xl'>
          <div className='grid grid-cols-6 w-full px-4'>
            <div className='col-span-5 w-full'>2</div>
            <div className='col-span-1 w-full h-[250px] border border-gray-300 rounded-lg'>1</div>
          </div>
        </section>
      </div>
    </>
  )
}

export default page