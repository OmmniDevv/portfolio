import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <html lang="id" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="ground" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
