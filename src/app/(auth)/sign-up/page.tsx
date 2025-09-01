import { Box } from "@/ui/primitives/ui-layout";
import AuthForm from "@/modules/inputs/AuthForm";


const Page = () => {

  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: `
          radial-gradient(
            ellipse at center,
            rgba(92, 52, 156, 0.6) 15%,
            rgba(17, 17, 29, 1) 85%
          ),
          linear-gradient(to bottom, #0a0a0a, #171717)
        `,
      }}
    >
      <AuthForm type="sign-up"/>
    </Box>
  );
};

export default Page;
