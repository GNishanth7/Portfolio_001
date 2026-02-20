import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nishanth Gopinath | Portfolio Workspace",
  description: "VS Code-inspired interactive portfolio featuring AI, ML, and distributed systems case studies.",
  keywords: ["portfolio", "AI engineer", "machine learning", "data science", "Nishanth Gopinath", "Trinity College Dublin"],
  authors: [{ name: "Nishanth Gopinath" }],
  openGraph: {
    title: "Nishanth Gopinath | Portfolio Workspace",
    description: "Explore projects and journey inside an interactive IDE-style portfolio.",
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
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
