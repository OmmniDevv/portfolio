import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import { AchievementsProvider } from "@/lib/achievements";
import { LangProvider } from "@/lib/i18n";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://omnidevv.vercel.app"),
  title: {
    default: "OmniDev · Abdul Malik Rizky Nur Rahmat | Junior Web Developer",
    template: "%s · OmniDev",
  },
  description:
    "Portfolio Abdul Malik Rizky Nur Rahmat, junior developer dari Bandung yang membangun website cepat, bot automasi WhatsApp/Telegram/Discord, dan pengalaman digital yang rapi.",
  keywords: [
    "Abdul Malik Rizky Nur Rahmat",
    "OmniDev",
    "junior developer",
    "web developer Bandung",
    "bot WhatsApp",
    "bot Telegram",
    "Next.js",
    "Laravel",
    "freelancer Indonesia",
    "portfolio developer",
  ],
  authors: [{ name: "Abdul Malik Rizky Nur Rahmat" }],
  creator: "OmniDev",
  openGraph: {
    title: "OmniDev · Abdul Malik Rizky Nur Rahmat | Junior Web Developer",
    description:
      "Junior developer dari Bandung, website cepat, bot automasi, dan pengalaman digital yang rapi.",
    url: "https://omnidevv.vercel.app",
    siteName: "OmniDev",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero-room.webp",
        width: 1200,
        height: 630,
        alt: "OmniDev · Portfolio Abdul Malik Rizky Nur Rahmat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniDev · Abdul Malik Rizky Nur Rahmat | Junior Web Developer",
    description:
      "Junior developer dari Bandung, website cepat, bot automasi, dan pengalaman digital yang rapi.",
    images: ["/images/hero-room.webp"],
  },
  robots: { index: true, follow: true },
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
        <LangProvider>
          <AchievementsProvider>
            <div className="ground" aria-hidden="true" />
            <Navbar />
            <main>{children}</main>
            <CommandPalette />
          </AchievementsProvider>
        </LangProvider>
      </body>
    </html>
  );
}
