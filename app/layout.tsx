import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png"
  },
  applicationName: "DASVO s.r.o",
  generator: "Next.ts",
  title: "DASVO s.r.o, Alergologie v Havlíčkově Brodě poskytuje komplexní diagnostiku a léčbu alergických onemocnění, včetně pylových, potravinových a kožních alergií. Odborní alergologové zde nabízejí moderní testy, imunoterapii i péči pro děti i dospělé. ",
  authors: [{name: "Adam Hitzger"}, {name: "Lukáš Svoboda"}],
  keywords: [
    "alergologie",
    "alergolog",
    "alergologická klinika",
    "vyšetření na alergie",
    "testy na alergie",
    "alergické reakce",
    "léčba alergií",
    "imunoterapie",
    "alergologická ordinace",
    "specialista na alergie",
    "pylová alergie",
    "potravinová alergie",
],
creator: "Adam Hitzger",
        publisher: "Adam Hitzger",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
          },
openGraph: {
  title: "DASVO s.r.o",
  description: "Alergologie v Havlíčkově Brodě poskytuje komplexní diagnostiku a léčbu alergických onemocnění, včetně pylových, potravinových a kožních alergií. Odborní alergologové zde nabízejí moderní testy, imunoterapii i péči pro děti i dospělé. ",
  url: "https://www.dasvo.cz",
  siteName: "DASVO s.r.o",
  locale: "cs_CZ",
  type: "website"
}
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
