import { Box } from "@/ui/primitives/ui-layout";
import { Text } from "@/ui/primitives/typography";

interface ResultPanelProps {
  result: string;
  isEven: boolean;
  userChoice: "even" | "odd" | null;
}

export default function ResultPanel({ result, isEven, userChoice }: ResultPanelProps) {
  return (
    <Box className="mt-4 text-center h-[200px]">
      <Box
        className={`px-3 py-2 w-[50%] font-semibold text-[1.5rem] m-auto mt-8 
          ${isEven ? "bg-[#0a9737]" : "bg-[#de9244]"}`}
      >
        {isEven ? "EVEN" : "ODD"}
      </Box>
      <Text
        className={`${result.includes("won") ? "text-green-500" : "text-red-500"} mt-3`}
      >
        {result.includes("won")
          ? result
          : userChoice
          ? `${result}. You chose ${userChoice.toUpperCase()}`
          : `${result}. No choice was made`}
      </Text>
    </Box>
  );
}
