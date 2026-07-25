"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo, type ReactNode } from "react";

import { SOLANA_RPC_URL } from "@/lib/solana";

import "@solana/wallet-adapter-react-ui/styles.css";

/**
 * No explicit wallet adapters are registered here. Modern wallets such as
 * Phantom and Solflare implement the Wallet Standard and are detected
 * automatically, which keeps the client bundle lean and avoids depending on
 * the legacy `@solana/wallet-adapter-wallets` package.
 */
export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => SOLANA_RPC_URL, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
