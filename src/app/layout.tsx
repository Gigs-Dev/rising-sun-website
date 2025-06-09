import "./globals.css";
import { founders } from "@/ui/fonts/font-config";
import QueryClientWrapper from "@/util/QueryClientProvider";


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
      <body className="bg-[#0a0a0a]">
        <QueryClientWrapper>
           {children}
        </QueryClientWrapper>
        </body>
    </html>
  );
}
