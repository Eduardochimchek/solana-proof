"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/shared/button-link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-7 text-destructive" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Algo deu errado</h1>
        <p className="mx-auto max-w-sm text-muted-foreground">
          Ocorreu um erro inesperado ao carregar esta página. Você pode tentar
          novamente ou voltar ao início.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={reset} className="gap-2">
          <RotateCcw className="size-4" />
          Tentar novamente
        </Button>
        <ButtonLink href="/" variant="outline">
          Voltar ao início
        </ButtonLink>
      </div>
    </div>
  );
}
