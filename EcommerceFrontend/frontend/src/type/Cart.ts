import { Product } from "./Product"

export interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
}

export interface CartState {
    items: CartItem[],
}

