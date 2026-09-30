import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children}) => {
  return (
    <ProtectedRoute>{children}</ProtectedRoute>
  )
}

export default layout