import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Wanderpaw — Premium Dog Boots & Outdoor Gear",
  description:
    "Built for every path. Made for every dog. Premium dog boots and outdoor lifestyle gear for the urban adventurer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        <LayoutShell />
        {children}
      </body>
    </html>
  );
}
