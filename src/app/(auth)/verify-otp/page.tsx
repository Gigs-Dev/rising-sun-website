import React from 'react';
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import Image from "next/image";
import LogoIcon from "@/svgs/logo.svg";

const VerifyOtp = () => {
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

         <Box className="w-full max-w-md px-4">
          <p></p>
         </Box>
    </Box>
  )
}

export default VerifyOtp;
