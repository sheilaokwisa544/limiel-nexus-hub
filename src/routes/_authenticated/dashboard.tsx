import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Download, FileText, Shield, Wallet, Clock, AlertCircle, Plus, Home, LayoutDashboard,
  Heart, Settings, LogOut, Search, BookOpen,
} from "lucide-react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart, Legend } from "recharts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatWidget } from "@/components/chat-widget";
import { BrandLogo } from "@/components/brand-logo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

const SECTIONS = ["overview", "quotes", "policies", "claims", "favorites", "payments", "settings"] as const;
type Section = (typeof SECTIONS)[number];

export const Route = createFileRoute("/_authenticated/dashboard")({
  validateSearch: z.object({ section: z.enum(SECTIONS).catch("overview").default("overview") }),
  component: Dashboard,
});

const kes = (n: number) => `KES ${Math.round(n).toLocaleString()}`;
const fmtDate = (d?: string | null) => (d ? new Date(d).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" }) : "—");

type Row = Record<string, any>;

function useDashData() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["dash-data"],
    queryFn: async () => {
      const [{ data: u }, pol, pay, clm, fav, roles] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("policies").select("*, products(name), providers(name)").order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
        supabase.from("claims").select("*").order("created_at", { ascending: false }),
        supabase.from("favorites").select("*, products(name, type, base_premium)").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("role"),
      ]);
      for (const r of [pol, pay, clm, fav]) if (r.error) throw r.error;
      const qt = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
      if (qt.error) throw qt.error;
      const userId = u.user?.id;
      const myRoles = (roles.data ?? []).map((r) => r.role as string);
      const isStaff = myRoles.some((r) => ["admin", "super_admin", "agent"].includes(r));
      const ids = new Set<string>();
      [pol.data, pay.data, clm.data, fav.data].forEach((l) => (l ?? []).forEach((r: Row) => ids.add(r.user_id)));
      const { data: profs } = ids.size
        ? await supabase.from("profiles").select("id, full_name, phone").in("id", [...ids])
        : { data: [] as Row[] };
      const people = new Map((profs ?? []).map((p: Row) => [p.id, p]));
      return {
        user: u.user, userId, isStaff,
        policies: (pol.data ?? []) as Row[], payments: (pay.data ?? []) as Row[],
        claims: (clm.data ?? []) as Row[], favorites: (fav.data ?? []) as Row[], people,
        quotes: (qt.data ?? []) as Row[],
      };
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel("dash-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "policies" }, () => qc.invalidateQueries({ queryKey: ["dash-data"] }))
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => qc.invalidateQueries({ queryKey: ["dash-data"] }))
      .on("postgres_changes", { event: "*", schema: "public", table: "claims" }, () => qc.invalidateQueries({ queryKey: ["dash-data"] }))
      .on("postgres_changes", { event: "*", schema: "public", table: "quote_requests" }, () => qc.invalidateQueries({ queryKey: ["dash-data"] }))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);
  return q;
}

async function downloadPolicyPdf(p: Row, client: string, payments: Row[]) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFillColor(13, 43, 82);
  doc.rect(0, 0, 210, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("LIMIEL INSURANCE LIMITED", 14, 14);
  doc.setFontSize(9);
  doc.text("Your security, our commitment.  |  0719 401 804  |  limielinsurance@gmail.com", 14, 22);
  doc.setTextColor(27, 46, 75);
  doc.setFontSize(14);
  doc.text("Policy Summary", 14, 42);
  doc.setFontSize(10);
  const rows: [string, string][] = [
    ["Policy reference", p.policy_number],
    ["Client", client],
    ["Product", p.products?.name ?? p.type],
    ["Underwriter", p.providers?.name ?? "—"],
    ["Cover type", String(p.type)],
    ["Status", String(p.status)],
    ["Start date", fmtDate(p.start_date)],
    ["Renewal / end date", fmtDate(p.renewal_date)],
    ["Monthly premium", kes(Number(p.monthly_premium))],
    ["Sum assured", p.sum_assured ? kes(Number(p.sum_assured)) : "—"],
  ];
  let y = 52;
  for (const [k, v] of rows) { doc.setFont("helvetica", "bold"); doc.text(k, 14, y); doc.setFont("helvetica", "normal"); doc.text(v, 70, y); y += 8; }
  y += 4;
  doc.setFontSize(12); doc.text("Payments", 14, y); y += 8; doc.setFontSize(10);
  if (payments.length === 0) { doc.text("No payments recorded yet.", 14, y); y += 8; }
  for (const pay of payments) {
    doc.text(`${fmtDate(pay.paid_at ?? pay.created_at)}   ${kes(Number(pay.amount))}   ${pay.method}   ${pay.status}   ${pay.reference ?? ""}`, 14, y);
    y += 7;
  }
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Limiel Insurance Limited is an independent broker. Cover is underwritten by the insurer named above and is subject to the policy terms.", 14, 285);
  doc.save(`${p.policy_number}.pdf`);
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">{text}</p>;
}

