import React from "react";
import Image from "next/image";
import { Box, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import { GameCollectionsList } from "@/data/game-collections";

// ICONS
import BrIcon from "@/svgs/br.svg";
import GameIcon from "@/svgs/game.svg";

const GameCollections = () => {
  return (
    <Box className="mt-[5rem] py-[1.5rem] mx-auto">
      <Box className="flex items-center justify-center">
        <Text className="text-center font-medium text-[1.4rem] md:text-[1.8rem] tracking-[.1px] mb-[1rem] border-b-[.5px] rounded-b-[0px] py-[1rem] px-[5rem] inline-flex">
          GAME COLLECTIONS
        </Text>
      </Box>

      <Box className="flex flex-col items-center">
        {/* GAME LISTING */}
        <HStack className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 justify-center items-center">
          {GameCollectionsList.map((game, index) => {
            const { name } = game;
            return (
              <Box key={String(index)} className="flex flex-col items-center">
                <Box className="border border-[#888] w-[20rem] h-[20rem] md:w-[17rem] md:h-[17rem] rounded-[20px] py-[1rem] px-[1rem] flex items-center justify-center">
                  <Image alt="img" src={GameIcon} width={200} height={200} />
                </Box>
                <Text className="mt-[10px]">{name}</Text>
              </Box>
            );
          })}
        </HStack>

        {/* VIEW MORE */}
        <HStack className="inline-flex bg-[#ffffff] text-center py-[.5rem] rounded-[10px] px-[1.4rem] gap-2 my-[2rem]">
          <Text className="text-[.9rem] text-[#000000] font-regular pt-1">
            View All Collections
          </Text>
          <Image
            priority
            src={BrIcon}
            alt="arrow-right"
            width={18}
            height={18}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default GameCollections;
