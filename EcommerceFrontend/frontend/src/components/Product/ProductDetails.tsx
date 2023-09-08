import React from 'react'
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { EuroSymbol, ShoppingCart } from '@mui/icons-material';

import { ProductProps } from '../../type/Product'

const ProductDetails = ({ product }: ProductProps) => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="subtitle1">{product.description}</Typography>
            <Typography variant="h5" gutterBottom>&euro;{product.price}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              startIcon={<ShoppingCart />}
              sx={{ margin: '8px 0' }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth 
              startIcon={<EuroSymbol />}
              sx={{ margin: '8px 0' }}
            >
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails