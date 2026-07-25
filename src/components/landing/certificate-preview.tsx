import { CheckCircle2, ShieldCheck } from "lucide-react";

export function CertificatePreview() {
  return (
    <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card/60 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-purple to-brand-green">
            <ShieldCheck className="size-5 text-black" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-sm font-semibold">Certificado #a1x9k2</p>
            <p className="text-xs text-muted-foreground">Solana Devnet</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green">
          <CheckCircle2 className="size-3.5" />
          Verificado
        </span>
      </div>

      <div className="mt-6 space-y-4 border-t border-border/60 pt-4">
        <PreviewField label="Título" value="Conclusão do Workshop Solana" />
        <PreviewField
          label="Hash SHA-256"
          value="8f3a1c9e...b02d47f1"
          mono
        />
        <PreviewField
          label="Assinatura da transação"
          value="5h7kQm...WnP2xR"
          mono
        />
        <PreviewField label="Emitido em" value="24 jul 2026, 14:32" />
      </div>
    </div>
  );
}

function PreviewField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs" : "font-medium"}>{value}</span>
    </div>
  );
}
