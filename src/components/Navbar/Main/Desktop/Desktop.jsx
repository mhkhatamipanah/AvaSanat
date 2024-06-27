
import { Button, Input } from "@nextui-org/react";
import { ChevronDown, PhoneCall, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Desktop = () => {
    const pathname = usePathname()
    // const [productFlag, setProductFlag] = useState(false)
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
                    <div className='w-full flex justify-between items-center max-w-[1500px] relative MenuContainer'>

                        <ul className='flex justify-start items-center gap-4 w-full h-full'>
                            <li>
                                <Link className={`${pathname === '/' ? 'active' : ''} text-lg`} href='/'>صفحه اصلی</Link>
                            </li>
                            <li>
                                <Link className={`${pathname === '/product' ? 'active' : ''} text-lg flex justify-center items-center gap-1 MegaMenuHover`}

                                    href='/product'>
                                    <div className={`absolute right-0 top-[64px] h-96 bg-white shadow-md border border-gray-200 border-solid w-96 rounded-md p-4 z-50 Menu !transition-all text-black`}  >
                                        adsf
                                    </div>
                                    محصولات
                                    <ChevronDown size={20} className={`arrowIcon transition-all`} />
                                </Link>




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

                        <Button className='text-md bg-[var(--color-1)] text-white' variant="shadow">
                            پیش فاکتور
                        </Button>

                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop