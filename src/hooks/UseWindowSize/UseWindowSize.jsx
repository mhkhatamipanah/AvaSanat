import { useEffect,useState } from "react"
export default function UseWindowSize(){
    const[windowSize , setWindowSize] = useState({
      width: 0 , 
      height: 0 ,
    })
    useEffect(() => {
      const handler =()=>{
        setWindowSize({
          width: window.innerWidth , 
          height:window.innerHeight
        })
      }
      handler()
      window.addEventListener('resize', handler)
    
      return () => {
        window.removeEventListener('resize' , handler)
      }
    }, [])
    
    return windowSize
  }
  