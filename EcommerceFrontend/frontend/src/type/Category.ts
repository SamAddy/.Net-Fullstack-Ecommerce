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
}

export interface NewCategory {
    name: string
    image: string
}

