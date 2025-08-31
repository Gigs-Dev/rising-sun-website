'use client';

import React, { ChangeEvent, useState, FormEvent } from "react";
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import Image from "next/image";
import LogoIcon from "@/svgs/logo.svg";
import Link from "next/link";
import { Mail, Loader } from "lucide-react";
import { Button } from "@/ui/primitives/buttons/Button";
import { useSignInMutation } from "@/util/api";



const Page = () => {

  const [email, setEmail] = useState('');

  const signInMutation = useSignInMutation()

  
  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    signInMutation.mutate({email})
  }

  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: `
          radial-gradient(
            ellipse at center,
            rgba(92, 52, 156, 0.6) 15%,
            rgba(17, 17, 29, 1) 85%
          ),
          linear-gradient(to bottom, #0a0a0a, #171717)
        `,
      }}
    >
      {/* Logo Container */}
      <Image
        priority
        src={LogoIcon}
        alt="logo"
        width={90}
        height={90}
        className="mb-4"
      />

      {/* Heading */}
      <Text className="text-center font-medium text-[1.2rem] md:text-[1.5rem] text-white">
        Sign in to your account
      </Text>
      <Text className="text-center font-light text-[.9rem] md:text-[.9rem] text-gray-300 mb-8">
        Enter your email address below to proceed
      </Text>

      {/* Form */}
      <Box className="w-full max-w-md px-4">
        <form className="space-y-6">
          {/* Email Input */}
          <Box className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="true"
              required
              placeholder="Enter your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
            />
          </Box>

          {/* Forgot Password Link */}
          <Box className="flex gap-2 items-center justify-end">
             <Text className="text-[.95rem] font-light text-[#ffffff]">
                Do not have an account?
              </Text>
            <Link href="/sign-up">
              <Text className="text-[.95rem] font-light text-[#2d2c76] md:text-[#d8dfe8]">
                Create account
              </Text>
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            onClick={handleLogin}
            variant="secondary"
            className="w-full bg-[#9d4edd]"
            disabled={signInMutation.isPending}
          >
            { signInMutation.isPending ?
            <Loader/>:
            <Text className="pt-1">Continue</Text>
            }
          </Button>
        </form>
        
      </Box>
    </Box>
  );
};

export default Page;
