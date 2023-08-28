import React, { useEffect, useState } from 'react'
import useCustomSelector from '../hooks/useCustomSelector'
import useAppDispatch from '../hooks/useAppDispatch';
import { deleteProduct, fetchAllProducts, updateProduct } from '../redux/reducers/productsReducer';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import BoldIconButton from '../styles/Component/BoldIconButton';
import { AddShoppingCart, Delete, Edit } from '@mui/icons-material';
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { Product, ProductUpdate } from '../type/Product';
import EditProductModal from './EditProductModal';

const TestProducts = () => {
    const dispatch = useAppDispatch();
    const products = useCustomSelector((state) => state.products.products);
    const loading = useCustomSelector((state) => state.products.loading);
    const error = useCustomSelector((state) => state.products.error);
    const currentUser = useCustomSelector((state) => state.users.currentUser);
    const [ showAdminButtons, setAdminButtons ] = useState(false);
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productList, setProductList] = useState<Product[]>([]);

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
      };

      const handleUpdateProduct = (updatedProduct: ProductUpdate) => {
        dispatch(updateProduct(updatedProduct));
        setIsEditModalOpen(false);
      };

    const handleDelete = (productId: string) => {
        dispatch(deleteProduct(productId));
    };

    useEffect(() => {
        fetchAllProducts({
          searchKeyword: null,
          sortBy: null,
          sortDescending: false,
          pageNumber: 1,
          pageSize: 10,
        });
    
        if (currentUser?.role.toLowerCase() === "admin") {
          setAdminButtons(true);
        } 
      }, [currentUser, dispatch]);

  return (
    <div>
        <h1>Products</h1>
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={8} sm={4} md={4} lg={2}>
            <Card
              // sx={{ width: 300, height: "100%" }}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, backgroundSize: "contain" }}
                image={product.imageUrl}
                title={product.name}
              />
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
                    <Typography>
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
      {isEditModalOpen && (
      <EditProductModal
        open={isEditModalOpen}
        product={selectedProduct || { id: '', name: '', price: 0, description: '', categoryId: '', inventory: 0, imageUrl:  }}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateProduct}
      />
    )}
    </div>
  )
}

export default TestProducts