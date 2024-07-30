
import { Button, Input } from "@nextui-org/react";
import { ChevronDown, ChevronLeft, ContactRound, FileText, Home, PhoneCall, Search, ShoppingBag, ShoppingCart, Vote } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'
import logo from "@/public/images/png persian.png"
import { useEffect, useState } from "react";
import fetchCategory from "@/src/utils/Frontend/allApiLogicFront/Category/CategoryListFetch";
function getOffsetRight(element) {
    if (element) {
        const parent = element.offsetParent;
        const parentWidth = parent ? parent.offsetWidth : document.documentElement.clientWidth;
        const offsetRight = parentWidth - (element.offsetLeft + element.offsetWidth);
        return offsetRight;
    }

}
function spanMove(parentTag) {
    const right = getOffsetRight(parentTag)
    document.getElementsByClassName("spanUnderLineHover")[0].style.width = `0px`

    document.getElementsByClassName("spanUnderLineHover")[0].style.width = `${parentTag.clientWidth}px`
    if (right || right === 0) {
        document.getElementsByClassName("spanUnderLineHover")[0].style.right = `${right}px`
    }
}

const Desktop = () => {


    const [Category, setCategory] = useState(null)
    const fetchCategoryApi = async () => {
        const data = await fetchCategory()
        setCategory(data)
    }

    useEffect(() => {
        fetchCategoryApi()
    }, [])

    const pathname = usePathname()
    const router = useRouter()

    const spanHoverEnter = (e) => {


        if (document.getElementsByClassName("spanUnderLineHover")[0] && ( e.target.tagName === "P" || e.target.tagName === "svg" || e.target.tagName === "SPAN")) {
         
            if (e.target.tagName === "P") {
                var parentTag = e.target.parentNode
            }
            if (e.target.tagName === "SPAN") {
                var parentTag = e.target.parentNode
            }
            if (e.target.tagName === "svg") {
                if (e.target.parentNode.tagName === "SPAN") {
                    var parentTag = e.target.parentNode.parentNode
                } else {
                    var parentTag = e.target.parentNode
                }
            }
            spanMove(parentTag)



        }
    }
    const spanHoverLeave = (e) => {
        if (document.getElementsByClassName("spanUnderLineHover")[0]) {
            const navbarContainer = document.getElementsByClassName("NavbarContainer")[0]
            if (navbarContainer) {
                const links = navbarContainer.querySelectorAll('a');
                switch (pathname) {
                    case '/':
                        spanMove(links[0])
                        break;
                    case '/product':
                        spanMove(document.getElementById("product"))
                        break;
                    case '/blogs':
                        spanMove(links[2])
                        break;
                    case '/about-us':
                        spanMove(links[3])
                        break;
                    case '/contact-us':
                        spanMove(links[4])
                        break;

                    default:
                        console.log('Unknown fruit!');
                }
            }

        }
    }


    useEffect(() => {
        spanHoverLeave()
    }, [pathname])



    return (
        <>

            <nav className='vazirLight sticky w-full shadow-md'>
                <section className="w-full flex justify-center items-center px-7 bg-white text-white h-16 ">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex items-center'>
                            <div className='flex justify-center items-center text-black'>
                                <Image className="object-contain h-10 w-min ml-3 " src={logo} alt="logo" />
                            </div>
                            <div className='mr-3 w-96'>
                                <Input

                                    className='inputNextUi caret-black !rounded-sm'
                                    placeholder='جست و جو ...'
                                    startContent={
                                        <Search color='var(--color-2)' />
                                    } />
                            </div>

                        </div>
                        <a href="tel:+989023665306" className='flex justify-center items-center gap-3 text-black'>
                            <p className='ltr text-[16px]'>0902 366 5306</p>
                            <div className="rounded-md bg-red-200 flex justify-center items-center p-2">
                                <PhoneCall className="text-[var(--color-1)]" />

                            </div>

                        </a>

                    </div>

                </section>
                <section className="w-full flex justify-center px-7 h-12 bg-white sticky top-0">
                    <div className='w-full flex justify-between items-center max-w-[1500px] relative MenuContainer'>

                        <ul className='relative flex justify-start items-center gap-5 w-full h-full NavbarContainer'>
                            <span className="absolute h-[3px] rounded-md w-0 bg-red-400 bottom-0 transition-all spanUnderLineHover"></span>

                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <Home className={`${pathname === '/' ? 'active' : ''} text-[14px]`} />
                                <p className={`${pathname === '/' ? 'active' : ''} text-[14px]`}>صفحه اصلی</p>
                            </Link>
                            <div id="product" onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} className="h-full flex justify-center items-center gap-[6px] px-[2px] MegaMenuHover" href='/product' >
                                <ShoppingCart className={`${pathname.includes("/product") ? 'active' : ''} text-[14px]`} />
                                <span className={`${pathname.includes("/product") ? 'active' : ''} h-full text-[14px] flex justify-center items-center gap-1 `}

                                >
                                    <div className={`absolute right-0 top-[48px]  max-h-[300px] w-[400px] bg-white shadow-md border border-gray-200 border-solid rounded-md z-50 Menu !transition-all text-black`}  >
                                        <section className="gap-y-2 gap-x-8 flex flex-col flex-wrap max-h-[300px] p-4 min-w-0">
                                            <Link href="/product" className="flex items-center">
                                                <div className="bg-[#df5658] w-1 h-3 ml-2 rounded-lg"></div>
                                                <h6 className="text-[12px] text-gray-600 vazirMedium">همه دسته بندی ها</h6>
                                                <ChevronLeft className="text-gray-600" size={16} />
                                            </Link>
                                            {Category && Category.data &&
                                                Category.data.map((e) => {
                                                    return (
                                                        <Link href={`/product/${e.route}`} className="flex items-center" key={e._id}>
                                                            <div className="bg-[#df5658] w-1 h-4 ml-2 rounded-lg"></div>
                                                            <h6 className="text-[17px] vazirMedium">{e.title}</h6>
                                                            <ChevronLeft className="text-gray-600" size={18} />
                                                        </Link>
                                                    )
                                                })}


                                        </section>

                                    </div>
                                    محصولات
                                    <ChevronDown size={20} className={`arrowIcon transition-all`} />
                                </span>




                            </div>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} className="h-full flex justify-center items-center gap-[6px] px-[2px]" href='/blogs'>
                                <FileText className={`${pathname === '/blogs' ? 'active' : ''} text-[14px]`} />

                                <p className={`${pathname === '/blogs' ? 'active' : ''} text-[14px]`}>مقالات</p>
                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/about-us' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <ContactRound className={`${pathname === '/about-us' ? 'active' : ''} text-[14px]`} />

                                <p className={`${pathname === '/about-us' ? 'active' : ''} text-[14px]`} >درباره ما</p>
                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/contact-us' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <Vote className={`${pathname === '/contact-us' ? 'active' : ''} text-[14px]`} />

                                <p className={`${pathname === '/contact-us' ? 'active' : ''} text-[14px]`} >تماس با ما </p>
                            </Link>
                        </ul>
                        <Button className='text-md bg-[var(--color-1)] text-white rounded-md ' variant="shadow">
                            <ShoppingBag size={28} />
                            <p className="text-[14px]">
                                پیش فاکتور

                            </p>



                        </Button>

                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop