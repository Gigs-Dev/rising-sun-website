import React from "react";
import { Box, HStack } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import Image from "next/image";

import FacebookIcon from "@/svgs/facebook.svg";
import InstagramIcon from "@/svgs/instagram.svg";
import YoutubeIcon from "@/svgs/youtube.svg";
import TiktokIcon from "@/svgs/tiktok.svg";

const Footer = () => {
  return (
    <Box
      className="w-full py-[3rem] px-[2rem] flex flex-col justify-center items-center"
      style={{ backgroundColor: "rgba(75, 49, 106, 0.3)" }}
    >
      <Text className="font-medium text-[1.3rem] md:text-[1.4rem] trailing-normal text-[#ffffff] text-center">
        Rising Sun Corporation Inc.
      </Text>
      <Text className="font-regular text-[.9rem] md:text-[1rem] text-[#e5e5e5] w-full md:w-[40%] text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt porro
        repudiandae, nemo aspernatur, obcaecati cupiditate, dolores eveniet
        impedit nisi iste consectetur blanditiis ducimus placeat dolore.
      </Text>

      <HStack className="gap-5 mt-[1rem]">
        <Image
          priority
          src={FacebookIcon}
          alt="facebook"
          width={30}
          height={30}
        />
        <Image
          priority
          src={InstagramIcon}
          alt="instagram"
          width={30}
          height={30}
        />
        <Image
          priority
          src={YoutubeIcon}
          alt="youtube"
          width={30}
          height={30}
        />
        <Image priority src={TiktokIcon} alt="tiktok" width={30} height={30} />
      </HStack>

      <Text className="font-regular text-[.8rem] md:text-[.8rem] text-[#e5e5e5] w-full md:w-[40%] text-center mt-[3rem]">
        @2025 Rising Sun. All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
