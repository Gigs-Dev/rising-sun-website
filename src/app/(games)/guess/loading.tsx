"use client";

import React, { useState, useEffect } from 'react'
import { Text } from '@/ui/primitives/typography';
import { Flex, Box } from '@/ui/primitives/ui-layout';

const Loading = () => {

    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
            clearInterval(interval);
            return 100;
            }
            return prev + 5;
        });
        }, 100);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className='h-[600px] w-[360px] md:w-[420px] bg-black bg-opacity-50 backdrop-blur-md rounded-md px-[2rem] mx-auto'>
        <Flex className='justify-center flex-col h-[70%] items-center'>
        <Text className='text-lg font-bold'>Loading...</Text>
        <Box className='bg-gray-300 h-2 rounded-full mt-2 w-[80%]'>
            <Box className='bg-blue-500 h-2 rounded-full transition-all duration-200' style={{ width: `${progress}%` }}>
            <></>
            </Box>
        </Box>
        </Flex>
    </div>
  )
}

export default Loading;

