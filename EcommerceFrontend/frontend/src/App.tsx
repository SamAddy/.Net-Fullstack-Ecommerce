import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductsComponent from './components/ProductsComponent';
import NotFoundPage from './pages/NotFoundPage';
import TestComponents from './components/TestComponents';
import CategoriesComponent from './components/CategoriesComponent';
import SigninPage from './pages/SignInPage';

const App = () => { 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductsComponent />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "categories/",
      element: <CategoriesComponent />
    },
    {
      path: "test/",
      element: <TestComponents />
    },
    {
      path: "signin/",
      element: <SigninPage />
    },
    {
      path: "signup/",
      element: <NotFoundPage />
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App