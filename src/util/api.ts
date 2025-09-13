'use client';

import { useMutation } from "@tanstack/react-query"
import SERVER from "./server"
import useUserStore from "@/store/state/use-user-state"
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

interface AuthProps{
  email: string;
  code?: string
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface ErrorResponse {
  msg: string;
}




export const useAuthMutation = (user: string, type: 'sign-up' | 'sign-in') => {
  const setAuthEmail = useUserStore((state) => state.setEmail);
  const router = useRouter();

  const mutation = useMutation<ApiResponse, AxiosError, AuthProps>({
    mutationFn: async (userData: AuthProps) => {
      const response = type === 'sign-up' ? 
      await SERVER.post<ApiResponse>(`auth/signupotp`, userData):
      await SERVER.post<ApiResponse>(`auth/signinotp`, userData);

      return response.data;
    },
    onSuccess: (data) => {
     setAuthEmail(user)
     {type === 'sign-up' ?
      toast.success(`${ data.message || 'Signup successful! Please verify your OTP.'}`, {...toastOptions}) && router.push('/verify-registration'):

      toast.success(`${ data.message || 'Signin successful! Please verify your OTP.'}`, {...toastOptions}) &&  router.push("/verify-otp");
     }
      // setTimeout(() => {
      //   router.push("/verify-otp");
      // }, 800);
    },
    onError: (error) => {
      toast.error(`${(error as AxiosError<ErrorResponse>)?.response?.data?.msg || error.message || 'Something went wrong, please try again later'}`, {...toastOptions})

    },
  });

  return mutation;
};



// export const useVerifyOtpMutation = () => {
//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       const res = await SERVER.post('/', data);
//       return res.data
//     },
//     onSuccess: (data) => {

//     },
//     onError: (error) => {

//     },
//   })

//   return mutation;
// }

