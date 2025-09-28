import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AppProviders from "./providers";
import Footer from "@/components/layout/Footer";
import { Poppins } from 'next/font/google';
import CrispWidget from "@/components/layout/CrispWidget";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://credizza.com.ar"),
  title: "Credizza | Sitio en construcción 🚧",
  description:
    "Muy pronto lanzamos nuestra nueva web con toda la información sobre créditos simples, ágiles y seguros para jubilados y pensionados.",
  icons: { icon: "/favicon.ico" },
  alternates: {
    canonical: "https://credizza.com.ar/",
  },
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
    title: "Credizza",
    description: "Muy pronto lanzamos nuestra nueva web con toda la información sobre créditos simples, ágiles y seguros para jubilados y pensionados.",
    images: ["/og-construccion.webp"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-background-default" lang="es-AR">
      <body className={poppins.className}>
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
        <CrispWidget />
      </body>
    </html>
  );
}
