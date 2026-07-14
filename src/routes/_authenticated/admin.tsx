import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Users, Wallet, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Admin,
});

const monthly = [
  { m: "Jan", policies: 240, revenue: 320 },
  { m: "Feb", policies: 280, revenue: 380 },
  { m: "Mar", policies: 320, revenue: 420 },
  { m: "Apr", policies: 360, revenue: 500 },
  { m: "May", policies: 410, revenue: 560 },
  { m: "Jun", policies: 470, revenue: 620 },
  { m: "Jul", policies: 520, revenue: 710 },
];
const mix = [
  { name: "Motor", value: 42 },
  { name: "Health", value: 28 },
  { name: "Travel", value: 12 },
  { name: "Life", value: 10 },
  { name: "Business", value: 8 },
];
const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)", "var(--color-chart-4)", "var(--color-chart-5)"];
const applications = [
  { id: "APP-9821", name: "Kelvin Otieno", type: "Motor", amount: 3200, status: "Pending" },
  { id: "APP-9820", name: "Grace Wanjiku", type: "Health", amount: 5800, status: "Approved" },
  { id: "APP-9819", name: "David Njoroge", type: "Travel", amount: 1200, status: "Review" },
  { id: "APP-9818", name: "Amina Yusuf", type: "Business", amount: 12400, status: "Approved" },
];

function Admin() {
  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</p>
            <h1 className="font-display text-3xl font-bold">Operations dashboard</h1>
          </div>
          <Button asChild variant="outline"><Link to="/dashboard"><ArrowLeft className="mr-1 h-4 w-4" /> Customer view</Link></Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStat title="Policies Sold" value="2,610" delta="+18%" icon={ShieldCheck} tint="from-primary to-primary-glow" />
          <AdminStat title="Revenue" value="KES 3.5M" delta="+22%" icon={Wallet} tint="from-secondary to-primary" />
          <AdminStat title="Active Customers" value="18,420" delta="+9%" icon={Users} tint="from-accent to-primary" />
          <AdminStat title="Pending Claims" value="47" delta="-6%" icon={AlertCircle} tint="from-primary to-secondary" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Policies vs Revenue</CardTitle>
              <Badge variant="secondary">YTD</Badge>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="policies" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="revenue" fill="var(--color-secondary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader><CardTitle>Product mix</CardTitle></CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={mix} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    {mix.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Recent applications</CardTitle></CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Type</TableHead><TableHead>Premium</TableHead><TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {applications.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.id}</TableCell>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.type}</TableCell>
                    <TableCell>KES {a.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === "Approved" ? "secondary" : a.status === "Pending" ? "outline" : "default"}>
                        {a.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminStat({ title, value, delta, icon: Icon, tint }: any) {
  return (
    <Card className="shadow-soft">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <p className="mt-2 font-display text-2xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-secondary">{delta} vs last month</p>
          </div>
          <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${tint} text-primary-foreground shadow-soft`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
