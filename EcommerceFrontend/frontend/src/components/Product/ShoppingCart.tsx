import React from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useCustomSelector from "../../hooks/useCustomSelector";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/reducers/cartReducer";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useCustomSelector((state) => state.cart.items);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart({ id: productId }));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ id: productId, quantity: newQuantity }));
  };
  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          padding: "1.5em",
          textAlign: "center",
        }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={2}>
        {cartItems.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h5" align="center">Cart is empty.</Typography>
        </Grid>
        ) : (
          cartItems &&
          cartItems.map((cartItem) => (
            <Grid item xs={12} key={cartItem.product.id}>
              <Paper elevation={1} style={{ padding: "8px" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <img
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.name}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      {cartItem.product.name}
                    </Typography>
                    <Typography variant="body2">
                      Price: &euro;{cartItem.product.price}
                    </Typography>
                    <Typography variant="body2">
                      Quantity:{" "}
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.product.id,
                            cartItem.quantity - 1
                          )
                        }
                      >
                        -
                      </IconButton>
                      {cartItem.quantity}
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.product.id,
                            cartItem.quantity + 1
                          )
                        }
                      >
                        +
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveItem(cartItem.product.id)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default ShoppingCart;
