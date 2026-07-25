"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";
import { SolanaWalletProvider } from "@/components/providers/solana-wallet-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <QueryProvider>
        <SolanaWalletProvider>
          <TooltipProvider delay={200}>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </SolanaWalletProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
