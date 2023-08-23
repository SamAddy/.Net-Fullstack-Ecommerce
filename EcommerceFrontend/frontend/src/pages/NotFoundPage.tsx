import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Box className="page-not-found">
            <Typography className="page-not-found__title" variant="h1" component="h1">
                Oops!
            </Typography>
            <Box className="page-not-found__animation-container">
                <Box className="page-not-found__illustration"></Box>
            </Box>
            <Typography className="page-not-found__message" component="p">
                It seems you've wandered off the shopping path. Let's get you back on track!
            </Typography>
            <Link to="/" className="page-not-found__link">
                Return to Home
            </Link>
        </Box>
    )
}

export default NotFoundPage