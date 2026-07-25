import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { MEMO_PROGRAM_ID } from "@/lib/solana";

export function buildMemoInstruction(memo: string): TransactionInstruction {
  return new TransactionInstruction({
    keys: [],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo, "utf-8"),
  });
}

export async function buildUnsignedMemoTransaction(
  connection: Connection,
  feePayer: PublicKey,
  memo: string,
): Promise<Transaction> {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  const transaction = new Transaction({
    feePayer,
    blockhash,
    lastValidBlockHeight,
  });
  transaction.add(buildMemoInstruction(memo));

  return transaction;
}

export function serializeTransactionToBase64(transaction: Transaction): string {
  return transaction
    .serialize({ requireAllSignatures: false, verifySignatures: false })
    .toString("base64");
}

export type MemoVerificationResult =
  | { ok: true }
  | { ok: false; reason: string };

interface VerifyMemoTransactionParams {
  connection: Connection;
  signature: string;
  expectedMemo: string;
  expectedFeePayer: string;
}

/**
 * Re-fetches the transaction directly from the Solana network and checks
 * that it is confirmed, paid for by the claimed wallet, and contains a
 * Memo instruction with the exact expected payload. This is the trust
 * boundary that prevents persisting certificates that were not genuinely
 * anchored on-chain.
 */
export async function verifyMemoTransaction({
  connection,
  signature,
  expectedMemo,
  expectedFeePayer,
}: VerifyMemoTransactionParams): Promise<MemoVerificationResult> {
  const transaction = await connection.getTransaction(signature, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });

  if (!transaction) {
    return {
      ok: false,
      reason: "Transação não encontrada na Solana Devnet. Aguarde a confirmação e tente novamente.",
    };
  }

  if (transaction.meta?.err) {
    return { ok: false, reason: "A transação falhou na rede Solana." };
  }

  const accountKeys = transaction.transaction.message.getAccountKeys();
  const feePayer = accountKeys.get(0)?.toBase58();

  if (feePayer !== expectedFeePayer) {
    return {
      ok: false,
      reason: "A transação não foi assinada pela carteira informada.",
    };
  }

  const memoInstruction = transaction.transaction.message.compiledInstructions.find(
    (instruction) => {
      const programId = accountKeys.get(instruction.programIdIndex);
      return programId?.equals(MEMO_PROGRAM_ID) ?? false;
    },
  );

  if (!memoInstruction) {
    return {
      ok: false,
      reason: "Nenhuma instrução Memo foi encontrada na transação.",
    };
  }

  const memoText = Buffer.from(memoInstruction.data).toString("utf-8");
  if (memoText !== expectedMemo) {
    return {
      ok: false,
      reason: "O conteúdo registrado on-chain não corresponde ao hash esperado.",
    };
  }

  return { ok: true };
}
