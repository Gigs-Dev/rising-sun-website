// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { Box, HStack, Flex } from "@/ui/primitives/ui-layout";
// import { Text } from '@/ui/primitives/typography';
// import Image from "next/image";
// import { keyframes } from '@emotion/react';

// // Icons
// import LeftarrowIcon from '@/svgs/leftarrow-2.svg';
// import Burger from "@/svgs/burger-2.svg";
// import Wallet from '@/svgs/wallet.svg';
// import emptyChipIcon from "@/svgs/empty_casino_chips.svg"; // Import the chip 
// import thirtyChipIcon from "@/svgs/30_casino_chips.svg"
// import hundredChipIcon from "@/svgs/100_casino_chips.svg"
// import fivehundredChipIcon from "@/svgs/500_casino_chips.svg"
// import oneKChipIcon from "@/svgs/1k_casino_chips.svg"
// import fiveKChipIcon from "@/svgs/5k_casino_chips.svg"
// import tenKChipIcon from "@/svgs/10k_casino_chips.svg"
// import twentyKChipIcon from "@/svgs/20k_casino_chips.svg"
// import fiftyKChipIcon from "@/svgs/50k_casino_chips.svg"
// import twohundredKChipIcon from "@/svgs/200k_casino_chips.svg"




// const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

// // Dice Faces (For Dot Patterns)
// const diceFaces: Record<1 | 2 | 3 | 4 | 5 | 6, boolean[][]> = {
//   1: [[false, false, false], [false, true, false], [false, false, false]],
//   2: [[true, false, false], [false, false, false], [false, false, true]],
//   3: [[true, false, false], [false, true, false], [false, false, true]],
//   4: [[true, false, true], [false, false, false], [true, false, true]],
//   5: [[true, false, true], [false, true, false], [true, false, true]],
//   6: [[true, false, true], [true, false, true], [true, false, true]],
// };

// // Dice Rolling Animation
// const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const MIN_BET = 10;
// // const betChips = [10, 50, 100, 500, 1000, 5000];

// const CHIP_SIZE = 40;
// const CAROUSEL_CHIP_SIZE = 60;

// const chipOptions = [
//   { value: 30, icon: thirtyChipIcon, color: "#4169E1" }, // Blue
//   { value: 100, icon: hundredChipIcon, color: "#FF6347" }, // Red
//   { value: 500, icon: fivehundredChipIcon, color: "#FFA500" }, // Orange
//   { value: 1000, icon: oneKChipIcon, color: "#9400D3" }, // Purple
//   { value: 5000, icon: fiveKChipIcon, color: "#228B22" }, // Green
//   { value: 10000, icon: tenKChipIcon, color: "#FF1493" }, // Pink
//   { value: 20000, icon: twentyKChipIcon, color: "#8B4513" }, // Brown
//   { value: 50000, icon: fiftyKChipIcon, color: "#FFD700" }, // Gold
//   { value: 200000, icon: twohundredKChipIcon, color: "#00FFFF" }, // Cyan
// ];

// const EvenOdd = () => {
//   const [walletBalance, setWalletBalance] = useState<number>(1000000);
//   const [betAmount, setBetAmount] = useState<number>(10);
//   const [userChoice, setUserChoice] = useState<"even" | "odd" | null>(null);
//   const [dice, setDice] = useState<number[]>([0, 0, 0]);
//   const [rolling, setRolling] = useState<boolean[]>([false, false, false]);
//   const [result, setResult] = useState<string>("");
//   const [checkBalance, setCheckBalance] = useState<boolean>(false);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [chipPosition, setChipPosition] = useState<number>(0); // 0-100%
//   const isDragging = useRef<boolean>(false);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [activeChipIndex, setActiveChipIndex] = useState<number>(0);
//   const maxBet = walletBalance;

//   const formattedBetAmount = betAmount.toLocaleString();

//   useEffect(() => {
//     setCheckBalance(walletBalance < betAmount);
//   }, [walletBalance, betAmount]);

//   useEffect(() => {
//     // Calculate percentage instead of pixels
//     const percentage = ((betAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
//     setChipPosition(percentage);
//   }, [betAmount, maxBet]);

//   // Handle Chip Selection
//   const handleChipSelection = (chip: number) => {
//     const newBetAmount = betAmount + chip;
//     if (newBetAmount <= maxBet) {
//       setBetAmount(newBetAmount);
//       // Update chip position
//       const percentage = ((newBetAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
//       setChipPosition(percentage)
//     }
//   };

//   const scrollLeft = () => {
//     if (activeChipIndex > 0) {
//       setActiveChipIndex(activeChipIndex - 1);
//     }
//   };

//   const scrollRight = () => {
//     if (activeChipIndex < chipOptions.length - 3) {
//       setActiveChipIndex(activeChipIndex + 1);
//     }
//   };

//   const handleMouseDown = () => {
//     isDragging.current = true;
//   };

//   const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!sliderRef.current) return;

//     const slider = sliderRef.current;
//     const sliderRect = slider.getBoundingClientRect();
//     let newX = e.clientX - sliderRect.left;

//     if (newX < 0) newX = 0;
//     if (newX > sliderRect.width) newX = sliderRect.width;

//     // Calculate percentage rather than pixels
//     const percentage = (newX / sliderRect.width) * 100;
//     const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
//     setBetAmount(Math.round(newBet));
//     setChipPosition(percentage);
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging.current || !sliderRef.current) return;

//     const slider = sliderRef.current;
//     const sliderRect = slider.getBoundingClientRect();
//     let newX = e.clientX - sliderRect.left;

//     if (newX < 0) newX = 0;
//     if (newX > sliderRect.width) newX = sliderRect.width;

//     // Calculate percentage rather than pixels
//     const percentage = (newX / sliderRect.width) * 100;
//     const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
//     setBetAmount(Math.round(newBet));
//     setChipPosition(percentage);
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//   };

//   useEffect(() => {
//     const handleGlobalMouseUp = () => {
//       if (isDragging.current) {
//         isDragging.current = false;
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleGlobalMouseUp);

//     window.addEventListener("touchmove", handleTouchMove, {passive: false});
//     window.addEventListener("touchend", handleGlobalMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//       window.removeEventListener("touchmove", handleTouchMove);
//       window.removeEventListener("touchend", handleGlobalMouseUp);
//     };
//   }, []);

//   const handleTouchMove = (e: TouchEvent) => {
//     if (!isDragging.current || !sliderRef.current) return;
//     e.preventDefault();

//     const touch = e.touches[0];
//     const slider = sliderRef.current;
//     const sliderRect = slider.getBoundingClientRect();
//     let newX = touch.clientX - sliderRect.left;

//     if (newX < 0) newX = 0;
//     if (newX > sliderRect.width) newX = sliderRect.width;

//     const percentage = (newX / sliderRect.width) * 100;
//     const newBet = MIN_BET + ((percentage / 100) * (maxBet - MIN_BET));
//     setBetAmount(Math.round(newBet));
//     setChipPosition(percentage);

//   }

//   const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
//     e.preventDefault();
//     return false;
//   };

//   // Start Dice Roll
//   const handleUserChoice = (choice: "even" | "odd") => {
//     if (walletBalance < betAmount) {
//       setResult("Insufficient funds! Please add more money.");
//       return;
//     }

//     setUserChoice(choice);
//     setDice([0, 0, 0]);
//     setRolling([true, false, false]);

//     rollDiceSequentially(0, []);
//   };

//   // Roll Dice One After Another
//   const rollDiceSequentially = (index: number, rolledValues: number[]) => {
//     if (index >= 3) {
//       checkResult(rolledValues);
//       return;
//     }

//     setTimeout(() => {
//       const newNumber = rollDice();
//       const newDice = [...rolledValues, newNumber];

//       setDice((prev) => {
//         const updatedDice = [...prev];
//         updatedDice[index] = newNumber;
//         return updatedDice;
//       });

//       setRolling((prev) => {
//         const updatedRolling = [...prev];
//         updatedRolling[index] = false;
//         if (index < 2) updatedRolling[index + 1] = true;
//         return updatedRolling;
//       });

//       rollDiceSequentially(index + 1, newDice);
//     }, 800);
//   };

