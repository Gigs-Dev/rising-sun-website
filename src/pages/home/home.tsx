import { Box } from "@/ui/primitives/ui-layout";
import Footer from "@/ui/components/Footer";
import Header from "@/ui/components/Header";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box className="min-h-screen flex flex-col">
      <Header />
      <Box className="flex-grow">
        <Box className="flex-grow p-[5rem]">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
