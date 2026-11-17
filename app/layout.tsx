
import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import SiteOverlays from "./components/SiteOverlays";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});
export const metadata: Metadata = {
  title: "AntiBullying — Sistem Pelaporan",
  description: "Website pelaporan perundungan sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body
        className={`${playfair.variable} ${lora.variable} font-serif antialiased bg-[#fdfbf7] text-slate-800`}
      >
        {children}
        {/* Loading Screen dan Cookie Consent */}
        <SiteOverlays />
      </body>
    </html>
  );
}