//   // Check Result
//   const checkResult = (finalDice: number[]) => {
//     const total = finalDice.reduce((sum, num) => sum + num, 0);
//     const isEven = total % 2 === 0;
//     const allSame = finalDice.every((num) => num === finalDice[0]);

//     let newBalance = walletBalance;
//     if (allSame) {
//       setResult("All dice are the same. You lost!");
//       newBalance -= betAmount;
//     } else if ((isEven && userChoice === "even") || (!isEven && userChoice === "odd")) {
//       setResult(`You won! 🎉 Your winnings: ${betAmount * 2}`);
//       newBalance += betAmount * 2;
//     } else {
//       setResult("You lost! 😢");
//       newBalance -= betAmount;
//     }
//     setWalletBalance(newBalance);

//     // Reset Game After 3s
//     setTimeout(() => {
//       setDice([0, 0, 0]);
//       setUserChoice(null);
//       setResult("");
//     }, 3000);
//   };

//   return (
//     <>
//       <Box>
//         <Box className="m-auto mt-6 h-[90%] w-[400px] p-2 shadow-xl rounded-xl">
//           <Box className="p-5 text-white">
//             {/* Header */}
//             <HStack className="justify-between items-center">
//               <Image src={LeftarrowIcon} alt="return" width={20} height={20} />
//               <Text className="font-bold text-[1.3rem]">Even-Odd Game</Text>
//               <Image src={Burger} alt="menu" width={30} />
//             </HStack>

//             {/* Wallet */}
//             <Flex className="items-center gap-2 mt-6">
//               <Image src={Wallet} alt="wallet" width={20} height={20} />
//               <Text className="text-[1rem]">NGN{walletBalance.toLocaleString()}</Text>
//             </Flex>
//             <Text className="mt-2 text-green-500">+ Add Money</Text>
//           </Box>

//           {/* Dice */}
//           <Flex className='gap-4 justify-center items-center mt-5'>
//             {dice.map((value, index) => (
//               <Box
//                 key={index}
//                 className={`w-16 h-16 bg-white border-2 border-black grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-md ${rolling[index] ? "animate-spin" : ""}`}
//                 style={{ 
//                   cursor: value === 0 ? "pointer" : "not-allowed",
//                   animation: rolling[index] ? `${spin} 0.5s linear` : "none",
//                 }}
//               >
//                 {value !== 0 && diceFaces[value as 1 | 2 | 3 | 4 | 5 | 6].map((row: boolean[], rowIndex: number) => 
//                       row.map((dot: boolean, colIndex: number) => (
//                         <Box 
//                           key={`${rowIndex}-${colIndex}`} 
//                           className={`w-2 h-2 rounded-full ${dot ? "bg-black" : "bg-transparent"}`} 
//                           style={{ justifySelf: "center", alignSelf: "center" }}
//                         >
//                           <></>
//                         </Box>
//                       ))
//                   )
//                 }
//               </Box>
//             ))}
//           </Flex>

//           {/* Bet Input */}
//           <Box className="mt-8 text-center">
//             <Text className="text-white">PAYS 2X</Text>
//             <Text className="text-gray-400">LOSE IF TRIPLE APPEARS</Text>
          

//             {/* Check Balance Button */} 
//             <Box className='mt-[4rem]'>
//               {checkBalance ? (
//                 <Box className='text-center text-red-500'>
//                   Insufficient funds! Please add more money to continue.
//                 </Box>
//               ) : (
//                 <></>
//               )}
//               <Box className={`text-center border w-[60%] m-auto text-[1.3rem] ${checkBalance ? 'text-red-500 border-red-500' : ''}`}>
//                 Bet  {formattedBetAmount}
//               </Box>
//             </Box>

