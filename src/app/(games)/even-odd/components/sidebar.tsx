'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from "@/ui/primitives/ui-layout";
import Image from 'next/image';
import { Text } from '@/ui/primitives/typography';
import emptyChipIcon from "@/svgs/empty_casino_chips.svg";
import HModal from './HModal';
import HistoryModal from './HistoryModal';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    // const show = searchParams?.show;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen && 
                !isModalOpen && 
                !isHistoryModalOpen &&
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
    }, [isOpen, onClose, isModalOpen, isHistoryModalOpen]);

    const handleHowToPlayClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Closes only the modal
    };

    const handleBetHistoryClick = () => {
        setIsHistoryModalOpen(true);
    };

    const handleHistoryModalClose = () => {
        setIsHistoryModalOpen(false); // Closes only the modal
    };

    return (
        isOpen && (
            <>
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                />
                <div
                    ref={sidebarRef}
                    className={`
                        absolute
                        top-0
                        right-0
                        h-full
                        w-64
                        shadow-lg
                        z-50
                        bg-[#006e90]
                    `}
                >
                    <Box className='p-6 bg-[#06566e]'>
                        <Box className='text-white font-semibold text-[1.3rem]'>Even-Odd Game</Box>
                        <Flex className='mt-4 gap-2'>
                            <Image src={emptyChipIcon} alt="chip" className='rounded-full w-[2rem] h-[2rem]' />
                            <Text className='relative top-[4px] text-white font-semibold text-[1.1rem]'>816xxxxx58</Text>
                        </Flex>
                    </Box>
                    <Box className='p-6 text-white'>
                        <ul className='space-y-4'>
                            <li className='flex items-center justify-between'>
                                <span>Music</span>
                                <div className='flex items-center space-x-2'>
                                    <span className='text-xs'>Off</span>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        <input type='checkbox' className='sr-only peer' />
                                        <div className='w-14 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 rounded-full peer-checked:bg-teal-500 transition-colors duration-300'></div>
                                        <span className='absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-10 transition-all duration-300'></span>
                                    </label>
                                    <span className='text-xs'>On</span>
                                </div>
                            </li>
                            <div className='divider bg-[#fff] h-[1px]  opacity-10'></div>
                            <li className='flex items-center justify-between'>
                                <span>Sound</span>
                                <div className='flex items-center space-x-2'>
                                    <span className='text-xs'>Off</span>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        <input type='checkbox' className='sr-only peer' />
                                        <div className='w-14 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 rounded-full peer-checked:bg-teal-500 transition-colors duration-300'></div>
                                        <span className='absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-10 transition-all duration-300'></span>
                                    </label>
                                    <span className='text-xs'>On</span>
                                </div>
                            </li>
                            <div className='divider bg-[#fff] h-[1px]  opacity-10'></div>
                            <li className='flex items-center justify-between'>
                                <span>One-Tap Bet</span>
                                <div className='flex items-center space-x-2'>
                                    <span className='text-xs'>Off</span>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        <input type='checkbox' className='sr-only peer' />
                                        <div className='w-14 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 rounded-full peer-checked:bg-teal-500 transition-colors duration-300'></div>
                                        <span className='absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-10 transition-all duration-300'></span>
                                    </label>
                                    <span className='text-xs'>On</span>
                                </div>
                            </li>
                            <div className='divider bg-[#fff] h-[1px]  opacity-10'></div>
                            <li className='text-teal-200 cursor-pointer' onClick={handleHowToPlayClick}>How to Play</li>
                            <div className='divider bg-[#fff] h-[1px]  opacity-10'></div>
                            <li className='text-teal-200 cursor-pointer' onClick={handleBetHistoryClick}>Bet History</li>
                            <div className='divider bg-[#fff] h-[1px]  opacity-10'></div>
                        </ul>
                        <button className='mt-[6rem] w-full bg-red-600 text-white py-2 rounded'>+ Add Money</button>
                    </Box>
                </div>
                {isModalOpen && <HModal onModalClose={handleModalClose} />}
                {isHistoryModalOpen && <HistoryModal onModalClose={handleHistoryModalClose} />}
            </>
        )
    );
};

export default SideBar;