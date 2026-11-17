
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
  title: "website anti pembullyian | STOPBULLY",
  description: "website ini memberikan edukasi dan juga memberikan kepada korban untuk melapor kepada pihak bersangkutan yang terpercaya",
  metadataBase: new URL("https://antibullying.hafzdev.web.id/"), 
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AntiBullying | Website",
    description: "website ini memberikan edukasi dan juga memberikan kepada korban untuk melapor kepada pihak bersangkutan yang terpercaya",
    url: "https://antibullying.hafzdev.web.id/",
    siteName: "HafzDev",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HafzDev | Developer",
    description: "Portofolio Fajri Hafiz. Menjelajahi dunia web, IoT, dan keamanan siber.",
  },
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
