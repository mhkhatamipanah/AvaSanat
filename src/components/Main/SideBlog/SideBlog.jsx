import { Diamond } from 'lucide-react'
import React from 'react'

const SideBlog = () => {
    return (
        <div className='col-span-1 w-full h-min flex flex-col gap-3  '>
            <section className='bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2'>
                <div className='flex gap-2 items-center p-1 py-2'>
                    <Diamond className='text-indigo-400' size={14} />
                    <p className='vazirDemibold text-lg text-indigo-600'>
                        آخرین مقالات
                    </p>
                </div>
                {Array(7).fill(null).map((_, index) => (
                    <div className='flex gap-2 items-center border-t-1 border-gray-200 p-2' key={`lastBlog-${index}`}>
                        <div className='rounded-full w-[6px] h-[6px] bg-gray-500' />
                        <p className='vazirMedium text-md text-gray-700'>
                            آخرین مقالات
                        </p>
                    </div>
                ))}
            </section>

            <section className='bg-white rounded-md boxShadow3 border border-gray-200 border-solid p-2'>
                <div className='flex gap-2 items-center p-1 py-2'>
                    <Diamond className='text-indigo-400' size={14} />
                    <p className='vazirDemibold text-lg text-indigo-600'>
                        آخرین مقالات
                    </p>
                </div>
                {Array(7).fill(null).map((_, index) => (
                    <div className='flex gap-2 items-center border-t-1 border-gray-200 p-2' key={index}>
                        <div className='rounded-full w-[6px] h-[6px] bg-gray-500' />
                        <p className='vazirMedium text-md text-gray-700'>
                            آخرین مقالات
                        </p>
                    </div>
                ))}
            </section>

        </div>
    )
}

export default SideBlog