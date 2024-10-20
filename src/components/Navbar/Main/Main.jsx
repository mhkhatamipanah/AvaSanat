import Desktop from "@/src/components/Navbar/Main/Desktop/Desktop"
import UseWindowSize from "@/src/hooks/UseWindowSize/UseWindowSize"
import SideBarMobile from "@/src/components/Navbar/Main/Mobile/SideBarMobile"

export const Main = () => {
    const { width } = UseWindowSize()


    return (
        <>
            {width < 768 ? <SideBarMobile/> : <Desktop />}

        </>
    )
}
