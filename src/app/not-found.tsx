import { CompassIcon } from "lucide-react";

import { ButtonLink } from "@/components/shared/button-link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-accent">
        <CompassIcon className="size-7 text-muted-foreground" />
      </span>
      <div className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">Erro 404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mx-auto max-w-sm text-muted-foreground">
          O endereço que você acessou não existe ou foi movido. Verifique o link ou
          volte para a página inicial.
        </p>
      </div>
      <div className="flex gap-3">
        <ButtonLink href="/">Voltar ao início</ButtonLink>
        <ButtonLink href="/verify" variant="outline">
          Verificar certificado
        </ButtonLink>
      </div>
    </div>
  );
}
