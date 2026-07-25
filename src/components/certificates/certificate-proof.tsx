import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BadgeCheck, FileText, User, Wallet } from "lucide-react";

import { CopyField } from "@/components/shared/copy-field";
import { Badge } from "@/components/ui/badge";
import { formatBytes, truncateMiddle } from "@/lib/format";
import { getExplorerUrl } from "@/lib/solana";
import type { CertificateDto } from "@/types/certificate";

export function CertificateProof({ certificate }: { certificate: CertificateDto }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/5 px-6 py-8 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-green/15">
          <BadgeCheck className="size-6 text-brand-green" />
        </span>
        <p className="text-lg font-semibold">Certificado verificado on-chain</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Este registro foi confirmado de forma independente na Solana Devnet e não
          pode ser alterado.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-card/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">{certificate.title}</h2>
            {certificate.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {certificate.description}
              </p>
            )}
          </div>
          <Badge variant="secondary" className="uppercase">
            {certificate.network}
          </Badge>
        </div>

        <div className="grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
          {certificate.recipientName && (
            <InfoRow icon={User} label="Destinatário" value={certificate.recipientName} />
          )}
          <InfoRow
            icon={Wallet}
            label="Emitido pela carteira"
            value={truncateMiddle(certificate.walletAddress, 6)}
          />
          {certificate.sourceType === "document" && certificate.fileName && (
            <InfoRow
              icon={FileText}
              label="Arquivo original"
              value={`${certificate.fileName}${
                certificate.fileSize ? ` (${formatBytes(certificate.fileSize)})` : ""
              }`}
            />
          )}
          <InfoRow
            label="Emitido em"
            value={format(new Date(certificate.createdAt), "dd 'de' MMMM 'de' yyyy, HH:mm", {
              locale: ptBR,
            })}
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card/40 p-6">
        <h3 className="text-sm font-semibold">Prova criptográfica</h3>
        <CopyField label="Hash SHA-256" value={certificate.documentHash} />
        <CopyField
          label="Assinatura da transação"
          value={certificate.transactionSignature}
          href={getExplorerUrl(certificate.transactionSignature)}
        />
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {Icon && <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
