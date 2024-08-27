import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IFormValues{
    name?: string | null
    model?: string | null
    category?: string | null
    status?: string | null
    description?: string | null
    images?: string[] | []
    thumbnail?: string
}

const initialState: IFormValues = {
    name: null,
    model: null,
    category: null,
    status: "active",
    description: null,
    images: [],
    thumbnail: ""
}