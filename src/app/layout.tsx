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
      <head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-rqn26AG5Pj86AF4SO72RK5fyefcQ/x32DNQfChxWvbXIyXFePlEktwD18fEz+kQU"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
