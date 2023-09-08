import React from 'react'

import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={"/"} color="inherit">
        Shop Waves
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright