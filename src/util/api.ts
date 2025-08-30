'use client';

import { useMutation } from "@tanstack/react-query"
import SERVER from "./server"
import useUserStore from "@/store/state/use-user-state"
import { useRouter } from "next/navigation";



export const useSignInMutation = (email: string) => {
    
    const setAuthEmail = useUserStore((state) => state.setEmail)
    
    const router = useRouter();

    const mutation = useMutation({
    mutationFn: (email: string) =>  SERVER.post(`auth/signinotp`, { email }),
    onSuccess: () => {
      setAuthEmail(email)
      router.push('/verify-otp')
    },
    onError: (error: any) => {
      console.error('Error', error.message)
    }
  })

  return mutation
}


export const useSignUpMutation = (user: {}) => {
    const router = useRouter();

    const mutation = useMutation({
    mutationFn: (email: string) =>  SERVER.post(`auth/signupotp`, user),
    onSuccess: () => {
      router.push('/verify-otp')
    },
    onError: (error: any) => {
      console.error('Error', error.message)
    }
  })

  return mutation
}

