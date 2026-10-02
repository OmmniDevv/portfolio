import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://omnidevv.vercel.app"),
  title: "OmniDev — Abdul Malik Rizky Nur Rahmat",
  description: "Junior developer crafting web experiences and automation bots.",
  openGraph: {
    title: "OmniDev — Abdul Malik Rizky Nur Rahmat",
    description: "Junior developer crafting web experiences and automation bots.",
    url: "https://omnidevv.vercel.app",
    siteName: "OmniDev",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
