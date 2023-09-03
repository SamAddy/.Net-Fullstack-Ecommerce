import React, { useEffect, useState } from 'react'
import ManageLoading from './ManageLoading'
import { ProductState } from '../type/Product'
import useAppDispatch from '../hooks/useAppDispatch'
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { AddShoppingCart, Delete, Edit } from '@mui/icons-material'
import BoldIconButton from '../styles/Component/BoldIconButton'
import useCustomSelector from '../hooks/useCustomSelector';
import { Link } from 'react-router-dom';

const Products = ({ products, loading, error }: ProductState) => {
    const currentUser = useCustomSelector((state) => state.users.currentUser);
    const [ showAdminButtons, setShowAdminButtons ] = useState(false);

    useEffect(() => {
      if (currentUser?.role.toLowerCase() === "admin") {
        setShowAdminButtons(true);
      } 
    }, [currentUser])
  return (
    <>
    <ManageLoading loading={loading} error={error} data={products} >
        {(loadedProducts) => (
            <>
              <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="stretch"
            spacing={3}
            marginTop={4}
            >
                {loadedProducts?.length > 0 && loadedProducts.map((product) => (
                    <Grid item key={product.id} xs={8} sm={4} md={4} lg={2}>
                    <Card
                      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                    >
                      <CardActionArea>
                        <Link to={`/products/${product.id}`}>
                          <CardMedia
                          component="img"
                          sx={{ height: 300, backgroundSize: "contain" }}
                          image={product.imageUrl}
                          title={product.name}
                        />
                        </Link>
                      </CardActionArea>
                      <CardContent>
                        <Typography variant="h5" component="div" textAlign="center">
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{ justifyContent: "space-between", marginTop: "auto" }}
                      >
                        
                        {showAdminButtons ? (
                          <>
                            <BoldIconButton aria-label="delete product" bold>
                              <Delete />
                            </BoldIconButton>
                            <Typography>
                              &euro;{product.price}
                            </Typography>
                            <BoldIconButton aria-label="edit product" bold>
                              <Edit/>
                            </BoldIconButton>
                          </>
                        ) : (
                          <>
                            <BoldIconButton aria-label="add to favorites" bold>
                              <FavoriteBorderSharpIcon />
                            </BoldIconButton>
                            <Typography>
                              &euro;{product.price}
                            </Typography>
                            <BoldIconButton aria-label="add to cart" bold>
                              <AddShoppingCart />
                            </BoldIconButton>
                          </>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            </>
        )}
    </ManageLoading>
    </>
  )
}

export default Products