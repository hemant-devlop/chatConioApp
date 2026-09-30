'use client'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { authStatus } = useAuth()
    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            router.push('/login')
        }
    }, [authStatus, router])
    if (authStatus === 'loading') { return (<div>loading...</div>) }
    if (authStatus === 'unauthenticated') { return null; }
    return children
}

export default ProtectedRoute