import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AppProviders from "./providers";
import Footer from "@/components/layout/Footer";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ButtonChat from "@/components/buttons/ButtonChat";
import CrispWidget from "@/components/layout/CrispWidget";
import SafetyNotice from "@/components/layout/SafetyNotice";


export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://credizza.com.ar"),
  title: "Credizza | Orientación para solicitar préstamos",
  description:
    "Consultá opciones de préstamos y sus condiciones. Atención online y acompañamiento en la solicitud, sujeto a evaluación de la entidad otorgante.",
  icons: { icon: "/favicon.ico" },
  alternates: {
    canonical: "https://credizza.com.ar/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://credizza.com.ar",
    siteName: "Credizza",
    title: "Credizza | Orientación para solicitar préstamos",
    description:
      "Consultá opciones de préstamos y sus condiciones. Atención online y acompañamiento en la solicitud, sujeto a evaluación de la entidad otorgante.",
    images: [
      {
        url: "/Logo-Navbar.webp",
        width: 64,
        height: 64,
        alt: "Credizza",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Credizza | Orientación para solicitar préstamos",
    description:
      "Consultá opciones de préstamos y sus condiciones. Atención online y acompañamiento en la solicitud, sujeto a evaluación de la entidad otorgante.",
    images: ["/Logo-Navbar.webp"],
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

        <SpeedInsights />
        <Analytics />

        <CrispWidget />
        <ButtonChat />
        <SafetyNotice />
      </body>
    </html>
  );
}