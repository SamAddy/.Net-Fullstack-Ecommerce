import { Category } from "./Category"

export interface Product {
    id: string
    name: string 
    price: number
    description: string 
    category: Category
    inventory: number
    imageUrl: string
}

export interface ProductState {
    products: Product[],
    loading: boolean,
    error: string | null
}

export interface CreateProduct {
    title: string 
    price: number
    description: string 
    categoryId: string
    inventory: number
    imageUrl: string
}

export interface ProductUpdate {
    id: number
    update: Partial<Omit<Product, "id">> & { id?: never }
}

export interface ProductProps {
    product: Product
}

export interface FileUploadResponse {
    originalname: string;
    filename: string;
    location: string;
}
