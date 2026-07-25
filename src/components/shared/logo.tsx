import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-base font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-purple to-brand-green">
        <ShieldCheck className="size-4 text-black" strokeWidth={2.5} />
      </span>
      <span>
        Solana <span className="text-gradient-brand">Proof</span>
      </span>
    </Link>
  );
}
