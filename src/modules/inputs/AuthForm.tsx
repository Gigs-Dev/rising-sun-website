'use client';

import { Button } from "@/ui/primitives/buttons/Button";
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import { useAuthMutation } from "@/util/api";
import { Loader, Mail } from "lucide-react";
import LogoIcon from "@/svgs/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

type AuthType = {
    type: 'sign-in' | 'sign-up'
}

type UserPayload = {
  email: string;
  code: string;
};

const AuthForm = ({type}: AuthType) => {

    const [user, setUser] = useState<UserPayload>({
        email: '',
        code: ''
      })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setUser((user) => ({...user, [name]: value}))
    }

      const mutation = useAuthMutation(user.email, type)
    
      const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {email, code} = user;
        type === 'sign-up' ?
        mutation.mutate({email, code}):
        mutation.mutate({email})
      }

    
  return (
    <div className="flex flex-col w-full justify-center items-center">

        {/* Logo Container */}
        <Image
            priority
            src={LogoIcon}
            alt="logo"
            width={90}
            height={90}
            className="mb-4"
            />
        <Text className="text-center font-medium text-[1.2rem] md:text-[1.5rem] text-white">
            {type === 'sign-in' ? 'Sign in to your account': 'Sign up to create account'}
        </Text>

        <Text className="text-center font-light text-[.9rem] md:text-[.9rem] text-gray-300 mb-8">
            Enter your email address below to proceed
         </Text>

        <Box className="w-full max-w-md px-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <Box className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
            />
          </Box>

         { type === 'sign-up' &&
            <Box className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="code"
              name="code"
              type="text"
              autoComplete="off"
              onChange={handleChange}
              placeholder="Referal Code (If any)"
              className="w-full pl-10 pr-4 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
            />
          </Box>}

          <Box className="flex gap-2 items-center justify-end">
             <Text className="text-[.95rem] font-light text-[#ffffff]">
                {type === 'sign-up' ? 'Already have an account?': 'Do not have an account?'}
              </Text>
            <Link href={type === 'sign-up' ? '/sign-in': '/sign-up'}>
              <Text className="text-[.95rem] font-light text-[#2d2c76] md:text-[#d8dfe8]">
                {type === 'sign-up' ? 'Login' :  'Create account'}
              </Text>
            </Link>
          </Box>


          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={mutation.isPending}
          >
          {mutation.isPending && <Loader/>}{" "}

          <Text className="pt-1">{mutation.isPending ? ' Loading...': 'Continue'}</Text>
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default AuthForm;
