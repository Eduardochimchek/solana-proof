"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { WalletGate } from "@/components/shared/wallet-gate";
import { useCreateCertificate } from "@/hooks/use-create-certificate";
import { formatBytes } from "@/lib/format";
import { MAX_FILE_SIZE_BYTES } from "@/validators/certificate";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  description: z.string().trim().max(500, "Máximo de 500 caracteres.").optional(),
  recipientName: z.string().trim().max(120, "Máximo de 120 caracteres.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

type CertificateMode = "statement" | "document";

export function CertificateForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateCertificate();

  const [mode, setMode] = useState<CertificateMode>("statement");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function handleFileChange(selected: File | null) {
    setFileError(null);
    if (selected && selected.size > MAX_FILE_SIZE_BYTES) {
      setFileError("O arquivo excede o limite de 10MB.");
      setFile(null);
      return;
    }
    setFile(selected);
  }

  async function onSubmit(values: FormValues) {
    if (mode === "document" && !file) {
      setFileError("Selecione um arquivo para certificar.");
      return;
    }

    const certificate = await mutateAsync({
      title: values.title,
      description: values.description,
      recipientName: values.recipientName,
      file: mode === "document" ? file : null,
    });

    reset();
    setFile(null);
    router.push(`/certificate/${certificate.id}`);
  }

  return (
    <WalletGate description="Você precisa de uma carteira Solana para assinar o registro on-chain.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label>Tipo de certificado</Label>
          <Tabs value={mode} onValueChange={(value) => setMode(value as CertificateMode)}>
            <TabsList className="w-full">
              <TabsTrigger value="statement" className="flex-1">
                Declaração
              </TabsTrigger>
              <TabsTrigger value="document" className="flex-1">
                Documento
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground">
            {mode === "statement"
              ? "Registre uma afirmação textual com hash gerado a partir do conteúdo informado."
              : "Envie um arquivo. Apenas sua impressão digital (hash) é registrada — nunca armazenamos o arquivo."}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Ex: Certificado de Conclusão do Workshop Solana"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientName">Destinatário (opcional)</Label>
          <Input
            id="recipientName"
            placeholder="Nome de quem recebe o certificado"
            {...register("recipientName")}
          />
          {errors.recipientName && (
            <p className="text-xs text-destructive">{errors.recipientName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição (opcional)</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Detalhes adicionais sobre este certificado..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        {mode === "document" && (
          <div className="space-y-2">
            <Label>Arquivo</Label>
            {file ? (
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleFileChange(null)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center transition-colors hover:border-foreground/30 hover:bg-accent/50"
              >
                <UploadCloud className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Clique para selecionar um arquivo
                </span>
                <span className="text-xs text-muted-foreground">Máximo de 10MB</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
            />
            {fileError && <p className="text-xs text-destructive">{fileError}</p>}
          </div>
        )}

        <Button type="submit" size="lg" disabled={isPending} className="gap-2">
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {isPending ? "Processando..." : "Criar e assinar certificado"}
        </Button>
      </form>
    </WalletGate>
  );
}
