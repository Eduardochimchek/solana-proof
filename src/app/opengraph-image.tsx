import { ImageResponse } from "next/og";

import { BRAND_GRADIENT, ShieldMark } from "@/lib/brand-mark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Solana Proof — Certificação digital na blockchain Solana";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(153,69,255,0.35), transparent 55%), radial-gradient(circle at 10% 85%, rgba(20,241,149,0.25), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: BRAND_GRADIENT,
            }}
          >
            <ShieldMark size={40} />
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#fafafa" }}>
            Solana Proof
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 54,
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#fafafa",
            maxWidth: 920,
          }}
        >
          Certificação digital com prova criptográfica na blockchain
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 820,
          }}
        >
          Registre e verifique documentos na Solana Devnet. Rápido, verificável e não-custodial.
        </div>
      </div>
    ),
    { ...size },
  );
}
