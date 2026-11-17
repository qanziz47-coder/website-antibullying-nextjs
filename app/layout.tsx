
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
  metadataBase: new URL("https://antibullying.hafzdev.web.id"),

  title: "STOPBULLY | Website AntiPerundungan",

  description:
    "Website edukasi dan pelaporan perundungan. Memberikan ruang bagi korban untuk melapor kepada pihak yang berwenang dan terpercaya.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "STOPBULLY | Berani Bersuara, Hentikan Perundungan",
    description:
      "Bersama menciptakan lingkungan sekolah yang aman, nyaman, dan bebas perundungan. Kenali, cegah, dan laporkan tindakan perundungan.",
    url: "https://antibullying.hafzdev.web.id/",
    siteName: "STOPBULLY",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/img/aduh.png",
        width: 1200,
        height: 630,
        alt: "STOPBULLY - Website Edukasi dan Pelaporan Perundungan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "STOPBULLY | Berani Bersuara",
    description:
      "Bersama menciptakan lingkungan sekolah yang aman dan bebas perundungan.",
    images: ["/img/aduh.png"],
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
