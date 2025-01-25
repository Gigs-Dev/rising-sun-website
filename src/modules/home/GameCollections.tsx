import React from "react";
import { Box } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";

const GameCollections = () => {
  return (
    <Box className="my-[5rem] border-t-[1px] border-t-[#999] py-[1.5rem]">
      <Text className="text-center font-semibold text-[2rem] tracking-[.2px]">
        GAME COLLECTIONS
      </Text>
    </Box>
  );
};

export default GameCollections;
