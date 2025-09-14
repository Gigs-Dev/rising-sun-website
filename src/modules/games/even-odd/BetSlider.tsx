import { useRef, useEffect } from "react";
import { Flex } from "@/ui/primitives/ui-layout";
import Image from "next/image";
import emptyChipIcon from "@/svgs/empty_casino_chips.svg";

interface BetSliderProps {
  betAmount: number;
  setBetAmount: (value: number) => void;
  maxBet: number;
  minBet?: number;
  chipSize?: number;
}

export default function BetSlider({
  betAmount,
  setBetAmount,
  maxBet,
  minBet = 10,
  chipSize = 30,
}: BetSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const percentage = ((betAmount - minBet) / (maxBet - minBet)) * 100;

  const updateBet = (newX: number, sliderWidth: number) => {
    if (newX < 0) newX = 0;
    if (newX > sliderWidth) newX = sliderWidth;

    const pct = (newX / sliderWidth) * 100;
    const newBet = minBet + (pct / 100) * (maxBet - minBet);
    setBetAmount(Math.round(newBet));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    updateBet(e.clientX - sliderRef.current.getBoundingClientRect().left, sliderRef.current.offsetWidth);
  };

  const handleMove = (e: MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    updateBet(e.clientX - sliderRef.current.getBoundingClientRect().left, sliderRef.current.offsetWidth);
  };

  const handleUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <Flex className="relative w-full justify-between gap-4 text-white text-sm mt-4 px-6">
      <span className="font-semibold">{minBet}</span>
      <div ref={sliderRef} className="w-full h-1 bg-[#3998b5] rounded-md relative cursor-pointer" onClick={handleClick}>
        <div
          className="absolute cursor-pointer"
          style={{
            left: `${percentage}%`,
            top: `-${chipSize / 2 - 2}px`,
            transform: "translateX(-50%)",
            width: `${chipSize}px`,
            height: `${chipSize}px`,
          }}
          onMouseDown={() => (isDragging.current = true)}
        >
          <Image
            src={emptyChipIcon}
            alt="Chip"
            width={chipSize}
            height={chipSize}
            draggable={false}
            style={{ width: `${chipSize}px`, height: `${chipSize}px` }}
          />
        </div>
      </div>
      <span className="font-semibold">
        {maxBet >= 1_000_000 ? (maxBet / 1_000_000).toFixed(1) + "M" : maxBet.toLocaleString()}
      </span>
    </Flex>
  );
}
