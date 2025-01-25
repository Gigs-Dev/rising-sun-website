import React from "react";
import Image from "next/image";
import { Box, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import GameIcon from "@/svgs/game.svg";
import CubeIcon from "@/svgs/cube.svg";


const HeroBox = () => {
  return (
    <Box className="my-[3rem]">
      <HStack className="justify-around">
        {/* left */}
        <Box className="py-[2rem]">
          <Text
            className={
              "font-medium text-[3.2rem] md:text-[3.8rem] md:tracking-normal md:leading-[4rem] leading-[4rem]"
            }
          >
            Prepare to <br />
            Explore, Play <br />
            and Win Games
          </Text>
          <HStack className="inline-flex my-[.5rem] bg-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[2rem] gap-2">
            <Image priority src={CubeIcon} alt="game" width={35} height={35} />
            <Text className="text-[#000] text-[.9rem] pt-[3px]">Start Playing</Text>
          </HStack>
        </Box>

        {/* right */}
        <Image priority src={GameIcon} alt="game" width={450} height={450} />
      </HStack>
    </Box>
  );
};

export default HeroBox;
