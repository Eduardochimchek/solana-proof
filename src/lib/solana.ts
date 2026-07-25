import { Connection, PublicKey } from "@solana/web3.js";

export const SOLANA_NETWORK = "devnet" as const;

const DEFAULT_DEVNET_RPC_URL = "https://api.devnet.solana.com";

export const SOLANA_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim() || DEFAULT_DEVNET_RPC_URL;

/** Official Solana Memo Program (v2). Used to anchor certificate hashes on-chain. */
export const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

let serverConnection: Connection | null = null;

/** Shared connection instance for use in Route Handlers (Node.js runtime). */
export function getServerConnection(): Connection {
  if (!serverConnection) {
    serverConnection = new Connection(SOLANA_RPC_URL, "confirmed");
  }
  return serverConnection;
}

export function getExplorerUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`;
}

export function isValidPublicKey(value: string): boolean {
  try {
    new PublicKey(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidTransactionSignature(value: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{64,98}$/.test(value);
}
