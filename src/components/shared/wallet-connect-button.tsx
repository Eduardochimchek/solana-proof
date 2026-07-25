"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Check, ChevronDown, Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateMiddle } from "@/lib/format";
import { SOLANA_NETWORK } from "@/lib/solana";

export function WalletConnectButton() {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    toast.success("Endereço copiado.");
    setTimeout(() => setCopied(false), 1500);
  }, [publicKey]);

  if (!connected || !publicKey) {
    return (
      <Button
        onClick={() => setVisible(true)}
        disabled={connecting}
        className="gap-2"
      >
        <Wallet className="size-4" />
        {connecting ? "Conectando..." : "Conectar carteira"}
      </Button>
    );
  }

  const address = publicKey.toBase58();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className="gap-2 font-mono" />}
      >
        <span className="size-2 rounded-full bg-brand-green" aria-hidden />
        {truncateMiddle(address)}
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleCopy} className="gap-2">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copiar endereço
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          render={
            <a
              href={`https://explorer.solana.com/address/${address}?cluster=${SOLANA_NETWORK}`}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <ExternalLink className="size-4" />
          Ver no Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
