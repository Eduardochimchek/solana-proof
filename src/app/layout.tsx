import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const APP_DESCRIPTION =
  "Emita certificados digitais com prova criptográfica permanente na blockchain Solana. Rápido, verificável e não-custodial.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Solana Proof — Certificação digital na blockchain Solana",
    template: "%s · Solana Proof",
  },
  description: APP_DESCRIPTION,
  keywords: [
    "Solana",
    "blockchain",
    "certificado digital",
    "prova de existência",
    "Web3",
    "devnet",
  ],
  authors: [{ name: "Eduardo Jeronimo" }],
  creator: "Eduardo Jeronimo",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: APP_URL,
    title: "Solana Proof — Certificação digital na blockchain Solana",
    description: APP_DESCRIPTION,
    siteName: "Solana Proof",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Proof — Certificação digital na blockchain Solana",
    description: APP_DESCRIPTION,
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AppProviders>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
