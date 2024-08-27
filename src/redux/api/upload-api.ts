import { UploadImages, UploadImage } from "../../types/dataTypes";
import { api } from "./index";

const uploadApi  = api.injectEndpoints({
    endpoints: (build) => ({
        uploadMultipleFiles: build.mutation<UploadImages, FormData>({
            query: (body) => ({
                url: "/upload/multiple",
                method: "POST",
                body
            })
        }),
        uploadSingleFile:  build.mutation<UploadImage, FormData>({
            query: (body) => ({
                url: "/upload/single",
                method: "POST",
                body
            })
        })
    })
})

export const { useUploadMultipleFilesMutation, useUploadSingleFileMutation } = uploadApi