function Dashboard() {
  const nav = useNavigate({ from: "/dashboard" });
  const { section } = Route.useSearch();
  const qc = useQueryClient();
  const { t } = useI18n();
  const { data, isLoading, error } = useDashData();
  const [search, setSearch] = useState("");

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  const clientName = (id: string) => data?.people.get(id)?.full_name ?? "Client";
  const displayName = (data?.user?.user_metadata?.full_name as string | undefined) ?? data?.user?.email?.split("@")[0] ?? "there";
  const initials = displayName.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const policyById = useMemo(() => new Map((data?.policies ?? []).map((p) => [p.id, p])), [data]);
  const match = (s: string) => !search || s.toLowerCase().includes(search.toLowerCase());

  const stats = useMemo(() => {
    const pol = data?.policies ?? [];
    const pay = data?.payments ?? [];
    const clm = data?.claims ?? [];
    const paid = pay.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0);
    const months: { m: string; policies: number; payments: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const inMonth = (iso: string) => { const x = new Date(iso); return `${x.getFullYear()}-${x.getMonth()}` === key; };
      months.push({
        m: d.toLocaleString("en", { month: "short" }),
        policies: pol.filter((p) => inMonth(p.created_at)).length,
        payments: pay.filter((p) => p.status === "paid" && inMonth(p.paid_at ?? p.created_at)).reduce((s, p) => s + Number(p.amount), 0),
      });
    }
    return {
      active: pol.filter((p) => p.status === "active").length,
      total: pol.length,
      paid,
      openClaims: clm.filter((c) => !["paid", "rejected"].includes(c.status)).length,
      months,
    };
  }, [data]);

  const navItems: { id: Section; icon: any; label: string }[] = [
    { id: "overview", icon: LayoutDashboard, label: t("dash.overview") },
    ...(data?.isStaff ? [{ id: "quotes" as Section, icon: FileText, label: "Quotes" }] : []),
    { id: "policies", icon: Shield, label: t("dash.policies") },
    { id: "claims", icon: FileText, label: t("dash.claims") },
    { id: "favorites", icon: Heart, label: t("dash.favorites") },
    { id: "payments", icon: Wallet, label: t("dash.payments") },
    { id: "settings", icon: Settings, label: t("dash.settings") },
  ];

  const PoliciesTable = ({ limit }: { limit?: number }) => {
    const rows = (data?.policies ?? []).filter((p) => match(`${p.policy_number} ${clientName(p.user_id)} ${p.products?.name ?? ""} ${p.type}`)).slice(0, limit);
    if (rows.length === 0) return <Empty text="No policies yet." />;
    return (
      <Table>
        <TableHeader><TableRow>
          <TableHead>Reference</TableHead>{data?.isStaff && <TableHead>Client</TableHead>}<TableHead>Product</TableHead>
          <TableHead>Status</TableHead><TableHead>Start</TableHead><TableHead>End / renewal</TableHead><TableHead>Premium</TableHead><TableHead>Paid</TableHead><TableHead />
        </TableRow></TableHeader>
        <TableBody>
          {rows.map((p) => {
            const pays = (data?.payments ?? []).filter((x) => x.policy_id === p.id);
            const paid = pays.filter((x) => x.status === "paid").reduce((s, x) => s + Number(x.amount), 0);
            return (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.policy_number}</TableCell>
                {data?.isStaff && <TableCell>{clientName(p.user_id)}</TableCell>}
                <TableCell>{p.products?.name ?? <span className="capitalize">{p.type}</span>}<div className="text-xs text-muted-foreground">{p.providers?.name}</div></TableCell>
                <TableCell><Badge variant={p.status === "active" ? "secondary" : "outline"} className="capitalize">{p.status}</Badge></TableCell>
                <TableCell>{fmtDate(p.start_date)}</TableCell>
                <TableCell>{fmtDate(p.renewal_date)}</TableCell>
                <TableCell>{kes(Number(p.monthly_premium))}</TableCell>
                <TableCell>{pays.length ? `${kes(paid)} (${pays.length})` : "—"}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => downloadPolicyPdf(p, clientName(p.user_id), pays).then(() => toast.success(t("dash.pdfDownloaded")))}>
                    <Download className="mr-1 h-3.5 w-3.5" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const PaymentsTable = ({ limit }: { limit?: number }) => {
    const rows = (data?.payments ?? []).filter((p) => match(`${p.reference ?? ""} ${clientName(p.user_id)} ${policyById.get(p.policy_id)?.policy_number ?? ""}`)).slice(0, limit);
    if (rows.length === 0) return <Empty text="No payments yet." />;
    return (
      <Table>
        <TableHeader><TableRow>
          <TableHead>Date</TableHead>{data?.isStaff && <TableHead>Client</TableHead>}<TableHead>Policy</TableHead><TableHead>Amount</TableHead>
          <TableHead>Method</TableHead><TableHead>Reference</TableHead><TableHead>Status</TableHead>
        </TableRow></TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{fmtDate(p.paid_at ?? p.created_at)}</TableCell>
              {data?.isStaff && <TableCell>{clientName(p.user_id)}</TableCell>}
              <TableCell>{policyById.get(p.policy_id)?.policy_number ?? "—"}</TableCell>
              <TableCell>{p.currency} {Number(p.amount).toLocaleString()}</TableCell>
              <TableCell>{p.method}</TableCell>
              <TableCell className="font-mono text-xs">{p.reference ?? "—"}</TableCell>
              <TableCell><Badge variant={p.status === "paid" ? "secondary" : "outline"} className="capitalize">{p.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const ClaimsTable = ({ limit }: { limit?: number }) => {
    const rows = (data?.claims ?? []).filter((c) => match(`${c.claim_number} ${clientName(c.user_id)}`)).slice(0, limit);
    if (rows.length === 0) return <Empty text="No claims yet." />;
    return (
      <Table>
        <TableHeader><TableRow>
          <TableHead>Claim</TableHead>{data?.isStaff && <TableHead>Client</TableHead>}<TableHead>Policy</TableHead><TableHead>Incident</TableHead>
          <TableHead>Amount</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead>
        </TableRow></TableHeader>
        <TableBody>
          {rows.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.claim_number}</TableCell>
              {data?.isStaff && <TableCell>{clientName(c.user_id)}</TableCell>}
              <TableCell>{policyById.get(c.policy_id)?.policy_number ?? "—"}</TableCell>
              <TableCell>{fmtDate(c.incident_date)}</TableCell>
              <TableCell>{c.amount ? kes(Number(c.amount)) : "—"}</TableCell>
              <TableCell>{fmtDate(c.created_at)}</TableCell>
              <TableCell><Badge variant="outline" className="capitalize">{String(c.status).replace("_", " ")}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto grid max-w-[1400px] gap-6 p-4 sm:p-6 lg:grid-cols-[240px_1fr]">
        <aside>
          <div className="rounded-2xl border bg-card p-4 shadow-soft lg:sticky lg:top-6">
            <Link to="/" className="mb-4 block px-2"><BrandLogo /></Link>
            <nav className="flex gap-1 overflow-x-auto text-sm lg:block lg:space-y-1">
              {navItems.map((n) => (
                <Link
                  key={n.id}
                  to="/dashboard"
                  search={{ section: n.id }}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 transition ${section === n.id ? "gradient-hero-bg text-primary-foreground shadow-soft" : "hover:bg-muted"}`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              ))}
              {data?.isStaff && (
                <Link to="/admin" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                  <BookOpen className="h-4 w-4" /> Journal
                </Link>
              )}
              <Link to="/" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted lg:mt-4">
                <Home className="h-4 w-4" /> {t("dash.backToSite")}
              </Link>
              <button onClick={signOut} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted lg:w-full">
                <LogOut className="h-4 w-4" /> {t("dash.signOut")}
              </button>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">{t("dash.welcome", { name: displayName })}</h1>
              <p className="text-sm text-muted-foreground">{data?.isStaff ? "Agent view — all clients" : t("dash.subtitle")}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("dash.search")} className="w-48 pl-9 sm:w-56" />
              </div>
              <Avatar><AvatarFallback className="gradient-hero-bg text-primary-foreground">{initials}</AvatarFallback></Avatar>
            </div>
          </header>

          {error && <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{(error as Error).message}</p>}
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

          {data && section === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat title={t("dash.stat.active")} value={stats.active} icon={Shield} tint="from-primary to-primary-glow" />
                <Stat title="Total policies" value={stats.total} icon={Clock} tint="from-accent to-primary" />
                <Stat title="Open claims" value={stats.openClaims} icon={AlertCircle} tint="from-secondary to-primary" />
                <Stat title="Payments received" value={kes(stats.paid)} icon={Wallet} tint="from-primary to-secondary" />
                {data.isStaff && (
                  <>
                    <Stat title="New quote requests" value={data.quotes.filter((q) => q.status === "new").length} icon={FileText} tint="from-accent to-primary" />
                    <Stat title="Total quote requests" value={data.quotes.length} icon={FileText} tint="from-primary to-primary-glow" />
                    <Stat title="Converted quotes" value={data.quotes.filter((q) => q.status === "converted").length} icon={Shield} tint="from-secondary to-primary" />
                  </>
                )}
              </div>
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Policies & payments</CardTitle>
                  <Badge variant="secondary">Last 6 months · live</Badge>
                </CardHeader>
                <CardContent className="h-72">
                  {stats.total === 0 && data.payments.length === 0 ? (
                    <Empty text="No policies or payments yet — the chart fills in as records are created." />
                  ) : (
                    <ResponsiveContainer>
                      <BarChart data={stats.months}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis yAxisId="l" allowDecimals={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis yAxisId="r" orientation="right" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        <Legend />
                        <Bar yAxisId="l" dataKey="policies" name="New policies" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                        <Bar yAxisId="r" dataKey="payments" name="Payments (KES)" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent policies</CardTitle>
                  <Button size="sm" asChild className="gradient-hero-bg text-primary-foreground"><Link to="/quote"><Plus className="mr-1 h-4 w-4" /> {t("dash.newPolicy")}</Link></Button>
                </CardHeader>
                <CardContent className="overflow-auto"><PoliciesTable limit={5} /></CardContent>
              </Card>
              <div className="grid gap-4 xl:grid-cols-2">
                <Card className="shadow-soft"><CardHeader><CardTitle>Recent payments</CardTitle></CardHeader><CardContent className="overflow-auto"><PaymentsTable limit={5} /></CardContent></Card>
                <Card className="shadow-soft"><CardHeader><CardTitle>Recent claims</CardTitle></CardHeader><CardContent className="overflow-auto"><ClaimsTable limit={5} /></CardContent></Card>
              </div>
            </>
          )}

          {data && section === "policies" && (
            <Card className="shadow-soft"><CardHeader><CardTitle>{t("dash.policies")} ({data.policies.length})</CardTitle></CardHeader><CardContent className="overflow-auto"><PoliciesTable /></CardContent></Card>
          )}
          {data && section === "payments" && (
            <Card className="shadow-soft"><CardHeader><CardTitle>{t("dash.payments")} ({data.payments.length})</CardTitle></CardHeader><CardContent className="overflow-auto"><PaymentsTable /></CardContent></Card>
          )}
          {data && section === "claims" && (
            <Card className="shadow-soft"><CardHeader><CardTitle>{t("dash.claims")} ({data.claims.length})</CardTitle></CardHeader><CardContent className="overflow-auto"><ClaimsTable /></CardContent></Card>
          )}
          {data && section === "favorites" && (
            <Card className="shadow-soft">
              <CardHeader><CardTitle>{t("dash.favorites")}</CardTitle></CardHeader>
              <CardContent>
                {data.favorites.length === 0 ? <Empty text="No saved products yet." /> : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.favorites.map((f) => (
                      <div key={f.id} className="rounded-lg border p-4">
                        <p className="font-semibold">{f.products?.name ?? "Product"}</p>
                        <p className="text-xs capitalize text-muted-foreground">{f.products?.type}{data.isStaff ? ` · ${clientName(f.user_id)}` : ""}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          {data && section === "settings" && data.userId && <SettingsPanel userId={data.userId} email={data.user?.email ?? ""} />}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}

function SettingsPanel({ userId, email }: { userId: string; email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    supabase.from("profiles").select("full_name, phone").eq("id", userId).maybeSingle().then(({ data }) => {
      setName(data?.full_name ?? "");
      setPhone(data?.phone ?? "");
    });
  }, [userId]);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: name.trim().slice(0, 120), phone: phone.trim().slice(0, 30) }).eq("id", userId);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Profile saved");
  };
  return (
    <Card className="max-w-xl shadow-soft">
      <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={save} className="grid gap-4">
          <div className="grid gap-2"><Label>Email</Label><Input value={email} disabled /></div>
          <div className="grid gap-2"><Label htmlFor="n">Full name</Label><Input id="n" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid gap-2"><Label htmlFor="p">Phone</Label><Input id="p" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254…" /></div>
          <Button type="submit" disabled={saving} className="w-fit gradient-hero-bg text-primary-foreground">Save changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Stat({ title, value, icon: Icon, tint }: { title: string; value: React.ReactNode; icon: any; tint: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden shadow-soft">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
              <p className="mt-2 font-display text-2xl font-bold">{value}</p>
            </div>
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${tint} text-primary-foreground shadow-soft`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
