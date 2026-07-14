import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — Limiel Insurance" }] }),
});

function safeRedirect(v?: string) {
  if (!v) return "/dashboard";
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  return "/dashboard";
}

function AuthPage() {
  const nav = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const target = safeRedirect(redirect);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: target as any, replace: true });
    });
  }, [nav, target]);

  const signInEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    nav({ to: target as any, replace: true });
  };

  const signUpEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin + "/auth" },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — signing you in…");
    nav({ to: target as any, replace: true });
  };

  const forgot = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (target !== "/dashboard") sessionStorage.setItem("limiel_post_login", target);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setLoading(false);
      toast.error(result.error.message);
      return;
    }
    if (result.redirected) return;
    setLoading(false);
    const saved = sessionStorage.getItem("limiel_post_login");
    sessionStorage.removeItem("limiel_post_login");
    nav({ to: safeRedirect(saved || target) as any, replace: true });
  };

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
          <h2 className="font-display text-4xl font-bold">
            {mode === "signup" ? "Join Limiel" : "Welcome back"}
          </h2>
          <p className="mt-3 max-w-md text-white/85">
            Manage your policies, track claims and get instant quotes — all in one place.
          </p>
        </div>
        <p className="text-sm text-white/70">© {new Date().getFullYear()} Limiel Insurance</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elevated">
          <CardContent className="p-8">
            <Tabs value={mode === "forgot" ? "signin" : mode} onValueChange={(v) => setMode(v as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>

              <Button variant="outline" className="mt-6 w-full" onClick={google} disabled={loading}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                Continue with Google
              </Button>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <TabsContent value="signin" className="space-y-4">
                {mode === "forgot" ? (
                  <form onSubmit={forgot} className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full gradient-hero-bg text-primary-foreground">
                      {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Send reset link
                    </Button>
                    <button type="button" onClick={() => setMode("signin")} className="w-full text-center text-sm text-primary underline">
                      Back to sign in
                    </button>
                  </form>
                ) : (
                  <form onSubmit={signInEmail} className="space-y-4">
                    <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <Button type="submit" disabled={loading} className="w-full gradient-hero-bg text-primary-foreground">
                      {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Sign in
                    </Button>
                    <button type="button" onClick={() => setMode("forgot")} className="w-full text-center text-sm text-primary underline">
                      Forgot password?
                    </button>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={signUpEmail} className="space-y-4">
                  <div><Label>Full name</Label><Input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" /></div>
                  <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <div><Label>Password</Label><Input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                  <Button type="submit" disabled={loading} className="w-full gradient-hero-bg text-primary-foreground">
                    {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Create account
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">By continuing you agree to our Terms and Privacy Policy.</p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
