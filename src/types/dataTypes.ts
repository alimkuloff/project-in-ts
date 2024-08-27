export type User = {
    first_name: string,
    last_name: string,
    phone_number: string,
    avatar: string | null,
    status: string,
    role: string,
    email: string,
    email_verified: boolean,
    password: string,
    likes: string[],
}

export type Car = {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    status: string,
    rent_price: number,
    color: string,
    model: string,
    category: string,
    year: number,
    fuel: string,
    transmission: string,
    seats: number,
    colors: string[],
    user_id: null | string[],
    thumbnail: string,
    discount: number,
    capacity_fuel: number,
    usage_per_km: number,
}

export type Category = {
    _id: string,
    name: string,
    image: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export type FetchCar = {
    message: string,
    payload: Car[]
}

export type FetchCategory = {
    message: string,
    payload: Category[]
}

export type UploadImages = {
    message: string,
    payload: string[]
}

export type UploadImage = {
    message: string,
    payload: string
}

export type SignUpType = {
    message: string,
    payload: User
}

