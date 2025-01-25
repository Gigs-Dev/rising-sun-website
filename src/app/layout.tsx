import "./globals.css";
import { founders } from "@/ui/fonts/font-config";

export const metadata = {
  title: "Rising Sun",
  description: "A beautiful example of Next.js + Tailwind + Local Fonts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={founders.variable}>
      <body>{children}</body>
    </html>
  );
}
