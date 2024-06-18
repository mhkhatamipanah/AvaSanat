
import React from 'react'
import { Input , Button } from "@nextui-org/react";
import { Search, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Desktop = () => {
    const pathname = usePathname()
    return (
        <>
            <nav className='vazirLight'>
                <section className="w-full flex justify-center items-center px-7 bg-[var(--color-2)] text-white h-14 ">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex w-96'>
                            <div className='flex justify-center items-center'>   logo</div>
                            <div className='mr-3'>
                                <Input

                                    className='inputNextUi caret-black !rounded-sm'
                                    placeholder='جست و جو ...'
                                    startContent={
                                        <Search color='var(--color-2)' />
                                    } />
                            </div>

                        </div>
                        <a href="tel:+989023665306" className='flex justify-center items-center gap-2'>
                            <p className='ltr'>0902 366 5306</p>
                            <PhoneCall />

                        </a>

                    </div>

                </section>
                <section className="w-full flex justify-center px-7 h-16 bg-white">
                    <div className='w-full flex justify-between items-center max-w-[1500px]'>
                        <ul className='flex gap-4 '>
                            <li>
                                <Link className={`${pathname === '/' ? 'active' : ''} text-lg`} href='/'>صفحه اصلی</Link>
                            </li>
                            <li>
                                <Link className={`${pathname === '/product' ? 'active' : ''} text-lg`} href='/product'>محصولات</Link>
                            </li>
                            <li>
                                <Link className={`${pathname === '/blogs' ? 'active' : ''} text-lg`} href='/blogs'>مقالات</Link>
                            </li>
                            <li>

                                <Link className={`${pathname === '/about-us' ? 'active' : ''} text-lg`} href='/about-us'>درباره ما</Link>
                            </li>
                            <li>

                                <Link className={`${pathname === '/contact-us' ? 'active' : ''} text-lg`} href='/contact-us'>تماس با ما </Link>
                            </li>
                        </ul>

                        <Button className='text-md bg-[var(--color-1)] text-white'  variant="shadow">
                        پیش فاکتور
                        </Button>
                      
                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop