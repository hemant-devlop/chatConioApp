import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/authContext'
import React from 'react'

const layout = ({ children }) => {
  const {authStatus} =useAuth()
  return (
    <ProtectedRoute>
      <div className='fixed right-10 top-5 z-999 bg-red-500 text-white text-lg'>{authStatus}</div>
      {children}
      </ProtectedRoute>
  )
}

export default layout