"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { WalletConnectButton } from "@/components/shared/wallet-connect-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/create", label: "Criar" },
  { href: "/verify", label: "Verificar" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "Sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          {connected && (
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/dashboard" && "text-foreground",
              )}
            >
              <LayoutDashboard className="size-3.5" />
              Painel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WalletConnectButton />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="size-5" />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                          pathname === link.href && "bg-accent text-foreground",
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
                {connected && (
                  <SheetClose
                    render={
                      <Link
                        href="/dashboard"
                        className={cn(
                          "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                          pathname === "/dashboard" && "bg-accent text-foreground",
                        )}
                      />
                    }
                  >
                    Painel
                  </SheetClose>
                )}
                <div className="mt-3 px-3 sm:hidden">
                  <WalletConnectButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
