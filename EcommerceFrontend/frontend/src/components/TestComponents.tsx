import React, { useEffect, useState } from 'react'

export interface Category {
    id: string
    name: string
    image: string
  }
  
  export interface Product {
    id: string
    name: string 
    price: number
    description: string 
    category: Category
    inventory: number
    images: string[]
  }
  
  export interface User {
    id: string
    firstName: string
    lastName: string
    email: string 
    role: string
  }
  
  export interface Category {
    id: string
    name: string
    image: string
  }

const TestComponents = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async (): Promise<void> => {
        try {
            const response = await fetch("http://localhost:5034/api/v1/categories");
            // const response = await fetch("https://api.escuelajs.co/api/v1/categories");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
  return (
    <div>
    <h2>Categories</h2>
    <ul>
      {categories.map(category => (
        <li key={category.id}>
          {category.name}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default TestComponents