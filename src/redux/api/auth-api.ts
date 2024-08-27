import { SignUpType} from "../../types/dataTypes";
import { api } from "./index";

const authApi  = api.injectEndpoints({
    endpoints: (build) => ({
            signUp: build.mutation<SignUpType, any>({
            query: (body) => ({
                url: "/auth/sign-up",
                method: "POST",
                body
            }),
            
        }),
        signIn: build.mutation<{ token: string }, { email: string; password: string }>({
            query: (data) => ({
              url: "/auth/sign-in",
              method: "POST",
              body: data
            })
        }),
        verifyOtp: build.mutation<{ token: string }, { email: string; otp: string }>({
            query: (data) => ({
              url: "/auth/send-otp",
              method: "POST",
              body: data
            })
        }),
        resendOtp: build.mutation<{ token: string }, { email: string }>({
            query: (data) => ({
              url: "/auth/resend-otp",
              method: "POST",
              body: data
            })
        })
    })
})

export const { useSignUpMutation, useSignInMutation, useVerifyOtpMutation, useResendOtpMutation  } = authApi