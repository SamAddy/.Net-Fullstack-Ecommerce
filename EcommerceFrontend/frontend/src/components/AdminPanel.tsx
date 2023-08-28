import { Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'

import AddProductView from './Admin/AddProductView';
import AddCategoryView from './Admin/AddCategoryView';
import AddAdminView from './Admin/AddAdminView';
import HomePage from '../pages/HomePage';

const AdminPanel = () => {
    const [currentView, setCurrentView] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'add-product':
        return <AddProductView />;
      case 'add-category':
        return <AddCategoryView />;
      case 'add-admin':
        return <AddAdminView />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Drawer variant="permanent">
        <List>
        <ListItem button onClick={() => handleViewChange('home')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleViewChange('add-product')}>
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem button onClick={() => handleViewChange('add-category')}>
            <ListItemText primary="Add Category" />
          </ListItem>
          <ListItem button onClick={() => handleViewChange('add-admin')}>
            <ListItemText primary="Add Admin" />
          </ListItem>
        </List>
      </Drawer>
      {renderView()}
    </div>
  );
};

export default AdminPanel