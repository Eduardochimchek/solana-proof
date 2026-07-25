/**
 * Maps wallet and Solana RPC errors to user-facing Portuguese messages.
 */
export function toWalletErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : "";

  if (
    name === "WalletSendTransactionError" ||
    message.includes("User rejected") ||
    message.includes("rejected the request")
  ) {
    return "Transação cancelada na carteira.";
  }

  if (
    message.includes("insufficient funds") ||
    message.includes("Insufficient") ||
    message.includes("SOL insuficiente")
  ) {
    return "Saldo insuficiente na Devnet. Solicite SOL de teste em faucet.solana.com.";
  }

  if (
    name === "TransactionExpiredBlockheightExceededError" ||
    message.includes("block height exceeded") ||
    message.includes("has expired")
  ) {
    return "A transação expirou antes de ser confirmada. Tente novamente e confirme na Phantom em até 1 minuto.";
  }

  if (message.includes("Unexpected error")) {
    return "A carteira não conseguiu enviar a transação. Verifique se há SOL na Devnet e tente novamente.";
  }

  return message || "Erro inesperado ao assinar a transação.";
}

export function isTransactionExpiredError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : "";
  return (
    name === "TransactionExpiredBlockheightExceededError" ||
    message.includes("block height exceeded") ||
    message.includes("has expired")
  );
}
