import { Box, Flex } from "@/ui/primitives/ui-layout";
import ChipCarousel from "@/app/(games)/even-odd/components/chipCarousel";

interface ChipSelectorProps {
  onSelect: (chip: number) => void;
  maxBet: number;
  minBet?: number;
}

export default function ChipSelector({ onSelect, maxBet, minBet = 10 }: ChipSelectorProps) {
  const format = (value: number) => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toString();
  };

  return (
    <Box className="mt-8 px-2">
      <ChipCarousel onSelect={onSelect} />
      <Flex className="justify-center gap-10 text-gray-400 font-semibold">
        <span>Min: {minBet}</span>
        <span>Max: {format(maxBet)}</span>
      </Flex>
    </Box>
  );
}
