import React, { useState } from 'react'
import { EditProductModalProps } from '../../type/Product'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const EditProductModal = ({ open, product, onClose, onSubmit}: EditProductModalProps) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
      };
      const handleSubmit = () => {
        onSubmit(editedProduct);
        onClose();
      };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle gutterBottom>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          name="name"
          label="Product Name"
          value={editedProduct.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="price"
          label="Price"
          type="float"
          value={editedProduct.price}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="description"
          label="Description"
          value={editedProduct.description}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="categoryId"
          label="Category Id"
          value={editedProduct.categoryId}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="inventory"
          label="Inventory"
          type="number"
          value={editedProduct.inventory}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="description"
          label="Description"
          value={editedProduct.imageUrl}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProductModal