import PublicRoute from '@/components/PublicRoute'
import React from 'react'

const layout = ({children}) => {
  return (
    <PublicRoute>{children}</PublicRoute>
  )
}

export default layout