import { User } from "../types/dataTypes";

export type AuthSliceInitialState = {
    token: string | null,
    user: User | null
}