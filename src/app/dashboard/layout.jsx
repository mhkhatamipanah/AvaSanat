import ProviderSideBar from "../../components/Dashboard/SideBar/ProviderSideBar";

export default function RootLayout({ children }) {
    return(

        <>
    <ProviderSideBar getChildren={children}/>
    </>
        )
}