//             {/* Bet Amount Input */}
//             <Box className="mt-4 flex flex-col items-center">
//               {/* SLIDER */}
//               <Flex className="relative w-full justify-between gap-6 text-white text-sm mt-2">
//                 <span>{MIN_BET}</span>
//                 <div ref={sliderRef} className="w-full h-2 bg-gray-400 rounded-md relative cursor-pointer" onClick={handleSliderClick}>
//                   {/* CHIP ICON */}
//                   <div
//                     className="absolute cursor-pointer"
//                     style={{
//                       left: `${chipPosition}%`, // Use percentage instead of pixels
//                       top: `-${CHIP_SIZE/2}px`,
//                       transform: "translateX(-50%)",
//                       width: `${CHIP_SIZE}px`,
//                       height: `${CHIP_SIZE}px`,
//                       zIndex: 10
//                     }}
//                     onMouseDown={handleMouseDown}
//                     onMouseUp={handleMouseUp}
//                   >
//                     <Image 
//                       src={emptyChipIcon} 
//                       alt="Chip" 
//                       width={CHIP_SIZE} 
//                       height={CHIP_SIZE}
//                       draggable="false"
//                       onDragStart={preventDragHandler}
//                       style={{ width: `${CHIP_SIZE}px`, height: `${CHIP_SIZE}px` }}
//                     />
//                   </div>
//                 </div>
//                 <span>{maxBet.toLocaleString()}</span>
//               </Flex>
//             </Box>
//             <Box className='relative mt-8 bg-teal-950 p-4 rounded-2xl shadow-lg'>
//               <Flex className='items-center justify-between gap-5'>
//                 <button
//                   onClick={scrollLeft}
//                   className='z-10 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center bg-teal-700 rounded-full'
//                 >
//                   &lt;
//                 </button>
//                 <div
//                   ref={carouselRef}
//                   className='flex-1'
//                   // style={{ height: "120px" }}
//                 >
//                   <Flex className='items-center justify-center gap-2 overflow-x-hidden' 
//                     style={{ transform: `translateX(-${activeChipIndex * 60}px)`, transition: 'transform 0.3s ease', maxWidth: "90%", overflow: "hidden" }}
//                     >
//                     {chipOptions.map((chip, index) => (
//                       <div
//                         key={index}
//                         className='relative cursor-pointer transform hover:scale-110 transition-transform'
//                         style={{
//                           width: `${CAROUSEL_CHIP_SIZE}px`,
//                           height: `${CAROUSEL_CHIP_SIZE}px`,
//                           // zIndex: 10
//                         }}
//                         onClick={() => handleChipSelection(chip.value)}
//                       >
//                         <Image 
//                           src={chip.icon}
//                           alt='chip'
//                           width={CAROUSEL_CHIP_SIZE}
//                           height={CAROUSEL_CHIP_SIZE}
//                           style={{ width: `${CAROUSEL_CHIP_SIZE}px`, height: `${CAROUSEL_CHIP_SIZE}px` }}
//                           className='pointer-events-none'
//                         />
//                         {/* <Text
//                           className='absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm'
//                           style={{ padding: "2px 5px", borderRadius: "5px" }}
//                         >
//                           {chip.value.toLocaleString()}
//                         </Text> */}
//                       </div>
//                     ))}
//                   </Flex>
//                 </div>
//                 <button
//                   onClick={scrollRight}
//                   className='z-10 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center bg-teal-700 rounded-full'
//                 >
//                   &gt;
//                 </button>
//               </Flex>
//             </Box>
//           </Box>

//           {/* Result Message */}
//           <Text className="text-center mt-4 text-white">{result}</Text>

//         </Box>
//         {/* Even / Odd Buttons */}
//         <Flex className="justify-center m-auto mt-2 w-[400px]">
//           <button className="bg-green-400 px-3 py-2 w-[50%] font-semibold text-[1.5rem]" onClick={() => handleUserChoice("even")}>
//             EVEN
//           </button>
//           <button className="bg-orange-300 px-3 py-2 w-[50%] font-semibold text-[1.5rem]" onClick={() => handleUserChoice("odd")}>
//             ODD
//           </button>
//         </Flex>
//       </Box>
//     </>
//   );
// };

// export default EvenOdd;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, HStack, Flex } from "@/ui/primitives/ui-layout";
import { Text } from '@/ui/primitives/typography';
import Image from "next/image";
import { keyframes } from '@emotion/react';
import ChipCarousel from './components/chipCarousel';

