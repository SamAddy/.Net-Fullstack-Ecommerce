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
    products: Product[]
    loading: boolean
    error: string | null
    singleProduct: Product | null
}

export interface CreateProduct {
    name: string
    description: string 
    price: number
    categoryId: string
    inventory: number
    imageUrl: string
}

export interface UpdateProduct {
    id: string
    name: string
    description: string 
    price: number
    categoryId: string
    inventory: number
    imageUrl: string
}

export interface ProductUpdate {
    id: string
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

export interface EditProductModalProps {
    open: boolean;
    product: Product;
    onClose: () => void;
    onSubmit: (updatedProduct: Product) => void;
}

export interface fetchSingleProductProps {
    loading: boolean
    error: string | null
    product: Product | null
}
