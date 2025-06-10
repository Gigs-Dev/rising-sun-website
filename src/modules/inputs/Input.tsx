'use client'


import React, { useState } from "react";
import { Box } from "@/ui/primitives/ui-layout";
import { Lock, Eye, EyeOff } from "lucide-react";

const Input = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);


  return (
   <Box className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 pt-4 pb-3 bg-transparent border-[.2px] border-[#adb5bd] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light text-[.9rem]"
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
        >
            {showPassword ? (
            <EyeOff className="w-5 h-5" />
            ) : (
            <Eye className="w-5 h-5" />
            )}
        </button>
    </Box> 
  )
}

export default Input;
