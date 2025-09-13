"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, HStack, Flex } from "@/ui/primitives/ui-layout";
import { Text } from '@/ui/primitives/typography';
import Image from "next/image";
import { keyframes } from '@emotion/react';
import ChipCarousel from './components/chipCarousel';



// Icons
import emptyChipIcon from "@/svgs/empty_casino_chips.svg"; 
import CurvedText from './components/CurvedText';



// Dice Rolling Animation
const spin = keyframes `
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const rollDice = (): number => Math.floor(Math.random() * 6) + 1;
const MIN_BET = 10;
const CHIP_SIZE = 30;

const EvenOddPage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(1000000);
  const [dice, setDice] = useState<number[]>([0, 0, 0]);
  const [checkBalance, setCheckBalance] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [userChoice, setUserChoice] = useState<"even" | "odd" | null>(null);
  const [result, setResult] = useState<string>("");
  const [rolling, setRolling] = useState<boolean[]>([false, false, false]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [chipPosition, setChipPosition] = useState<number>(0); // 0 - 100%
  const isDragging = useRef<boolean>(false);



  // Handle win and loses
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isEven, setIsEven] = useState<boolean>(false);


  const maxBet = walletBalance;
  const formattedBetAmount = betAmount.toLocaleString();

  const convert = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    }
    return value.toString();
  }

  // checkBalance
  useEffect(() => {
    setCheckBalance(walletBalance < betAmount);
  }, [walletBalance, betAmount]);

  // Handle dice roll
  const handleUserChoice = (choice: "even" | "odd") => {
    if (walletBalance < betAmount) {
      setResult("Insufficient funds! Please add more money");
      return;
    }

    setUserChoice(choice);
    setIsRolling(true);
    setDice([0, 0, 0]);
    setRolling([true, false, false]);

    rollDiceSequentially(0, [], choice);
  };

  const rollDiceSequentially = (index: number, rolledValues: number[], choice: "even" | "odd") => {
    if (index >= 3) {
      checkResult(rolledValues, choice);
      return;
    }

    setTimeout(() => {
      const newNumber = rollDice();
      const newDice = [...rolledValues, newNumber];

      setDice((prev) => {
        const updatedDice = [...prev];
        updatedDice[index] = newNumber;
        return updatedDice;
      });

      setRolling((prev) => {
        const updatedRolling = [...prev];
        updatedRolling[index] = false;
        if (index < 2) updatedRolling[index + 1] = true;
        return updatedRolling;
      });

      rollDiceSequentially(index + 1, newDice, choice);
    }, 800);
  };

  // Check Result
  const checkResult = (finalDice: number[], choice: "even" | "odd") => {

    const total = finalDice.reduce((sum, num) => sum + num, 0);

    const isEven = total % 2 === 0;

    setIsEven(isEven);
    const allSame = finalDice.every((num) => num === finalDice[0]);

    let newBalance = walletBalance;
    if (allSame) {
      setResult("All dice are the same. You lost!");
      newBalance -= betAmount;
    } else if ((isEven && choice === "even") || (!isEven && choice === "odd")) {
      // setIsChoice(userChoice);
      setResult(`You won! 🎉 Your winnings: ${betAmount * 2}`);
      const tempBalance = newBalance - betAmount;
      const winAmount = betAmount * 2;
      newBalance = tempBalance + winAmount;
    } else {
      setResult("You lost! 😢");
      newBalance -= betAmount;
    }
    setWalletBalance(newBalance);
    setIsRolling(false);

  };

  const handleNewRound = () => {
    setDice([0, 0, 0]);
    setUserChoice(null);
    setResult("");
    setBetAmount(10);
  }

  const handleRebet = () => {
    if (userChoice !== null) {
      handleUserChoice(userChoice);
    } else {
      console.error("User choice is null. Please select 'even' or 'odd'" )
    }
  }

  // Handle bet slide input
  useEffect(() => {
    // Calculate percentage
    const percentage = ((betAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
    setChipPosition(percentage);
  }, [betAmount, maxBet]);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    let newX = e.clientX - sliderRect.left;

    if (newX < 0) newX = 0;
    if (newX > sliderRect.width) newX = sliderRect.width;

    // Calculate percentage rather than pixels
    const percentage = (newX / sliderRect.width) * 100;
    const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
    setBetAmount(Math.round(newBet));
    setChipPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    let newX = e.clientX - sliderRect.left;

    if (newX < 0) newX = 0;
    if (newX > sliderRect.width) newX = sliderRect.width;

    // Calculate percentage rather than pixels
    const percentage = (newX / sliderRect.width) * 100;
    const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
    setBetAmount(Math.round(newBet));
    setChipPosition(percentage);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    let newX = touch.clientX - sliderRect.left;

    if (newX < 0) newX = 0;
    if (newX > sliderRect.width) newX = sliderRect.width;

    const percentage = (newX / sliderRect.width) * 100;
    const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
    setBetAmount(Math.round(newBet));
    setChipPosition(percentage);
  };

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };

  // Handle Chip selection
  const handleChipSelection = (chip: number) => {
    const newBetAmount = betAmount + chip;
    if (newBetAmount <= maxBet) {
      setBetAmount(newBetAmount);
      // Update chip position
      const percentage = ((newBetAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
      setChipPosition(percentage);
    }
  };

  return (
  
          <main className='min-h-screen'>
            <Box className='even-odd-bg w-[400px] mx-auto md:w-[525px] rounded-[10px] h-full border-[10px] border-t-0 border-[#17a2b8] pb-8'>
              {/* Header */}
              <Box className="p-5 text-white">
                <HStack className="flex justify-between items-center">
                  <Text className="font-bold text-[20px] text-center mx-auto">Even-Odd Game</Text>
                </HStack>

              </Box>

              {/* Dice */}
              <Flex className='gap-2 sm:gap-4 justify-center items-center mt-5'>
                {dice.map((value, index) => (
                  <Box
                    key={index}
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-white border-2 border-black grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-md ${rolling[index] ? "animate-spin" : ""}`}
                    style={{
                      cursor: value === 0 ? "pointer" : "not-allowed",
                      animation: rolling[index] ? `${spin} 0.5s linear` : "none",
                    }}
                  >
                    {value !== 0 && diceFaces[value as 1 | 2 | 3 | 4 | 5 | 6].map((row: boolean[], rowIndex: number) =>
                      row.map((dot: boolean, colIndex: number) => (
                        <Box
                          key={`${rowIndex}-${colIndex}`}
                          className={`w-2 h-2 rounded-full ${dot ? "bg-black" : "bg-transparent"}`}
                          style={{ justifySelf: "center", alignSelf: "center" }}
                        >
                          <></>
                        </Box>
                      ))
                    )}
                  </Box>
                ))}
              </Flex>

              {isRolling ? (
                <Box className='h-[300px]'>
                  <></>
                </Box>
              ) : (
                <>
                  {/* Middle layer */}
                  <Box className="mt-[1.7rem] flex flex-col text-center">
                    <CurvedText text="PAYS 2x" fontSize={18} color="text-gray-400" curveHeight={6} totalWidth={80} yNumber={4} />
                    <CurvedText text="LOSE IF TRIPLE APPEARS" fontSize={14} color="text-gray-400" curveHeight={4} totalWidth={170} yNumber={1} />
                    {/* <Text className='font-semibold'>Pays 2X</Text> */}
                    {/* <Text className='text-gray-400 text-[.9rem] font-semibold'>LOSE IF TRIPLE APPEARS</Text> */}
                  </Box>

                  {/* Bet amount and controls */}
                  {!result && (
                    <>
                      <Box className='mt-[2rem]'>
                        {checkBalance ? (
                          <Box className='text-center text-red-500'>
                            Insufficient funds! Please add more money to continue.
                          </Box>
                        ) : (
                          <></>
                        )}
                        <Flex className={`h-full px-3 justify-between w-[40%] m-auto border border-black ${checkBalance ? 'border-red-500' : ''}`}>
                        {/* <Flex className={`h-full px-2 sm:px-3 justify-between w-full sm:w-[40%] m-auto border border-black ${checkBalance ? 'border-red-500' : ''}`}> */}
                          <p className={`font-semibold relative top-[4px] ${checkBalance ? 'text-red-500' : ''}`}>Bet</p>
                          <Flex className='gap-1'>
                            <Image
                              src={emptyChipIcon}
                              alt="chip"
                              width={15}
                              height={15}
                              style={{ width: `15px`, height: '15px' }}
                              className='flex-shrink-0'
                            />
                            <p className='font-semibold relative top-[4px]'>{formattedBetAmount}</p>
                          </Flex>
                        </Flex>
                      </Box>

                      {/* Bet Amount Input */}
                      {/* <Box className='mt-4 flex flex-col items-center px-4 w-[80%] m-auto'> */}
                      <Box className='mt-4 flex flex-col items-center px-2 sm:px-4 w-[95%] sm:w-[80%] m-auto'>
                        {/* Slider */}
                        <Flex className='relative w-full justify-between gap-4 text-white text-sm mt-2'>
                          <span className="font-semibold">{MIN_BET}</span>
                          <div ref={sliderRef} className='w-full h-1 bg-[#3998b5] rounded-md relative cursor-pointer' onClick={handleSliderClick}>
                            <div
                              className='absolute cursor-pointer'
                              style={{
                                left: `${chipPosition}%`,
                                top: `-${(CHIP_SIZE / 2) - 2}px`,
                                transform: "translateX(-50%)",
                                width: `${CHIP_SIZE}px`,
                                height: `${CHIP_SIZE}px`,
                                zIndex: 10
                              }}
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                            >
                              <Image
                                src={emptyChipIcon}
                                alt="Chip"
                                width={CHIP_SIZE}
                                height={CHIP_SIZE}
                                draggable="false"
                                onDragStart={preventDragHandler}
                                style={{ width: `${CHIP_SIZE}px`, height: `${CHIP_SIZE}px` }}
                              />
                            </div>
                          </div>
                          <span className='font-semibold'>{convert(maxBet)}</span>
                        </Flex>
                      </Box>

                      {/* Chip Carousel */}
                      <Box className='mt-8 px-2'>
                        <ChipCarousel onSelect={(value) => handleChipSelection(value)} />
                        <Flex className='justify-center gap-10 text-gray-400 font-semibold'>
                          <span>Min: {MIN_BET}</span>
                          <span>Max: {convert(maxBet)}</span>
                        </Flex>
                      </Box>
                    </>
                  )}

                  {/* Result display */}
                  {result && (
                    <Box className="mt-4 text-center h-[200px]">
                      {/* Display whether the dice roll was Even or Odd */}
                      <Box 
                        className={`px-3 py-2 w-[50%] font-semibold text-[1.5rem] m-auto mt-8 
                          ${isEven ? "bg-[#0a9737]" : "bg-[#de9244]"}`}
                      >
                        {isEven ? "EVEN" : "ODD"}
                      </Box>

                      {/* Display the result based on user choice */}
                      <Text className={`${result.includes("won") ? "text-green-500" : "text-red-500"} mt-3`}>
                        {result.includes("won") 
                          ? result 
                          : userChoice 
                            ? `${result}. You chose ${userChoice.toUpperCase()}`
                            : `${result}. No choice was made`}
                      </Text>

                    </Box>
                  )}

                </>
              )}
            </Box>

    
            {!result ? (
              <Flex className='justify-center m-auto mt-2  w-[400px] md:w-[525px]'>
                <Box
                  className={`cursor-pointer px-2 sm:px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]`}
                  onClick={() => handleUserChoice("even")}
                >
                  <span>EVEN</span>
                  <span className='text-[.8rem] sm:text-[.9rem]'>Pays 2x</span>
                </Box>
                <Box
                  className={`cursor-pointer px-2 sm:px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#de9244]`}
                  onClick={() => handleUserChoice("odd")}
                >
                  <span>ODD</span>
                  <span className='text-[.8rem] sm:text-[.9rem]'>Pays 2x</span>
                </Box>
              </Flex>
            ) : (
              <Flex className='justify-center m-auto mt-2 w-[400px] md:w-[525px] gap-2'>
                <Box 
                  className='cursor-pointer px-2 sm:px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]'
                  onClick={handleRebet}
                >
                  REBET
                </Box>
                <Box 
                  className='cursor-pointer px-2 sm:px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]'
                  onClick={handleNewRound}
                >
                  NEW ROUND
                </Box>
              </Flex>
            )}
          </main>
        
  );
};

export default EvenOddPage;
