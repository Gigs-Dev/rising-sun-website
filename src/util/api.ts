'use client';

import { useMutation } from "@tanstack/react-query"
import SERVER from "./server"
import useUserStore from "@/store/state/use-user-state"
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

interface SignUpProps{
  email: string;
  code: string
}

interface SignInProps {
  email: string
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}


export const useSignInMutation = () => {

  const router = useRouter();

  const mutation = useMutation<ApiResponse, AxiosError, SignInProps>({
    mutationFn: async ({ email }: SignInProps) => {
      const response = await SERVER.post<ApiResponse>("auth/signinotp", { email });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Sign-in successful! Please verify your OTP.", { ...toastOptions });

      setTimeout(() => {
        router.push("/verify-otp");
      }, 800);
    },
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || error.message || "Something went wrong, please try again later";
      toast.error(message, { ...toastOptions });
      console.error("Sign-in Error:", message);
    },
  });

  return mutation
}


export const useSignUpMutation = (user: string) => {
  const setAuthEmail = useUserStore((state) => state.setEmail);
  const router = useRouter();

  return useMutation<ApiResponse, AxiosError, SignUpProps>({
    mutationFn: async (userData: SignUpProps) => {
      const response = await SERVER.post<ApiResponse>(`auth/signupotp`, userData);
      return response.data;
    },
    onSuccess: (data) => {
      setAuthEmail(user);
      toast.success(`${ data.message || 'Signup successful! Please verify your OTP.'}`, {...toastOptions})
      setTimeout(() => {
        router.push("/verify-otp");
      }, 800);
    },
    onError: (error) => {
      toast.error(`${error?.response?.data || error.message || 'Something went wrong, please try again later'}`, {...toastOptions})
      console.error("Signup Error:", error.response?.data || error.message);
    },
  });
};



export const useVerifyOtpMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await SERVER.post('/', data);
      return res.data
    },
    onSuccess: (data) => {

    },
    onError: (error) => {

    },
  })

  return mutation;
}

