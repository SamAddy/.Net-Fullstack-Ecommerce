import React from 'react'
import { IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { ProductProps } from '../../type/Product'
import useAppDispatch from '../../hooks/useAppDispatch'
import { addToCart } from '../../redux/reducers/cartReducer';
import useCustomSelector from '../../hooks/useCustomSelector';

const ShoppingCartButton = ({ product }: ProductProps) => {
    const dispatch = useAppDispatch();
    const cartItems = useCustomSelector((state) => state.cart.items);
    const productIndexInCart = cartItems.findIndex((item) => item.product.id === product.id);

    const handleAddToCart = () => {
        if (productIndexInCart !== -1) {
            const updatedQuantity = cartItems[productIndexInCart].quantity + 1;
            dispatch(addToCart({ product, quantity: updatedQuantity }));
        } else {
            dispatch(addToCart({ product, quantity: 1}))
        }
    }
    
  return (
    <IconButton onClick={handleAddToCart}>
          <AddShoppingCart color='inherit' />
      </IconButton>
  )
}

export default ShoppingCartButton