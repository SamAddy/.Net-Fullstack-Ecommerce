import React, { useState } from "react";
import { EditCategoryModalProps } from "../../type/Category";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  open,
  category,
  onClose,
  onSubmit,
}) => {
  const [editedCategory, setEditedCategory] = useState(category);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedCategory);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle gutterBottom>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          name="name"
          label="Category Name"
          value={editedCategory.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          name="image"
          label="Category Image"
          value={editedCategory.image}
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
  );
};

export default EditCategoryModal;
