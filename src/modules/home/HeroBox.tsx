import React from "react";
import Image from "next/image";
import { Box, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";

// icons
import GameIcon from "@/svgs/game.svg";
import CubeIcon from "@/svgs/cube.svg";
import ApkIcon from "@/svgs/apk.svg";

const HeroBox = () => {
  return (
    <Box className="my-[3rem]">
      <HStack className="justify-around">
        {/* left */}
        <Box className="py-[2rem]">
          <Text
            className={
              "font-medium text-[2.5rem] md:text-[3.5rem] md:tracking-normal md:leading-[4rem] leading-[3.6rem] relative"
            }
          >
            <span className="text-[#eee]">Prepare</span> to <br />
            explore, play <br />
            and{" "}
            <span className="relative inline-block font-bold-italic">
              win games
              <span className="absolute bottom-[8px] left-0 w-full h-[4px] bg-[#ffba08]"></span>
            </span>
          </Text>
          <Text
            className={
              "font-regular text-[1rem] md:text-[1.1rem] ml-[1rem] leading-[30px] mt-[.4rem]"
            }
          >
            Discover popular games, fund your wallet and start winning{" "}
          </Text>
          <HStack className="inline-flex my-[.5rem] bg-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[1.5rem] gap-2 ml-[1rem] mt-[20px] items-center justify-center">
            <Image priority src={CubeIcon} alt="game" width={26} height={26} />
            <Text className="text-[#000] text-[.9rem] pt-[3px]">
              Start Playing
            </Text>
          </HStack>
          <HStack className="inline-flex my-[.5rem] border border-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[1.5rem] gap-2 ml-[1rem] items-center justify-center">
            <Image priority src={ApkIcon} alt="apk" width={26} height={26} />
            <Text className="text-[#ffffff] text-[.9rem] pt-[3px]">
              Download APK
            </Text>
          </HStack>
        </Box>

        {/* right */}
        <Image priority src={GameIcon} alt="game" width={420} height={420} />
      </HStack>
    </Box>
  );
};

export default HeroBox;
