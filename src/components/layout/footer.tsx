import Link from "next/link";

import { GitHubIcon, XIcon } from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";

const PRODUCT_LINKS = [
  { href: "/create", label: "Criar certificado" },
  { href: "/verify", label: "Verificar certificado" },
  { href: "/dashboard", label: "Painel" },
];

const RESOURCE_LINKS = [
  { href: "/docs", label: "Documentação" },
  { href: "/about", label: "Sobre o projeto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-3 sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Certificação digital verificável, ancorada de forma permanente na
            blockchain Solana.
          </p>
        </div>

        <FooterColumn title="Produto" links={PRODUCT_LINKS} />
        <FooterColumn title="Recursos" links={RESOURCE_LINKS} />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Comunidade</h3>
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <XIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Solana Proof. Todos os direitos reservados.</p>
          <p>Construído na Solana Devnet · Desenvolvido por Eduardo Jeronimo</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
