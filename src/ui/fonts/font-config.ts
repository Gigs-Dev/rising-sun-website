import localFont from "next/font/local";

export const founders = localFont({
  src: [
    {
      path: "./local-fonts/FoundersGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-BoldItalic.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-MediumItalic.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./local-fonts/FoundersGrotesk-RegularItalic.otf",
      weight: "50",
      style: "normal",
    },
  ],
  variable: "--font-founders",
});
