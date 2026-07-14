import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Shield, Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/providers", label: "Providers" },
  { to: "/claims", label: "Claims" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
                <DropdownMenuItem asChild><Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/auth">Login</Link>
            </Button>
          )}

          <Button asChild className="hidden sm:inline-flex gradient-hero-bg text-primary-foreground shadow-soft hover:opacity-95">
            <Link to="/quote">Get Quote</Link>
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
            <div className="mt-2 flex gap-2">
              {user ? (
                <>
                  <Button asChild variant="outline" className="flex-1"><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></Button>
                  <Button onClick={signOut} className="flex-1 gradient-hero-bg text-primary-foreground">Sign out</Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1"><Link to="/auth" onClick={() => setOpen(false)}>Login</Link></Button>
                  <Button asChild className="flex-1 gradient-hero-bg text-primary-foreground"><Link to="/quote" onClick={() => setOpen(false)}>Get Quote</Link></Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
