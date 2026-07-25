"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface WalletGateProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function WalletGate({
  children,
  title = "Conecte sua carteira para continuar",
  description = "Você precisa de uma carteira Solana conectada para acessar este conteúdo.",
}: WalletGateProps) {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  if (connected) return <>{children}</>;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent">
        <Wallet className="size-5" />
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Button onClick={() => setVisible(true)}>Conectar carteira</Button>
    </div>
  );
}