// Icons
import LeftarrowIcon from '@/svgs/leftarrow-2.svg';
import Burger from "@/svgs/burger-2.svg";
import Wallet from '@/svgs/wallet.svg';
import emptyChipIcon from "@/svgs/empty_casino_chips.svg"; // Import the chip 


const diceFaces: Record<1 | 2 | 3 | 4 | 5 | 6, boolean[][]> = {
  1: [[false, false, false], [false, true, false], [false, false, false]],
  2: [[true, false, false], [false, false, false], [false, false, true]],
  3: [[true, false, false], [false, true, false], [false, false, true]],
  4: [[true, false, true], [false, false, false], [true, false, true]],
  5: [[true, false, true], [false, true, false], [true, false, true]],
  6: [[true, false, true], [true, false, true], [true, false, true]]
}

// Dice Rolling Animation
const spin = keyframes `
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const rollDice = (): number => Math.floor(Math.random() * 6) * 1;
const MIN_BET = 10;
const CHIP_SIZE = 30;

const EvenOdd = () => {
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

    const maxBet = walletBalance
    const formattedBetAmount = betAmount.toLocaleString();

    const convert = (value: number) => {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M";
      } else if (value >= 1000) {
        return (value/1000).toFixed(1) + "K";
      }
      return value.toString();
    }

    // checkBalance
    useEffect(() => {
      setCheckBalance(walletBalance < betAmount);
    }, [walletBalance, betAmount]);

    // Handle dice roll
    const handleUserChoice = (choice: "even" |"odd") => {
      if (walletBalance < betAmount) {
        setResult("Insufficient funds! Please add more money")
        return;
      }

      setUserChoice(choice);
      setDice([0, 0, 0]);
      setRolling([true, false, false]);

      rollDiceSequentially(0, []);
    };

    const rollDiceSequentially = (index: number, rolledValues: number[]) => {
      if (index >= 3) {
        checkResult(rolledValues);
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

        rollDiceSequentially(index + 1, newDice);
      }, 800);
    };

      // Check Result
    const checkResult = (finalDice: number[]) => {
      const total = finalDice.reduce((sum, num) => sum + num, 0);
      const isEven = total % 2 === 0;
      const allSame = finalDice.every((num) => num === finalDice[0]);

      let newBalance = walletBalance;
      if (allSame) {
        setResult("All dice are the same. You lost!");
        newBalance -= betAmount;
      } else if ((isEven && userChoice === "even") || (!isEven && userChoice === "odd")) {
        setResult(`You won! 🎉 Your winnings: ${betAmount * 2}`);
        const tempBalance = newBalance - betAmount;
        const winAmount = betAmount * 2
        newBalance = tempBalance + winAmount;
        // newBalance += betAmount * 2;
      } else {
        setResult("You lost! 😢");
        newBalance -= betAmount;
      }
      setWalletBalance(newBalance);

      // Reset Game After 3s
      setTimeout(() => {
        setDice([0, 0, 0]);
        setUserChoice(null);
        setResult("");
      }, 3000);
    };

    //handle bet slide input
    useEffect(() => {
      //Calculate percentage
      const percentage = ((betAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
      setChipPosition(percentage);
    }, [betAmount, maxBet])

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
    }

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

      window.addEventListener("touchmove", handleTouchMove, {passive: false});
      window.addEventListener("touchend", handleGlobalMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleGlobalMouseUp);
      };
    }, []);

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

    }

    const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
      e.preventDefault();
      return false;
    };

    // handle Chip selection
    const handleChipSelection = (chip: number) => {
      const newBetAmount = betAmount + chip;
      if (newBetAmount <= maxBet) {
        setBetAmount(newBetAmount);
        // Update chip postion
        const percentage = ((newBetAmount - MIN_BET) / (maxBet - MIN_BET)) * 100;
        setChipPosition(percentage);
      }
    }

  return(
    <>
      <Box className='m-auto mt-5 w-[400px] h-full p-2 shadow-xl'>
        <Box className='bg-red-300 w-full rounded-b-[10%] border-[10px] border-t-0 border-blue-300 pb-10'>
          {/* Header */}
          <Box className="p-5 text-white">
            <HStack className="justify-between items-center">
                <Image src={LeftarrowIcon} alt="return" width={20} height={20} />
                <Text className="font-bold text-[1.3rem]">Even-Odd Game</Text>
                <Image src={Burger} alt="menu" width={30} />
            </HStack>

              {/* Wallet */}
            <Flex className="items-center gap-2 mt-6">
              <Image src={Wallet} alt="wallet" width={20} height={20} />
              <Text className="text-[1rem]">NGN{walletBalance.toLocaleString()}</Text>
            </Flex>
            <Text className="mt-2 text-green-500">+ Add Money</Text>
          </Box>
          {/* Dice */}
          <Flex className='gap-4 justify-center items-center mt-5'>
            {dice.map((value, index) => (
              <Box
                key={index}
                className={`w-16 h-16 bg-white border-2 border-black grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-md ${rolling[index] ? "animate-spin" : ""}`}
                style={{
                  cursor: value === 0 ?"pointer" : "not-allowed",
                  animation: rolling[index] ? `${spin} 0.5s linear`: "none",
                }}
              >
                {value !== 0 && diceFaces[value as 1 | 2 | 3 | 4 | 5 | 6].map((row: boolean[], rowIndex: number) => 
                  row.map((dot: boolean, colIndex: number) => (
                    <Box
                      key={`${rowIndex} - ${colIndex}`}
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
          {/* middle layer */}
          <Box className="mt-[3rem] text-center">
            <Text className='font-semibold'>Pays 2X</Text>
            <Text className='text-gray-400 text-[.9rem] font-semibold'>LOSE IF TRIPLE APPEARS</Text>
          </Box>

          {/* bet Amount */}
          <Box className='mt-[4rem]'>
            {checkBalance ? (
              <Box className='text-center text-red-500'>
                Insufficient funds! Please add more money to continue.
              </Box>
            ) : (
              <></>
            )}
            <Flex className='items-center px-3 justify-between w-[40%] m-auto border border-black'>
              <Text className='font-bold'>Bet</Text>
              <Flex className='items-center '>
                <Image 
                  src={emptyChipIcon}
                  alt="chip"
                  width={20}
                  height={20}
                  style={{ width: `20px`, height: '20px' }}
                />
                <Text className='font-bold'>{formattedBetAmount}</Text>
              </Flex>
            </Flex>
          </Box>
          {/* Bet Amount Input */}
          <Box className='mt-4 flex flex-col items-center px-4'>
            {/* slider */}
            <Flex className='relative w-full justify-betwwen gap-3 text-white text-sm mt-2'>
              <span className="font-bold">{MIN_BET}</span>
              <div ref={sliderRef} className='w-full h-2 bg-gray-400 rounded-md relative cursor-pointer' onClick={handleSliderClick}>
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
              <span className='font-bold'>{convert(maxBet)}</span>
            </Flex>
          </Box>
          {/* Chip Carousel */}
          <Box className='mt-8 px-4'>
            <ChipCarousel onSelect={(value) => handleChipSelection(value)}/>
              <Flex className='justify-center gap-10 text-gray-400 font-semibold'>
                  <span>Min: {MIN_BET}</span>
                  <span>Max: {convert(maxBet)}</span>
              </Flex>
          </Box>
          <Text className='text-center'>{result}</Text>
        </Box>
        <Flex className='justify-center m-auto mt-2 w-[400px]'>
          <Box className="bg-green-400 px-3 py-2 w-[50%] font-semibold text-[1.5rem] rounded-l-lg flex flex-col items-center" onClick={() => handleUserChoice("even")}>
            <span>EVEN</span>
            <span className='text-[.9rem] text-gray-400'>Pays 2x</span>
          </Box>
          <Box className="bg-orange-300 px-3 py-2 w-[50%] font-semibold text-[1.5rem] rounded-r-lg flex flex-col items-center " onClick={() => handleUserChoice("odd")}>
            <span>ODD</span>
            <span className='text-[.9rem] text-gray-400'>Pays 2x</span>
          </Box>
        </Flex>
      </Box>
    </>
  )
};

export default EvenOdd;
