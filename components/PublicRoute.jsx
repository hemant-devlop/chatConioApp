'use client'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PublicRoute = ({ children }) => {
    const { authStatus } = useAuth()
    const router=useRouter()
    useEffect(() => {
        if(authStatus==='authenticated'){
                router.replace('/home')
        }
    }, [authStatus,router])
    if (authStatus === 'loading') { return <div>loading...</div>; }
    if (authStatus === 'authenticated') { return null; }
    return children
}

export default PublicRoute