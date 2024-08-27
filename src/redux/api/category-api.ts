import { api } from "./index";
import { FetchCategory } from "../../types/dataTypes";

const categoriesApi  = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<FetchCategory, void>({
            query: () => ({
                url: "/categories"
            }),
            providesTags: ["CATEGORIES"]
        })
    })
})

export const { useGetCategoriesQuery } = categoriesApi