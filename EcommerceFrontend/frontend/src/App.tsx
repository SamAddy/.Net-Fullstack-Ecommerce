import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TestComponents from './components/TestComponents';
import SigninPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductsDisplay from './components/Product/ProductsDisplay';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import CategoryProducts from './components/Category/CategoryProducts';
import FavoriteProducts from './components/Product/FavoriteProducts';
import ShoppingCart from './components/Product/ShoppingCart';
import Layout from './components/Shared/Layout';
import NotFoundPage from './pages/NotFoundPage';
import CategoriesComponent from './components/Category/CategoriesComponent';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout><HomePage /></Layout> } />
        <Route path="/categories" element={ <Layout><CategoriesComponent /></Layout> } />
        <Route path="/categories/:id" element={ <Layout><CategoryProducts /></Layout> } />
        <Route path="/products" element={ <Layout><ProductsDisplay /></Layout> } />
        <Route path="/products/:id" element={ <Layout><ProductPage /></Layout> } />
        <Route path="/signin" element={ <Layout showFooter={false}><SigninPage /></Layout> } />
        <Route path="/signup" element={ <Layout showFooter={false}><SignUpPage /></Layout> } />
        <Route path="/profile" element={ <Layout><ProfilePage /></Layout> } />
        <Route path="/admin" element={ <Layout showFooter={false}><AdminPage /></Layout>} />
        <Route path="/cart" element={ <Layout><ShoppingCart /></Layout> } />
        <Route path="/favorite" element={ <Layout showFooter={false}><FavoriteProducts /></Layout> } />
        <Route path="/test" element={<TestComponents />} />
        <Route path="*" element={ <Layout showFooter={false}><NotFoundPage /></Layout> } />
      </Routes>
    </Router>
  );
}
export default App