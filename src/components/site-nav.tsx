import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Shield, Moon, Sun, LogOut, LayoutDashboard, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";
import { useI18n } from "@/lib/i18n";

export function SiteNav() {
  const nav = useNavigate();
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/providers", label: t("nav.providers") },
    { to: "/claims", label: t("nav.claims") },
    { to: "/about", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setUser(session?.user ?? null);
      }
    });
    return () => { window.removeEventListener("scroll", onScroll); sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/", replace: true });
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "LI";

  const LangToggle = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t("nav.language")} className="gap-1.5 px-2">
          <Languages className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-semibold text-primary" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("sw")} className={lang === "sw" ? "font-semibold text-primary" : ""}>
          Kiswahili
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all", scrolled ? "glass shadow-soft" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-hero-bg text-primary-foreground shadow-soft">
            <Shield className="h-5 w-5" />
          </span>
          <span>Limiel<span className="text-secondary">.</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex">{LangToggle}</div>
          <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme" className="hidden sm:inline-flex">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Account" className="hidden sm:block">
                  <Avatar><AvatarFallback className="gradient-hero-bg text-primary-foreground">{initials}</AvatarFallback></Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild><Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> {t("nav.dashboard")}</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> {t("nav.signOut")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/auth">{t("nav.login")}</Link>
            </Button>
          )}

          <Button asChild className="hidden sm:inline-flex gradient-hero-bg text-primary-foreground shadow-soft hover:opacity-95">
            <Link to="/quote">{t("nav.getQuote")}</Link>
          </Button>
          <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background/95 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">{l.label}</Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              {LangToggle}
              {user ? (
                <>
                  <Button asChild variant="outline" className="flex-1"><Link to="/dashboard" onClick={() => setOpen(false)}>{t("nav.dashboard")}</Link></Button>
                  <Button onClick={signOut} className="flex-1 gradient-hero-bg text-primary-foreground">{t("nav.signOut")}</Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1"><Link to="/auth" onClick={() => setOpen(false)}>{t("nav.login")}</Link></Button>
                  <Button asChild className="flex-1 gradient-hero-bg text-primary-foreground"><Link to="/quote" onClick={() => setOpen(false)}>{t("nav.getQuote")}</Link></Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
