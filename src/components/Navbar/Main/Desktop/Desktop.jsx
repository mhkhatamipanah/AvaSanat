
import { Button, Input } from "@nextui-org/react";
import { ChevronDown, ContactRound, FileText, Home, PhoneCall, Search, ShoppingBag, ShoppingCart, Vote } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function getOffsetRight(element) {
    if (element) {
        const parent = element.offsetParent;
        const parentWidth = parent ? parent.offsetWidth : document.documentElement.clientWidth;
        const offsetRight = parentWidth - (element.offsetLeft + element.offsetWidth);
        return offsetRight;
    }

}
function spanMove (parentTag){
    const right = getOffsetRight(parentTag)

    document.getElementsByClassName("spanUnderLineHover")[0].style.width = `${parentTag.clientWidth}px`
    if (right) {
        document.getElementsByClassName("spanUnderLineHover")[0].style.right = `${right}px`
    }
}

const Desktop = () => {
    const pathname = usePathname()

    const spanHoverEnter = (e) => {


        if (document.getElementsByClassName("spanUnderLineHover")[0] && (e.target.tagName === "A" || e.target.tagName === "P" || e.target.tagName === "svg")) {

            if (e.target.tagName === "A") {
                var parentTag = e.target
            }
            if (e.target.tagName === "P") {
                var parentTag = e.target.parentNode
            }
            if (e.target.tagName === "svg") {
                if (e.target.parentNode.tagName === "P") {
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
          const navbarContainer =  document.getElementsByClassName("NavbarContainer")[0]
            if (navbarContainer) {
                const links = navbarContainer.querySelectorAll('a');
                switch(pathname) {
                    case '/':
                        spanMove(links[0])
                        break;
                    case '/product':
                        spanMove(links[1])
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

    

    return (
        <>

            <nav className='vazirLight sticky shadow-md'>
                <section className="w-full flex justify-center items-center px-7 bg-white text-white h-16 ">
                    <div className='w-full flex justify-between max-w-[1500px]'>


                        <div className='flex w-96'>
                            <div className='flex justify-center items-center text-black'>   logo</div>
                            <div className='mr-3 w-96'>
                                <Input

                                    className='inputNextUi caret-black !rounded-sm'
                                    placeholder='جست و جو ...'
                                    startContent={
                                        <Search color='var(--color-2)' />
                                    } />
                            </div>

                        </div>
                        <a href="tel:+989023665306" className='flex justify-center items-center gap-2 text-black'>
                            <p className='ltr'>0902 366 5306</p>
                            <div className="rounded-md bg-red-200 flex justify-center items-center p-2">
                                <PhoneCall className="text-[var(--color-1)]" />

                            </div>

                        </a>

                    </div>

                </section>
                <section className="w-full flex justify-center px-7 h-[16] bg-white sticky top-0">
                    <div className='w-full flex justify-between items-center max-w-[1500px] relative MenuContainer'>

                        <ul className='relative flex justify-start items-center gap-5 w-full h-full NavbarContainer'>
                            <span className="absolute h-[4px] rounded-md w-0 bg-red-400 -bottom-[2px] transition-all spanUnderLineHover"></span>

                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <Home className={`${pathname === '/' ? 'active' : ''} text-lg`} />
                                <p className={`${pathname === '/' ? 'active' : ''} text-lg`}>صفحه اصلی</p>
                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} className="h-full flex justify-center items-center gap-[6px] px-[2px] MegaMenuHover" href='/product' >
                                <ShoppingCart className={`${pathname === '/product' ? 'active' : ''} text-lg`} />
                                <p className={`${pathname === '/product' ? 'active' : ''} h-full text-lg flex justify-center items-center gap-1 `}

                                >
                                    <div className={`absolute right-0 top-[64px] h-96 bg-white shadow-md border border-gray-200 border-solid w-96 rounded-md p-4 z-50 Menu !transition-all text-black`}  >
                                        adsf
                                    </div>
                                    محصولات
                                    <ChevronDown size={20} className={`arrowIcon transition-all`} />
                                </p>




                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} className="h-full flex justify-center items-center gap-[6px] px-[2px]" href='/blogs'>
                                <FileText className={`${pathname === '/blogs' ? 'active' : ''} text-lg`} />

                                <p className={`${pathname === '/blogs' ? 'active' : ''} text-lg`}>مقالات</p>
                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/about-us' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <ContactRound className={`${pathname === '/about-us' ? 'active' : ''} text-lg`} />

                                <p className={`${pathname === '/about-us' ? 'active' : ''} text-lg`} >درباره ما</p>
                            </Link>
                            <Link onMouseLeave={spanHoverLeave} onMouseMoveCapture={spanHoverEnter} href='/contact-us' className="h-full flex justify-center items-center gap-[6px] px-[2px]">
                                <Vote className={`${pathname === '/contact-us' ? 'active' : ''} text-lg`} />

                                <p className={`${pathname === '/contact-us' ? 'active' : ''} text-lg`} >تماس با ما </p>
                            </Link>
                        </ul>
                        <Button className='text-md bg-[var(--color-1)] text-white rounded-md' variant="shadow">
                            <ShoppingBag size={32} />
                            پیش فاکتور


                        </Button>

                    </div>

                </section>
            </nav>

        </>
    )
}

export default Desktop