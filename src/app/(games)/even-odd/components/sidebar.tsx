import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex } from "@/ui/primitives/ui-layout";
import Image from 'next/image';
import { Text } from '@/ui/primitives/typography';
import emptyChipIcon from "@/svgs/empty_casino_chips.svg";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen && 
                sidebarRef.current && 
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose])
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                     />
                    <motion.div
                        ref={sidebarRef}
                        initial={{ x: '100%' }}
                        animate={{ x: '0' }}
                        exit={{ x: '100%' }}
                        // transition={{ ease: 'easeInOut' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`
                            absolute
                            top-0
                            right-0
                            h-full
                            w-64
                            shadow-lg
                            z-50
                            transform
                            transition-transform
                            ease-in-out
                            duration-300, 
                            overflow-y-auto
                            bg-[#006E90]
                        `}
                    >
                        <Box className='p-6 text-black bg-[#06566E]'>
                            <Box className='text-white font-semibold text-[1.3rem]'>Even-Odd Game</Box>
                            <Flex className='mt-4 gap-2'>
                                <Image src={emptyChipIcon} alt="ppix" className='rounded-full w-[2rem] h-[2rem]' />
                                <Text className='relative top-[4px] text-white font-semibold text-[1.1rem]'>816xxxxx58</Text>
                            </Flex>
                        </Box>
                    </motion.div>
                </>
            )}
            
        </AnimatePresence>
    )
}

export default SideBar;
