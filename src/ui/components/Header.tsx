"use client";

import { Box, Flex, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import LogoIcon from "@/svgs/logo.svg";
import BrIcon from "@/svgs/br.svg";
import MenuIcon from "@/svgs/menu.svg";
import CloseIcon from "@/svgs/close.svg";
import { TopBarData } from "@/data/top-bar-list";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import useUserStore from "@/store/state/use-user-state";
import { useRouter } from "next/navigation";



const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter()

  
  const config = {
    public_key: process.env.NEXT_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toString(),
      amount: 100,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'user@gmail.com',
        phone_number: '070********',
        name: 'john doe',
      },
      customizations: {
        title: 'my Payment Title',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
      },
    };

  const handlePayment = useFlutterwave(config);

  const { token, logout } = useUserStore();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleLogout = () => {
    logout();
    router.replace('/sigin-in')
  }


  return (
    <Flex className="fixed top-[1px] left-0 w-full md:justify-around justify-between px-4 py-5 bg-transparent z-50">
      {/* Links container */}
      <Flex
        className={`lg:flex border border-[#555] rounded-[10px] px-3 py-1.5 bg-transparent backdrop-blur gap-8 w-full justify-between items-center lg:max-w-[800px] lg:mx-auto relative`}
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
            isMenuOpen
              ? "border-b border-[#555] bg-[#f5f5f5] w-[96%] left-1/2 transform -translate-x-1/2 rounded-b-[10px] rounded-t-[4px]"
              : "border-none"
          } lg:flex flex-col lg:flex-row lg:items-center lg:gap-8 absolute lg:static top-full left-0 w-full lg:w-auto backdrop-blur lg:backdrop-blur-none lg:bg-transparent p-4 lg:p-0`}
        >

          
          { token ?
            <span 
            onClick={() => {
            handlePayment({
              callback: (response) => {
                console.log(response);
                  closePaymentModal() 
              },
              onClose: () => {},
            });
          }}
              className={`text-[.9rem] cursor-pointer pt-1 bg-[green]  p-3 rounded-md ${
                  isMenuOpen ? "py-[5px] text-center text-[#fff]" : "py-[0px]"
                } font-regular`}>
                Fund Account
            </span>:

             <Box
              className={`text-[.9rem] cursor-pointer pt-1 ${
                isMenuOpen ? "py-[20px] text-[#000000]" : "py-[0px]"
              } font-regular`}
            >
             <span>Help Center</span>
            </Box>
          }


          {TopBarData.map((item) => (
            <Box
              key={item.name}
              className={`text-[.9rem] cursor-pointer pt-1 ${
                isMenuOpen ? "py-[20px] text-[#000000]" : "py-[0px]"
              } font-regular`}
            >
              {item.name}
            </Box>
          ))}

          {/*  */}
          {token === null ? (
            <HStack
              className={`${
                isMenuOpen ? "border border-[#555]" : ""
              } inline-flex bg-[#ffffff] text-center py-[.4rem] rounded-[10px] px-[1.3rem] gap-2 cursor-pointer`}
            >
              <Link href="/sign-in">
                <Text className="text-[.9rem] text-[#000000] font-regular pt-1">
                  Account Sign In
                </Text>
              </Link>
              <Image
                priority
                src={BrIcon}
                alt="arrow-right"
                width={20}
                height={20}
              />
            </HStack>
          ) : (
            <Text onClick={handleLogout} className="cursor-pointer">Log out</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
