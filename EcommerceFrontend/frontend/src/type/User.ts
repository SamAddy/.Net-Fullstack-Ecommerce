export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: "admin" | "customer"
    avatar: string
    token: string
}

export interface UserState {
    users: User[],
    currentUser?: User | null,
    loading: boolean,
    error: string | null
}

export interface UserCredentials {
    email: string
    password: string
}

// export interface UserUpdate {
//     id: number
//     update: Omit<User, "id">
// }

export interface UserUpdate {
    id: string
    firstName: string
    lastName: string
    token: string
}

export interface NewUser {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface DeleteUser {
    id: string
    token: string
}