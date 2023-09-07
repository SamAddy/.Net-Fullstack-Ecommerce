import { Product } from "./Product"

export interface Category {
    id: string
    name: string
    image: string
}

export interface CategoryState {
    categories: Category[]
    loading: boolean
    error: string | null
    categoryProducts?: Product[]
    singleCategory?: Category | null
}

export interface NewCategory {
    name: string
    image: string
}

export interface EditCategoryModalProps {
    open: boolean;
    category: Category;
    onClose: () => void;
    onSubmit: (updatedCategory: Category) => void;
}
