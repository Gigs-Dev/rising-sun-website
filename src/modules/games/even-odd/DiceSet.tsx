import { Box, Flex } from "@/ui/primitives/ui-layout";
import { keyframes } from "@emotion/react";
import { diceFaces } from "./diceFaces";

// const diceFaces: Record<1 | 2 | 3 | 4 | 5 | 6, boolean[][]> = { ... }

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function Dice({ dice, rolling }: { dice: number[], rolling: boolean[] }) {
  return (
    <Flex className="gap-2 sm:gap-4 justify-center items-center mt-5">
      {dice.map((value, index) => (
        <Box
          key={index}
          className={`w-12 h-12 sm:w-16 sm:h-16 bg-white border-2 border-black grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-md`}
          style={{
            animation: rolling[index] ? `${spin} 0.5s linear` : "none",
          }}
        >
          {value !== 0 &&
            diceFaces[value as 1 | 2 | 3 | 4 | 5 | 6].map((row, r) =>
              row.map((dot, c) => (
                <Box
                  key={`${r}-${c}`}
                  className={`w-2 h-2 rounded-full ${dot ? "bg-black" : "bg-transparent"}`}
                  style={{ justifySelf: "center", alignSelf: "center" }}
                >
                  <></>
                </Box>
              ))
            )}
        </Box>
      ))}
    </Flex>
  );
}
