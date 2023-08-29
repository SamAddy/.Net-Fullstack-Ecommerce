import { Product } from "./Product"

export interface Order {
    id: string
    items : Product[]
    quantity: number
}

export interface OrderState {
   orders: Order[]
   loading: boolean
   error: string | null
   singleOrder: Order | null
}