import GameCollections from "@/modules/home/GameCollections";
import HeroBox from "@/modules/home/HeroBox";
import PlayersBase from "@/modules/home/PlayersBase";
import MainLayout from "@/pages/home/home";
import { Box } from "@/ui/primitives/ui-layout";

export default function Home() {
  return (
    <Box>
      <MainLayout>
        <HeroBox />
        <GameCollections />
        <PlayersBase />
      </MainLayout>
    </Box>
  );
}
