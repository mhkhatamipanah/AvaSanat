"use client"
import { MoreVertical, ChevronLast } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, createContext } from "react"
import logo from "@/public/images/png persian.png"


const SidebarContext = createContext()

export default function Sidebar({ children , setSidebar , sidebar }) {
  
  return (
    <aside className={`h-screen transition-all duration-300 ${!sidebar? 'w-[270px]':'w-[70px]' }`}>
            
      <nav className="h-full  flex flex-col bg-white border-r shadow-sm ">
        <div className="p-4 py-2 flex justify-between items-center h-[64px]  border-gray-200 border-b-[2px] border-l-[2px]">
          <Image
            width={128}
            height={36.8}
            src={logo}
            className={`overflow-hidden transition-all ${
                !sidebar ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <img
          
          />
          <button
            onClick={() => setSidebar((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
           <ChevronLast className={` " duration-700" ${ sidebar ? "rotate-180" : "rotate-0" }`} /> 
          </button>
        </div>
        <SidebarContext.Provider value={{ sidebar }}>
          <ul className="flex-1 px-3 mt-2">{children}</ul>
        </SidebarContext.Provider>

        {/* <div className="border-t flex p-3 ltr">
            <div className="bg-red-400 w-10 h-10 rounded-md flex items-center justify-center font-black font-iranSans_1 pt-1 text-gray-800"> JD</div>
       
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${!sidebar ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div> */}
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, link ,  active, alert }) {
  const { sidebar } = useContext(SidebarContext)
  return (
    <Link href={link}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors duration-300 group !max-h-[40px]
        
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all font-iranSans_3 text-sm  ${
          !sidebar ? "w-52 mr-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute left-3 w-2 h-2 rounded bg-indigo-400 ${
            sidebar ? "" : "top-2"
          }`}
        />
      )}

      {!sidebar && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  )
}