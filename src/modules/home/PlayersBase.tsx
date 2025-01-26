import React from "react";
import { Text } from "@/ui/primitives/typography";
import { Box } from "@/ui/primitives/ui-layout";
import Image from "next/image";

// ICON
import GameIcon from "@/svgs/game.svg";

const PlayersBase = () => {
  return (
    <Box className="pt-[4rem] py-[2rem] rounded-[30px] md:rounded-[50px] bg-[#b084cc] backdrop-blur border-[3px] border-[#7456ae] border-dashed">
      <Box className="flex flex-col md:flex-row gap-10 md:gap-20 px-[2rem] md:px-[3rem]">
        {/* Left Section: Image boxes */}
        <Box className="flex flex-col gap-5 md:gap-3 flex-wrap">
          {["image 1", "image 2", "image 3"].map((text, index) => (
            <Box
              key={index}
              className="border border-[#fff] w-full md:w-[25rem] h-[12rem] rounded-[20px] py-[1rem] px-[1rem] flex items-center justify-center"
            >
               <Image alt="img" src={GameIcon} width={200} height={200} />
            </Box>
          ))}
        </Box>

        {/* Right Section: Text content */}
        <Box className="flex flex-col justify-start">
          <Text className="w-full md:w-[80%] font-regular text-[1rem] md:text-[1.1rem] leading-[30px] text-[#000]">
            🧩 Join the largest community of players online now!
          </Text>
          <Text className="font-regular text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] my-[2rem] w-full md:w-[90%] text-[#000]">
            <span className="text-[#ffba08] font-bold-italic">HUNDREDS</span> OF{" "}
            <br /> EXCITING AND{" "}
            <span className="text-[#ffba08] font-medium-italic">THRILLING</span>{" "}
            <br />
            <span className="text-[#336699] font-bold-italic">GAMES </span>
            FOR YOU
          </Text>
          <Text className="mb-[1rem] w-full md:w-[80%] font-regular-italic text-[1rem] md:text-[1.1rem] leading-[30px] text-[#000]">
            Dive into a world of endless gaming possibilities, designed for all
            ages and skill levels. A single click can open the door to hours of
            entertainment.
          </Text>
          <Text className="w-full md:w-[80%] font-regular text-[1rem] md:text-[1.1rem] leading-[30px] text-[#000]">
            Explore games that range from fast-paced action to brain-teasing
            puzzles. Whether you&apos;re a seasoned player or a casual enthusiast,
            there&apos;s always something new and exciting waiting for you to
            discover. Join now and experience the thrill firsthand.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayersBase;
