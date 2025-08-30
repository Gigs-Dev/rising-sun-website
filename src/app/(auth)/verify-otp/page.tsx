'use client';

import React, { useState } from 'react';
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import Image from "next/image";
import LogoIcon from "@/svgs/logo.svg";
import OtpInput from '@/modules/inputs/OtpModule';
import SERVER from '@/util/server';
import { useRouter } from "next/navigation";
import useUserStore from '@/store/state/use-user-state'
import Link from 'next/link';




const VerifyOtp = () => {


  const router = useRouter();
  const { email, setToken } = useUserStore();

  const [otp, setOtp] = useState('');

  const handleOtpChange = (val: string) => {
    setOtp(val)
  }


  const handleSubmit = async  () => {

    try {
      const res = await SERVER.post('auth/signin', { code: otp, email })
      if(res.data){
        const token = res.data.token;
        setToken(token)
         router.replace('/')
      }
      
    } catch (error: unknown) {
      console.error(error)
    }
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
        Verfy your Email
        </Text>
        <Text className="text-center font-light text-[.9rem] md:text-[.9rem] text-gray-300 mb-1">
          Enter the 4-digits pin sent to your mail
        </Text>

         <Box className="w-full max-w-md px-4 flex flex-col gap-4">
          <OtpInput onChange={handleOtpChange} className='text-[#292994]'/>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-[#9d4edd] text-[#f1f5f8] rounded-[10px] hover:bg-[#9d4edd] focus:outline-none focus:ring-2 focus:ring-[#9d4edd] font-regular trailing-[1rem]"
          >
            <Text className="pt-1">Verify</Text>
          </button>

          <Box className="flex gap-2 items-center justify-between mt-2">
            <Link href="/login" className='flex justify-start'>
              <Text className="text-[.95rem] font-light text-[#2d2c76] md:text-[#d8dfe8]">
                Back to Login
              </Text>
            </Link>

            <Text className="text-[.95rem] font-light text-[#ffffff] flex justify-end">
               Resend OTP
            </Text>
            
          </Box>
         </Box>

    </Box>
  )
}

export default VerifyOtp;
