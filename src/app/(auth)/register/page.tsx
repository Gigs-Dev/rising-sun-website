"use client";

import React, { useState } from "react";
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import Image from "next/image";
import LogoIcon from "@/svgs/logo.svg";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Page = () => {


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
        Sign up to create account
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
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
            />
          </Box>

          <Box className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="code"
              name="code"
              type="text"
              autoComplete="off"
              // required
              placeholder="Referal Code (If any)"
              className="w-full pl-10 pr-4 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
            />
          </Box>

          <Box className="flex gap-2 items-center justify-end">
             <Text className="text-[.95rem] font-light text-[#ffffff]">
                Already have an account?
              </Text>
            <Link href="/login">
              <Text className="text-[.95rem] font-light text-[#2d2c76] md:text-[#d8dfe8]">
                Login
              </Text>
            </Link>
          </Box>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#9d4edd] text-[#f1f5f8] rounded-[10px] hover:bg-[#9d4edd] focus:outline-none focus:ring-2 focus:ring-[#9d4edd] font-regular trailing-[1rem]"
          >
            <Text className="pt-1">Continue</Text>
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default Page;
