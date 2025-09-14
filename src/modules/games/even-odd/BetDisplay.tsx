import { Box, Flex } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";
import Image from "next/image";
import emptyChipIcon from "@/svgs/empty_casino_chips.svg";

interface BetDisplayProps {
  betAmount: number;
  walletBalance: number;
  minBet?: number;
}

export default function BetDisplay({ betAmount, walletBalance, minBet = 10 }: BetDisplayProps) {
  const checkBalance = walletBalance < betAmount;

  return (
    <Box className="mt-[2rem]">
      {checkBalance && (
        <Box className="text-center text-red-500">
          Insufficient funds! Please add more money to continue.
        </Box>
      )}
      <Flex
        className={`h-full px-3 justify-between w-[40%] m-auto border 
          ${checkBalance ? "border-red-500" : "border-black"}`}
      >
        <Text className={`font-semibold relative top-[4px] ${checkBalance ? "text-red-500" : ""}`}>
          Bet
        </Text>
        <Flex className="gap-1">
          <Image src={emptyChipIcon} alt="chip" width={15} height={15} />
          <p className="font-semibold relative top-[4px]">{betAmount.toLocaleString()}</p>
        </Flex>
      </Flex>
    </Box>
  );
}
