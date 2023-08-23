import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductsComponent from './redux/components/ProductsComponent';
import NotFoundPage from './pages/NotFoundPage';
import TestComponents from './redux/components/TestComponents';
import CategoriesComponent from './redux/components/CategoriesComponent';



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
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App