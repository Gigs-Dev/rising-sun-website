import { Box } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import React from "react";

const Footer = () => {
  return (
    <Box
      className="w-full h-[500px]"
      style={{ backgroundColor: "rgba(75, 49, 106, 0.3)" }}
    >
      <Text>footer</Text>
    </Box>
  );
};

export default Footer;
