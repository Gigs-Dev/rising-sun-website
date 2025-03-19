import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Box, Flex } from "@/ui/primitives/ui-layout";
// import { Text } from '@/ui/primitives/typography';

import thirtyChipIcon from "@/svgs/30_casino_chips.svg";
import hundredChipIcon from "@/svgs/100_casino_chips.svg";
import fivehundredChipIcon from "@/svgs/500_casino_chips.svg";
import oneKChipIcon from "@/svgs/1k_casino_chips.svg";
import fiveKChipIcon from "@/svgs/5k_casino_chips.svg";
import tenKChipIcon from "@/svgs/10k_casino_chips.svg";
import twentyKChipIcon from "@/svgs/20k_casino_chips.svg";
import fiftyKChipIcon from "@/svgs/50k_casino_chips.svg";
import twohundredKChipIcon from "@/svgs/200k_casino_chips.svg";

//Define Chip type
interface Chip {
    value: number;
    image: StaticImageData;
}

interface ChipCarouselProps {
    onSelect: (value: number) => void;
}

const chips: Chip [] = [
    { value: 30, image: thirtyChipIcon},
    { value: 100, image: hundredChipIcon},
    { value: 500, image: fivehundredChipIcon},
    { value: 1000, image: oneKChipIcon},
    { value: 5000, image: fiveKChipIcon},
    { value: 10000, image: tenKChipIcon },
    { value: 20000, image: twentyKChipIcon},
    { value: 50000, image: fiftyKChipIcon },
    { value: 200000, image: twohundredKChipIcon},
];

const ChipCarousel: React.FC<ChipCarouselProps> =  ({ onSelect }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const convert = (value: number) => {
        if (value >= 1000000) {
          return (value / 1000000) + "M";
        } else if (value >= 1000) {
          return (value/1000) + "K";
        }
        return value.toString();
    }

    const scroll = (direction: number) => {
        if (carouselRef.current) {
            const scrollAmount = 150;
            carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
        }
    };

    const selectChip = (value: number) => {
        onSelect(value);
    };
  return (
    <Flex className='items-center gap-2 w-full overflow-hidden '>
        {/* Left scroll button */}
        <button 
            onClick={() => scroll(-1)}
            className='bg-gray-800 text-[1.5rem] text-white px-[.5rem] flex items-center justify-center rounded-full hover:bg-gray-700'
        >
            &lt;
        </button>

        {/* Chips Container */}
        <div ref={carouselRef} className='flex overflow-x-auto scroll-smooth no-scrollbar w-full rounded-full bg-blue-800'>
            {chips.map((chip) => (
                <Box
                    key={chip.value}
                    className={`relative p-1 rounded-full cursor-pointer transition  flex-shrink-0`}
                    onClick={() => selectChip(chip.value)}
                >
                    <Image 
                        src={chip.image}
                        alt={`Chip ${chip.value}`}
                        width={60}
                        height={60}
                        className='pointer-events-none'
                    />

                    {/* Chip Value Text */}
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-sm'>{convert(chip.value)}</span>
                </Box>
            ))}
        </div>
        {/* Right Scroll button */}
        <button
            onClick={() => scroll(1)}
            className='bg-gray-800 text-[1.5rem] text-white px-[.5rem] flex items-center justify-center rounded-full hover:bg-gray-700'
        >
            &gt;
        </button>
    </Flex>
  )
};

export default ChipCarousel;