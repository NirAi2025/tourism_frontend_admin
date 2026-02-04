import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SkeltonLoader = () => {
  return (
    <Box sx={{ width: '100%' }} >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  )
}

export default SkeltonLoader