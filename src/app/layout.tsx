import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
});

export const metadata: Metadata = {
  title: "Nishanth Gopinath | Data Scientist & AI Engineer",
  description: "A retro arcade-themed portfolio showcasing AI/ML projects, distributed systems, and data science work",
  keywords: ["portfolio", "data science", "machine learning", "AI", "Nishanth Gopinath", "Trinity College Dublin"],
  authors: [{ name: "Nishanth Gopinath" }],
  openGraph: {
    title: "Nishanth Gopinath | Quest for AI Mastery",
    description: "Insert coin to explore my AI/ML projects and data science work",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pressStart2P.variable} antialiased bg-[#0a0a0f] min-h-screen`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
