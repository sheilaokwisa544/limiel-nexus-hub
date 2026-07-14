import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login — Limiel Insurance" }] }),
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden gradient-hero-bg p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Shield className="h-5 w-5" />
          </span>
          Limiel<span className="text-accent">.</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl font-bold">Welcome back</h2>
          <p className="mt-3 max-w-md text-white/85">Manage your policies, track claims and get instant quotes — all in one place.</p>
        </div>
        <p className="text-sm text-white/70">© {new Date().getFullYear()} Limiel Insurance</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elevated">
          <CardContent className="p-8">
            <h1 className="font-display text-2xl font-bold">Sign in to Limiel</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your details to access your dashboard.</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => { e.preventDefault(); toast.success("Signed in"); nav({ to: "/dashboard" }); }}
            >
              <div><Label>Email</Label><Input type="email" required placeholder="jane@example.com" /></div>
              <div><Label>Password</Label><Input type="password" required placeholder="••••••••" /></div>
              <Button type="submit" className="w-full gradient-hero-bg text-primary-foreground">Sign in</Button>
              <p className="text-center text-sm text-muted-foreground">
                New here? <Link to="/quote" className="text-primary underline">Get a quote</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
