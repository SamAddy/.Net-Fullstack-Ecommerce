import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CategoriesComponent from './components/CategoriesComponent';
import TestComponents from './components/TestComponents';
import SigninPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductsDisplay from './components/ProductsDisplay';
import AdminPage from './pages/AdminPage';
import TestProducts from './components/TestProducts';
import ProductPage from './pages/ProductPage';
import CategoryProducts from './components/CategoryProducts';
import FavoriteProducts from './components/FavoriteProducts';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesComponent />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductsDisplay />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/testProducts" element={<TestProducts />} />
        <Route path="/testProducts/:id" element={<ProductPage />} />
        <Route path="/testCategories" element={<TestComponents />} />
        <Route path="/favorite" element={<FavoriteProducts />} />
      </Routes>
    </Router>
  );
}
export default App