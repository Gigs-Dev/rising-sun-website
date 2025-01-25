import GameCollections from "@/modules/home/GameCollections";
import HeroBox from "@/modules/home/HeroBox";
import MainLayout from "@/pages/home/home";
import { Box } from "@/ui/primitives/ui-layout";

export default function Home() {
  return (
    <Box>
      <MainLayout>
        <HeroBox />
        <GameCollections />
      </MainLayout>
    </Box>
  );
}
