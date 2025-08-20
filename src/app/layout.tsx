import type { Metadata } from "next";
import { Lato, Merriweather } from "next/font/google";

import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-merriweather",
});
export const metadata: Metadata = {
  title: "Credizza",
  description: "Creditos, facil, simple y agil",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
