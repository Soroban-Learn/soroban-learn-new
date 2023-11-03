"use client";
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";

import { queryClient } from "@/api/queryClient";
import "./globals.css";

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
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>{children}</RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}
