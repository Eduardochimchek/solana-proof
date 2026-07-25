import { createHash } from "node:crypto";

export function sha256Hex(data: string | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

/**
 * Serializes a flat record into a deterministic JSON string (sorted keys)
 * so the same logical content always produces the same hash.
 */
export function toCanonicalJson(payload: Record<string, string | null>): string {
  const sorted: Record<string, string | null> = {};
  for (const key of Object.keys(payload).sort()) {
    sorted[key] = payload[key];
  }
  return JSON.stringify(sorted);
}

export const MEMO_NAMESPACE = "solana-proof:v1";

export function buildMemoPayload(hash: string): string {
  return `${MEMO_NAMESPACE}:${hash}`;
}
