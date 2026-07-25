import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, MessageSquareText } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { truncateMiddle } from "@/lib/format";
import type { CertificateDto } from "@/types/certificate";

export function CertificateCard({ certificate }: { certificate: CertificateDto }) {
  const Icon = certificate.sourceType === "document" ? FileText : MessageSquareText;

  return (
    <Link
      href={`/certificate/${certificate.id}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-border hover:bg-card/70"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{certificate.title}</p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {truncateMiddle(certificate.documentHash, 8)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <Badge variant="secondary" className="uppercase">
          {certificate.network}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {format(new Date(certificate.createdAt), "dd MMM yyyy", { locale: ptBR })}
        </span>
      </div>
    </Link>
  );
}
