import React from 'react'
import { Box, Button, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();

    const handleProducts = () => {
        navigate("/products");
    };
  return (
    <Box
      sx={{
        background:
        'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.6) 100%), url("./assets/zara.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(70vh - 64px)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Shop Waves is here for you!
      </Typography>
     
      <Typography variant="h5" gutterBottom>
        Find Your Favorites & Explore New Treasures
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleProducts}
      >
        Explore Products
      </Button>
    </Box>
  )
}

export default HeroSection