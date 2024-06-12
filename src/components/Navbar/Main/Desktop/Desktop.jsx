import React from 'react'
import { Input } from "@nextui-org/react";
const Desktop = () => {
    return (
        <>
            <nav>
                <section className="w-full flex justify-center items-center px-5 bg-red-500 text-white h-12">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex'>
                            <div>   logo</div>
                            <div>
                                <Input
                                          startContent={
                                          <Search/>
                                          } />
                            </div>

                        </div>
                        <div>
                            پیش فاکتور
                        </div>
                    </div>

                </section>
                <section className="w-full flex justify-center px-5 ">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex'>
                            <div>   logo</div>
                            <div>search bar </div>

                        </div>
                        <div>
                            پیش فاکتور
                        </div>
                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop