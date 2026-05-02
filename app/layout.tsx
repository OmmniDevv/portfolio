import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import SpotifyWidget from "@/components/SpotifyWidget";
import SplashScreen from "@/components/SplashScreen";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omnidev.vercel.app"),
  title: "OmniDev — Abdul Malik Rizky Nur Rahmat",
  description:
    "Junior Developer & Bot Architect. Crafting digital worlds, one line of code at a time.",
  keywords: [
    "OmniDev",
    "Abdul Malik",
    "developer",
    "portfolio",
    "bot development",
    "web development",
    "TypeScript",
    "JavaScript",
  ],
  authors: [{ name: "Abdul Malik Rizky Nur Rahmat" }],
  openGraph: {
    title: "OmniDev — Abdul Malik Rizky Nur Rahmat",
    description: "Junior Developer & Bot Architect",
    url: "https://omnidev.vercel.app",
    siteName: "OmniDev Portfolio",
    images: [{ url: "/images/profile.jpg", width: 800, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniDev — Abdul Malik Rizky Nur Rahmat",
    description: "Junior Developer & Bot Architect",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CustomCursor />
        <SplashScreen />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <SpotifyWidget />
        <KonamiEasterEgg />
      </body>
    </html>
  );
}
