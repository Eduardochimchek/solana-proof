import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

/**
 * Renders an anchor styled as a button. Preferred over wrapping `Button`
 * around `Link`, since Base UI's Button enforces `role="button"` semantics
 * that are incorrect for navigational links.
 */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
