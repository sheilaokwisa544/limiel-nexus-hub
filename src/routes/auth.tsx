import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => searchSchema.parse(search),
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin sign in — Limiel Insurance" },
      { name: "description", content: "Secure sign in for authorised Limiel Insurance administrators." },
      { property: "og:title", content: "Admin sign in — Limiel Insurance" },
      { property: "og:description", content: "Secure sign in for authorised Limiel Insurance administrators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function safeRedirect(value?: string) {
  if (value?.startsWith("/admin") || value?.startsWith("/journal-manager")) return value;
  return "/admin";
}

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const target = safeRedirect(redirect);
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: target as "/admin", replace: true });
    });
  }, [navigate, target]);

  const signInEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate({ to: target as "/admin", replace: true });
  };

  const sendReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password reset link sent");
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setLoading(false);
      return toast.error(result.error.message);
    }
    if (result.redirected) return;
    setLoading(false);
    navigate({ to: target as "/admin", replace: true });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden gradient-hero-bg p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="w-fit rounded-md bg-background/95 p-2" aria-label="Limiel Insurance home"><BrandLogo /></Link>
        <div>
          <h1 className="font-display text-4xl font-bold">Admin sign in</h1>
          <p className="mt-3 max-w-md text-primary-foreground/85">Manage quote requests, policies, claims and payments in one secure place.</p>
        </div>
        <p className="text-sm text-primary-foreground/70">© {new Date().getFullYear()} Limiel Insurance</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elevated">
          <CardContent className="p-8">
            <div className="mb-6 lg:hidden"><BrandLogo /></div>
            <h2 className="font-display text-2xl font-bold">{forgotMode ? "Reset password" : "Admin access"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Authorised Limiel Insurance staff only.</p>

            {forgotMode ? (
              <form onSubmit={sendReset} className="mt-6 space-y-4">
                <div><Label>Email</Label><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
                <Button type="submit" disabled={loading} className="w-full gradient-hero-bg text-primary-foreground">
                  {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Send reset link
                </Button>
                <Button type="button" variant="ghost" onClick={() => setForgotMode(false)} className="w-full">Back to sign in</Button>
              </form>
            ) : (
              <>
                <Button variant="outline" className="mt-6 w-full" onClick={google} disabled={loading}>
                  Continue with Google
                </Button>
                <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" /></div>
                <form onSubmit={signInEmail} className="space-y-4">
                  <div><Label>Email</Label><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
                  <div><Label>Password</Label><Input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
                  <Button type="submit" disabled={loading} className="w-full gradient-hero-bg text-primary-foreground">
                    {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Sign in
                  </Button>
                  <Button type="button" variant="link" onClick={() => setForgotMode(true)} className="w-full">Forgot password?</Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
