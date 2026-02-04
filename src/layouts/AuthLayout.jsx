import React from 'react'
import AppHeader from '../component/AppHeader'
import AppSidebar from '../component/AppSidebar'
import { Outlet } from 'react-router-dom'
import { Card } from '@mui/material'

const AuthLayout = () => {
  return (
     <div className="main-layout">
      <AppHeader /> 

      <div className="main-body">
        <AppSidebar />
        <div className="main-content">
            <Card variant="outlined" sx={{p:3,borderRadius:3, minHeight:'87vh'}}>
                <Outlet />
            </Card>
       
        </div>
      </div>
    </div>
  )
}

export default AuthLayout