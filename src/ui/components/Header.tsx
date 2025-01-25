"use client";

import { Box, Flex, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import React, { useState } from "react";
import Image from "next/image";

// icons
import LogoIcon from "@/svgs/logo.svg";
import BrIcon from "@/svgs/br.svg";
import MenuIcon from "@/svgs/bars.svg";

const TopBarData = [
  {
    name: "Help Center",
    link: "help",
  },
  {
    name: "How to play?",
    link: "about",
  },
  {
    name: "News & Updates",
    link: "about",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Flex className="fixed top-1 left-0 w-full md:justify-around justify-between px-10 py-5 bg-transparent z-50">
      <Box className="ml-[1rem]">
        <Image priority src={LogoIcon} alt="recharge" width={70} height={70} />
      </Box>

      {/* Menu icon */}
      <Box
        className="block lg:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image priority src={MenuIcon} alt="menu" width={28} height={28} />
      </Box>

      {/* Links container */}
      <Flex
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex border border-[#555] rounded-[10px] px-5 py-1.5 bg-transparent backdrop-blur gap-8`}
      >
        {TopBarData.map((item) => (
          <Box key={item.name} className="text-[.9rem] cursor-pointer pt-1">
            {item.name}
          </Box>
        ))}

        <HStack className="inline-flex bg-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[1.3rem] gap-2">
          <Text className="text-[.9rem] text-[#000000] font-regular pt-1">
            Account Sign In
          </Text>
          <Image
            priority
            src={BrIcon}
            alt="arrow-right"
            width={20}
            height={20}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
