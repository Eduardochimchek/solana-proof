"use client";

import { Loader2, Search, ShieldAlert, ShieldQuestion } from "lucide-react";
import { useState } from "react";

import { CertificateProof } from "@/components/certificates/certificate-proof";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyCertificate } from "@/hooks/use-verify-certificate";

export function VerifySearchForm({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const { mutate, data, error, isPending, isIdle } = useVerifyCertificate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (query.trim().length < 3) return;
    mutate(query.trim());
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cole o hash SHA-256, a assinatura da transação ou o ID do certificado"
          className="flex-1"
        />
        <Button type="submit" disabled={isPending} className="gap-2 sm:w-auto">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Verificar
        </Button>
      </form>

      {isIdle && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
          <ShieldQuestion className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Insira um identificador acima para verificar a autenticidade de um
            certificado.
          </p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 py-16 text-center">
          <ShieldAlert className="size-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">{error.message}</p>
        </div>
      )}

      {data && <CertificateProof certificate={data} />}
    </div>
  );
}
