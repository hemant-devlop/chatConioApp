'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/authContext'
import React from 'react'

const layout = ({ children }) => {
  const {authStatus} =useAuth()
  return (
    <ProtectedRoute>
      {children}
      </ProtectedRoute>
  )
}

export default layout