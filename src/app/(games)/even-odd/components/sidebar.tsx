import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Box, HStack, Flex } from "@/ui/primitives/ui-layout";
// import { Text } from '@/ui/primitives/typography';

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
                        bg-white
                        shadow-lg
                        z-50
                        transform
                        transition-transform
                        ease-in-out
                        duration-300, 
                        overflow-y-auto
                    `}
                >
                    <div className='p-4'>
                        Sidebar
                    </div>
                </motion.div>
            )}
            
        </AnimatePresence>
    )
}

export default SideBar;
