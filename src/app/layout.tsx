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
  metadataBase: new URL("https://credizza.com.ar"),
  title: "Credizza | Sitio en construcción 🚧",
  description:
    "Muy pronto lanzamos nuestra nueva web con toda la información sobre créditos simples, ágiles y seguros para jubilados y pensionados.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://credizza.com.ar",
    siteName: "Credizza",
    title: "Credizza | Sitio en construcción 🚧",
    description:
      "Muy pronto lanzamos nuestra nueva web con toda la información sobre créditos simples, ágiles y seguros para jubilados y pensionados.",
    images: [
      {
        url: "/og-construccion.webp",
        width: 1200,
        height: 630,
        alt: "Credizza - Sitio en construcción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Credizza | Sitio en construcción 🚧",
    description:
      "Muy pronto lanzamos nuestra nueva web con toda la información sobre créditos simples, ágiles y seguros para jubilados y pensionados.",
    images: ["/og-construccion.webp"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body
        className={`${lato.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
