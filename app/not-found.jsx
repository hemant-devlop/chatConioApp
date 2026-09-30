'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const notFound = () => {
    const router=useRouter()
    function backme(){
        router.back()
    }
    useEffect(()=>{
        const timer=setTimeout(backme,1000);

        return ()=>{
            clearTimeout(timer)
        } 
    },[])
  return (
    <div className="font-black text-5xl h-screen flex justify-center items-center">This page not exits</div>
  )
}

export default notFound