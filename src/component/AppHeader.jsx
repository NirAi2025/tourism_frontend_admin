import { Button } from '@mui/material'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='top-header d-flex justify-content-between'>
        Admin
        <ul className='d-flex align-items-center gap-4'>
          <li>
            <Button variant="contained" onClick={() => alert('Clicked!')}>
    Log out
    </Button>
           
          </li>
        </ul>
    </div>
  )
}

export default AppHeader