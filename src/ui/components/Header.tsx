"use client";

import { Box, Flex, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import React, { useState } from "react";
import Image from "next/image";

// icons
import LogoIcon from "@/svgs/logo.svg";
import BrIcon from "@/svgs/br.svg";
import MenuIcon from "@/svgs/menu.svg";
import CloseIcon from "@/svgs/close.svg";
import { TopBarData } from "@/data/top-bar-list";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Flex className="fixed top-[1px] left-0 w-full md:justify-around justify-between px-4 py-5 bg-transparent z-50">
      {/* Links container */}
      <Flex
        className={`lg:flex border border-[#555] rounded-[10px] px-3 py-1.5 bg-transparent backdrop-blur gap-8 w-full justify-between items-center lg:max-w-[800px] lg:mx-auto`}
      >
        <Box className="ml-[1rem]">
          <Image
            priority
            src={LogoIcon}
            alt="recharge"
            width={50}
            height={50}
          />
        </Box>

        {/* Menu icon for small screens */}
        <Box className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <Image
            priority
            src={isMenuOpen ? CloseIcon : MenuIcon}
            alt="menu"
            width={24}
            height={24}
          />
        </Box>

        {/* Menu items */}
        <Flex
          className={`${isMenuOpen ? "flex" : "hidden"} ${
            isMenuOpen ? "border-b border-[#555]" : "border-none"
          } lg:flex flex-col lg:flex-row lg:items-center lg:gap-8 absolute lg:static top-[4.4rem] left-0 w-full lg:w-auto bg-transparent backdrop-blur lg:backdrop-blur-none lg:bg-transparent p-4 lg:p-0`}
        >
          {TopBarData.map((item) => (
            <Box
              key={item.name}
              className={`text-[.9rem] cursor-pointer pt-1 ${
                isMenuOpen ? "py-[20px]" : "py-[0px]"
              } font-regular`}
            >
              {item.name}
            </Box>
          ))}

          <HStack className="inline-flex bg-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[1.3rem] gap-2 cursor-pointer">
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
    </Flex>
  );
};

export default Header;
