import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsComponent from './components/ProductsComponent';
import CategoriesComponent from './components/CategoriesComponent';
import TestComponents from './components/TestComponents';
import SigninPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesComponent />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsComponent />} />
      </Routes>
    </Router>
  );
}
export default App