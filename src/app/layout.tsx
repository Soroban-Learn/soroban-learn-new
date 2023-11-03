"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

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
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
