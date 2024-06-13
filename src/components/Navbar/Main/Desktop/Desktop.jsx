"use client"
import React from 'react'
import { Input } from "@nextui-org/react";
import { Search, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const Desktop = () => {
    const pathname = usePathname()
    return (
        <>
            <nav className='vazirLight'>
                <section className="w-full flex justify-center items-center px-7 bg-[var(--color-2)] text-white h-12 ">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex w-96'>
                            <div className='flex justify-center items-center'>   logo</div>
                            <div className='mr-3'>
                                <Input
                                    className='inputNextUi caret-black'
                                    placeholder='جست و جو ...'
                                    startContent={
                                        <Search color='var(--color-2)' />
                                    } />
                            </div>

                        </div>
                        <div className='flex justify-center items-center'>
                            پیش فاکتور
                        </div>
                    </div>

                </section>
                <section className="w-full flex justify-center px-7 h-12 bg-white">
                    <div className='w-full flex justify-between items-center max-w-[1500px]'>
                        <ul className='flex gap-4'>
                            <li>
                                <Link className={`${pathname === '/' ? 'active' : ''}`} href='/'>صفحه اصلی</Link>
                            </li>
                            <li>
                                <Link className={`${pathname === '/product' ? 'active' : ''}`} href='/product'>محصولات</Link>
                            </li>
                            <li>
                                <Link className={`${pathname === '/blog' ? 'active' : ''}`} href='/blog'>مقالات</Link>
                            </li>
                            <li>

                                <Link className={`${pathname === '/about' ? 'active' : ''}`} href='/about'>درباره ما</Link>
                            </li>
                            <li>

                                <Link className={`${pathname === '/contact' ? 'active' : ''}`} href='/contact'>تماس با ما </Link>
                            </li>
                        </ul>
                        <a href="tel:+989023665306" className='flex justify-center items-center gap-2'>
                            <p className='ltr'>0902 366 5306</p>
                            <PhoneCall />

                        </a>

                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop