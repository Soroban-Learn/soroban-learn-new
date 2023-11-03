import { Inter } from "next/font/google";

import "./globals.css";
import LayoutProviders from './layoutProviders';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soroban Learn",
  description: "A better description will go here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProviders>
          {children}
        </LayoutProviders>
      </body>
    </html>
  );
}
