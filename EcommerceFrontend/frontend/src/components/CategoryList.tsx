import React from 'react'
import { CategoryState } from '../type/Category'
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography } from '@mui/material'
import ManageLoading from './ManageLoading'

const CategoryList = ({ categories, loading, error }: CategoryState) => {
    
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
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </ManageLoading>
    </>
  )
}

export default CategoryList