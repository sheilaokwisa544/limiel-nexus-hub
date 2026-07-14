import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Bell, Search, Download, FileText, Shield, TrendingUp, Wallet,
  Clock, CheckCircle2, AlertCircle, Plus, Home, LayoutDashboard, Heart, Settings, LogOut,
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatWidget } from "@/components/chat-widget";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const policies = [
  { id: "POL-001", type: "Motor", provider: "Britam", premium: 3200, status: "Active", renewal: "2026-09-14" },
  { id: "POL-002", type: "Health", provider: "Jubilee", premium: 5800, status: "Active", renewal: "2026-11-02" },
  { id: "POL-003", type: "Travel", provider: "APA", premium: 1200, status: "Expiring", renewal: "2026-08-01" },
];
const payments = [
  { date: "2026-07-01", policy: "POL-001", amount: 3200, method: "M-Pesa", status: "Paid" },
  { date: "2026-06-01", policy: "POL-002", amount: 5800, method: "Card", status: "Paid" },
  { date: "2026-05-15", policy: "POL-003", amount: 1200, method: "M-Pesa", status: "Paid" },
];
const chartData = [
  { m: "Jan", v: 8000 }, { m: "Feb", v: 8200 }, { m: "Mar", v: 9000 },
  { m: "Apr", v: 9200 }, { m: "May", v: 10200 }, { m: "Jun", v: 10200 }, { m: "Jul", v: 10200 },
];

function useCounter(to: number, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return n;
}

function Dashboard() {
  const active = useCounter(3);
  const renewals = useCounter(1);
  const claims = useCounter(2);
  const totalPaid = useCounter(28400);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto grid max-w-[1400px] gap-6 p-4 sm:p-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-2xl border bg-card p-4 shadow-soft">
            <Link to="/" className="flex items-center gap-2 px-2 pb-4 font-display font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg gradient-hero-bg text-primary-foreground">
                <Shield className="h-4 w-4" />
              </span>
              Limiel<span className="text-secondary">.</span>
            </Link>
            <nav className="space-y-1 text-sm">
              {[
                { icon: LayoutDashboard, label: "Overview", to: "/dashboard", active: true },
                { icon: Shield, label: "Policies", to: "/dashboard" },
                { icon: FileText, label: "Claims", to: "/dashboard" },
                { icon: Heart, label: "Favorites", to: "/dashboard" },
                { icon: Wallet, label: "Payments", to: "/dashboard" },
                { icon: Settings, label: "Settings", to: "/dashboard" },
              ].map((n) => (
                <Link key={n.label} to={n.to as any} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${n.active ? "gradient-hero-bg text-primary-foreground shadow-soft" : "hover:bg-muted"}`}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              ))}
              <Link to="/" className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
                <Home className="h-4 w-4" /> Back to site
              </Link>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
          </div>
        </aside>

        <main className="space-y-6">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">Welcome back, Jane 👋</h1>
              <p className="text-sm text-muted-foreground">Here's what's happening with your policies today.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="w-56 pl-9" />
              </div>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar><AvatarFallback className="gradient-hero-bg text-primary-foreground">JD</AvatarFallback></Avatar>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat title="Active Policies" value={active} icon={Shield} tint="from-primary to-primary-glow" />
            <Stat title="Upcoming Renewals" value={renewals} icon={Clock} tint="from-accent to-primary" />
            <Stat title="Claims Open" value={claims} icon={AlertCircle} tint="from-secondary to-primary" />
            <Stat title="Total Paid (YTD)" value={`KES ${totalPaid.toLocaleString()}`} icon={Wallet} tint="from-primary to-secondary" />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Premium spend</CardTitle>
                <Badge variant="secondary">Last 7 months</Badge>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader><CardTitle>Claims Status</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "CLM-441", status: "Approved", color: "text-secondary", Icon: CheckCircle2 },
                  { id: "CLM-440", status: "Under review", color: "text-accent", Icon: Clock },
                  { id: "CLM-438", status: "Info required", color: "text-destructive", Icon: AlertCircle },
                ].map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <c.Icon className={`h-5 w-5 ${c.color}`} />
                      <div>
                        <p className="text-sm font-semibold">{c.id}</p>
                        <p className="text-xs text-muted-foreground">Motor / windshield</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${c.color}`}>{c.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Policies</CardTitle>
              <Button size="sm" asChild className="gradient-hero-bg text-primary-foreground">
                <Link to="/quote"><Plus className="mr-1 h-4 w-4" /> New policy</Link>
              </Button>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy</TableHead><TableHead>Type</TableHead><TableHead>Provider</TableHead>
                    <TableHead>Premium</TableHead><TableHead>Renewal</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>{p.provider}</TableCell>
                      <TableCell>KES {p.premium.toLocaleString()}</TableCell>
                      <TableCell>{p.renewal}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "Active" ? "secondary" : "outline"}>{p.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toast.success("Policy document downloaded")}>
                          <Download className="mr-1 h-3.5 w-3.5" /> PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Date</TableHead><TableHead>Policy</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.date}>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.policy}</TableCell>
                      <TableCell>KES {p.amount.toLocaleString()}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell><Badge className="bg-secondary text-secondary-foreground">{p.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/admin" className="text-sm text-primary underline">View admin dashboard preview →</Link>
          </div>
        </main>
      </div>
      <ChatWidget />
    </div>
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
              <p className="mt-1 flex items-center gap-1 text-xs text-secondary"><TrendingUp className="h-3 w-3" /> +12% MoM</p>
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
