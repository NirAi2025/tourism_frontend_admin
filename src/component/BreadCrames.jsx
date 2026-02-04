import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'

const BreadCrames = ({text}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" className='mb-4'>
  <Link underline="hover" color="inherit" href="/">
    Admin
  </Link>

  <Typography sx={{ color: 'text.primary' }}>{text}</Typography>
</Breadcrumbs>
  )
}

export default BreadCrames