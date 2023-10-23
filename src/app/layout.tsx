import ReduxProvider from "@/redux/provider";
import { Inter } from "next/font/google";
import ColorThemeProvider from "@/mui-components/ColorThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dream Forest",
  description: "Where Dreams Come to Life, One Leaf at a Time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ColorThemeProvider>{children}</ColorThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
