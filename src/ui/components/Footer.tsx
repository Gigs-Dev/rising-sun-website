import React from "react";
import { Box } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";

const Footer = () => {
  return (
    <Box
      className="w-full py-[3rem] px-[5rem] flex flex-col lg:flex-row justify-around items-start"
      style={{ backgroundColor: "rgba(75, 49, 106, 0.3)" }}
    >
      <Text>FOOTER</Text>
    </Box>
  );
};

export default Footer;
