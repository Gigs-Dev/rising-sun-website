import { Box, Flex } from "@/ui/primitives/ui-layout";

interface ActionButtonsProps {
  result: string;
  onEven: () => void;
  onOdd: () => void;
  onRebet: () => void;
  onNewRound: () => void;
}

export default function ActionButtons({ result, onEven, onOdd, onRebet, onNewRound }: ActionButtonsProps) {
  return !result ? (
    <Flex className="justify-center m-auto mt-2 w-[400px] md:w-[525px]">
      <Box
        className="cursor-pointer px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]"
        onClick={onEven}
      >
        <span>EVEN</span>
        <span className="text-[.9rem]">Pays 2x</span>
      </Box>
      <Box
        className="cursor-pointer px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#de9244]"
        onClick={onOdd}
      >
        <span>ODD</span>
        <span className="text-[.9rem]">Pays 2x</span>
      </Box>
    </Flex>
  ) : (
    <Flex className="justify-center m-auto mt-2 w-[400px] md:w-[525px] gap-2">
      <Box
        className="cursor-pointer px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]"
        onClick={onRebet}
      >
        REBET
      </Box>
      <Box
        className="cursor-pointer px-3 py-2 w-[50%] font-semibold text-[1.2rem] sm:text-[1.5rem] flex flex-col items-center bg-[#0a9737]"
        onClick={onNewRound}
      >
        NEW ROUND
      </Box>
    </Flex>
  );
}
