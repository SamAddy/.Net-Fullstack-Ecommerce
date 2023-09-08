import React, { useState } from 'react'
import { Alert, AlertColor, Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { createProduct } from '../../../redux/reducers/productsReducer';
import { defaultTheme } from '../../../styles/Component/Shared';


const AddProductView = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState("");
    const [inventory, setInventory] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
    const [alertMessage, setAlertMessage] = useState("");

    const handleSuccess = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setCategoryId("");
        setInventory(0);
        setImageUrl("");
    
        setShowAlert(true);
        setAlertSeverity("success");
        setAlertMessage("Product created successfully!");
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const action = await dispatch(
                createProduct({ name, description, price, categoryId, inventory, imageUrl })
              );
              if (createProduct.fulfilled.match(action)) {
                if (typeof action.payload === "string") {
                  setShowAlert(true);
                  setAlertSeverity("error");
                  setAlertMessage(action.payload);
                } else {
                  handleSuccess();
                }
              } else {
                setShowAlert(true);
                setAlertSeverity("error");
                setAlertMessage("Invalid data passed.");
              }
        } catch (error) {
          setShowAlert(true);
          setAlertSeverity("error");
          setAlertMessage("Error occured while creating admin.");
        }
      };
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component={"main"} maxWidth="xs">
            <CssBaseline />
            <Typography variant="h4" gutterBottom>Add New Product</Typography>
            {showAlert && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} marginTop={1}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    value={name}
                    onChange={(n) => setName(n.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(desc) => setDescription(desc.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(p) => setPrice(parseFloat(p.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="categoryId"
                    label="Category Id"
                    id="categoryId"
                    value={categoryId}
                    onChange={(cate) => setCategoryId(cate.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="inventory"
                    label="Inventory"
                    name="inventory"
                    type="number"
                    value={inventory}
                    onChange={(inv) => setInventory(parseInt(inv.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="imageUrl"
                    label="Image Url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(img) => setImageUrl(img.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add new product
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      );
    };
    
export default AddProductView