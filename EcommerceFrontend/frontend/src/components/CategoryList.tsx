import React, { useState } from "react";
import { Category, CategoryState } from "../type/Category";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import ManageLoading from "./ManageLoading";
import useCustomSelector from "../hooks/useCustomSelector";
import BoldIconButton from "../styles/Component/BoldIconButton";
import { Delete, Edit } from "@mui/icons-material";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  deleteCartegory,
  updateCategory,
} from "../redux/reducers/categoriesReducer";
import EditCategoryModal from "./EditCategoryModal";
import { Link } from "react-router-dom";

const CategoryList = ({ categories, loading, error }: CategoryState) => {
  const dispatch = useAppDispatch();
  const currentUser = useCustomSelector((state) => state.users.currentUser);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    dispatch(updateCategory(updatedCategory));
    // setCategoryList(prevCategories =>
    //   prevCategories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
    // );
    setIsEditModalOpen(false);
  };

  const handleDelete = (categoryId: string) => {
    dispatch(deleteCartegory(categoryId));
  };
  return (
    <>
      <ManageLoading loading={loading} error={error} data={categories}>
        {(loadedCategories) => (
          <Grid container spacing={3} justifyContent="center" padding={6}>
            {loadedCategories?.length > 0 && loadedCategories.map((category) => (
              <Grid item key={category.id} xs={8} sm={4} md={4} lg={2}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 300, backgroundSize: "contain" }}
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link to={`/categories/${category.id}`}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          borderRadius: 5,
                          boxShadow: 3,
                          transition: "opacity 1.3s",
                          "&:hover": {
                            opacity: 1.7,
                          },
                        }}
                      >
                        SHOP NOW
                      </Button>
                    </Link>
                  </CardContent>
                  {currentUser?.role.toLowerCase() === "admin" && (
                    <>
                      <BoldIconButton
                        aria-label="delete product"
                        bold
                        onClick={() => handleDelete(category.id)}
                      >
                        <Delete />
                      </BoldIconButton>
                      <BoldIconButton
                        aria-label="edit product"
                        bold
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit />
                      </BoldIconButton>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </ManageLoading>
      {isEditModalOpen && (
        <EditCategoryModal
          open={isEditModalOpen}
          category={selectedCategory || { id: "", name: "", image: "" }}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateCategory}
        />
      )}
    </>
  );
};

export default CategoryList;
