import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material'

import ManageLoading from '../Shared/ManageLoading'
import { Product, ProductState, UpdateProduct } from '../../type/Product'
import useAppDispatch from '../../hooks/useAppDispatch'
import BoldIconButton from '../../styles/Component/BoldIconButton'
import useCustomSelector from '../../hooks/useCustomSelector';
import { deleteProduct, updateProduct } from '../../redux/reducers/productsReducer';
import EditProductModal from './EditProductModal';
import FavoriteButton from './FavoriteButton';
import ShoppingCartButton from './ShoppingCartButton'

const Products = ({ products, loading, error }: ProductState) => {
    const dispatch = useAppDispatch();
    const currentUser = useCustomSelector((state) => state.users.currentUser);
    const [ showAdminButtons, setShowAdminButtons ] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<UpdateProduct | null>(
      null
    );
    useEffect(() => {
      if (currentUser?.role.toLowerCase() === "admin") {
        setShowAdminButtons(true);
      } 
    }, [currentUser])

    const handleDelete = (producdId: string) => {
      dispatch(deleteProduct(producdId));
    }

    const handleUpdateProduct = (updatedProduct: UpdateProduct) => {
      dispatch(updateProduct(updatedProduct))
    }

    const handleEditProduct = (product: Product) => {
      const categoryId = product.category.id;
      const updatedProduct: UpdateProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: categoryId,
        inventory: product.inventory,
        imageUrl: product.imageUrl,
      };
      setSelectedProduct(updatedProduct);
      setIsEditModalOpen(true);
    }
  return (
    <>
    <ManageLoading loading={loading} error={error} data={products} >
        {(loadedProducts) => (
            <>
              <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            padding={7}
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
                            <BoldIconButton 
                              aria-label="delete product" 
                              bold
                              onClick={() => handleDelete(product.id)}
                            >
                              <Delete />
                            </BoldIconButton>
                            <Typography fontSize='1.5rem'>
                              &euro;{product.price}
                            </Typography>
                            <BoldIconButton 
                              aria-label="edit product" 
                              bold
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit/>
                            </BoldIconButton>
                          </>
                        ) : (
                          <>
                            <FavoriteButton favProduct={product} aria-label="add to favorites" />
                            <Typography>
                              &euro;{product.price}
                            </Typography>
                            <ShoppingCartButton product={product} />
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
    {isEditModalOpen && (
      <EditProductModal 
        open={isEditModalOpen} 
        product={selectedProduct || { id: "", name: "", price: 0, description: "", categoryId: "", inventory: 0, imageUrl: ""}} 
        onClose={() => setIsEditModalOpen(false)} 
        onSubmit={handleUpdateProduct} 
      />
    )}
    </>
  )
}

export default Products