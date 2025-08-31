import "./globals.css";
import { founders } from "@/ui/fonts/font-config";
import QueryClientWrapper from "@/util/QueryClientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: "Rising Sun Inc",
  description: "Rising Sun Inc - ",
  icons: {
    icon: '/logo.svg'
  }
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
        <ToastContainer/>
        </body>
    </html>
  );
}
