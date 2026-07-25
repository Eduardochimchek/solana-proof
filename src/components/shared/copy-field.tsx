"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface CopyFieldProps {
  label: string;
  value: string;
  href?: string;
}

export function CopyField({ label, value, href }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copiado.`);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2">
        <code className="flex-1 truncate font-mono text-xs sm:text-sm">{value}</code>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          aria-label={`Copiar ${label}`}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
        {href && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            render={
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${label} no Explorer`}
              />
            }
          >
            <ExternalLink className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
