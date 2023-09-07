import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TestComponents from './components/TestComponents';
import SigninPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductsDisplay from './components/ProductsDisplay';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import CategoryProducts from './components/CategoryProducts';
import FavoriteProducts from './components/FavoriteProducts';
import ShoppingCart from './components/ShoppingCart';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFoundPage';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout><HomePage /></Layout> } />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products" element={ <Layout><ProductsDisplay /></Layout> } />
        <Route path="/products/:id" element={ <Layout><ProductPage /></Layout> } />
        <Route path="/signin" element={ <Layout showFooter={false}><SigninPage /></Layout> } />
        <Route path="/signup" element={ <Layout showFooter={false}><SignUpPage /></Layout> } />
        <Route path="/profile" element={ <Layout><ProfilePage /></Layout> } />
        <Route path="/admin" element={ <Layout><AdminPage /></Layout>} />
        <Route path="/cart" element={ <Layout><ShoppingCart /></Layout> } />
        <Route path="/favorite" element={ <Layout><FavoriteProducts /></Layout> } />
        <Route path="/test" element={<TestComponents />} />
        <Route path="*" element={ <Layout><NotFoundPage /></Layout> } />
      </Routes>
    </Router>
  );
}
export default App