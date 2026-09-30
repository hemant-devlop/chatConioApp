'use client'

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react"


const page = () => {
  const router=useRouter()
  const {authStatus}=useAuth()
  console.log(authStatus)
  useEffect(()=>{
    if(authStatus === 'authenticated'){
      router.push('/home')
    }else if(authStatus === 'unauthenticated'){
      router.push('/login') 
    }
  },[authStatus])

 if (authStatus === 'authenticated') {
    return null
  }
 if (authStatus === 'unauthenticated') {
    return null
  }
  return (
    <div>loading......</div>
  )
}

export default page