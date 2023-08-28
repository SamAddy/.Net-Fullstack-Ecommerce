import React, { useState } from 'react'
import { Category, CategoryState } from '../type/Category'
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography } from '@mui/material'
import ManageLoading from './ManageLoading'
import useCustomSelector from '../hooks/useCustomSelector'
import BoldIconButton from '../styles/Component/BoldIconButton'
import { Delete, Edit } from '@mui/icons-material'
import useAppDispatch from '../hooks/useAppDispatch'
import { deleteCartegory, updateCategory } from '../redux/reducers/categoriesReducer'
import EditCategoryModal from './EditCategoryModal'

const CategoryList = ({ categories, loading, error }: CategoryState) => {
  const dispatch = useAppDispatch();
  const currentUser = useCustomSelector((state) => state.users.currentUser);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
    dispatch(deleteCartegory(categoryId))
  }
  return (
    <>
    <ManageLoading loading={loading} error={error} data={categories}>
      {(loadedCategories) => (
        <Grid container spacing={3} justifyContent="center">
          {loadedCategories.map((category) => (
            <Grid item key={category.id}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <CardMedia 
                      component="img"
                      height="250"
                      width="200"
                      image={category.image}
                      alt={category.name}
                    />
                  </CardContent>
                </CardActionArea>
                <Typography variant="h5" component="h5">
                    {category.name}
                </Typography>
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
        category={selectedCategory || { id: '', name: '', image: '' }}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateCategory}
      />
    )}
    </>
  )
}

export default CategoryList