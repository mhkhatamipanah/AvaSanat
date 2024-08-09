import React from 'react'

const AllBlogs = () => {
    return (
        <>
            <section className=' flex justify-center w-full my-20 min-h-screen   '>

                <div className='w-full grid grid-cols-5 gap-3 max-w-[1500px]'>

                    <div className='col-span-1 w-full h-20  bg-white rounded-md shadow-md border border-gray-200 border-solid   '>hi</div> 
                    <div className='col-span-4 w-full h-20 bg-red-300'>AllBlogs</div> 
                </div>
            </section>
        </>
    )
}

export default AllBlogs