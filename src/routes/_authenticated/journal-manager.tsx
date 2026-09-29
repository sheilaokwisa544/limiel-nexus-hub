import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Pencil, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/journal-manager")({
  component: JournalAdmin,
});

type Article = {
  id?: string; title: string; slug: string; excerpt: string | null; content: string; category: string;
  author: string; featured_image_url: string | null; published: boolean; published_at: string | null;
};

const blank: Article = {
  title: "", slug: "", excerpt: "", content: "", category: "Guides", author: "Limiel Insurance",
  featured_image_url: "", published: false, published_at: new Date().toISOString().slice(0, 10),
};

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

function JournalAdmin() {
  const qc = useQueryClient();
  const [edit, setEdit] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: roleOk } = useQuery({
    queryKey: ["is-staff"],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role");
      return (data ?? []).some((r) => ["admin", "super_admin", "agent"].includes(r.role));
    },
  });
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["journal-admin"],
    enabled: roleOk === true,
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_articles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as (Article & { id: string })[];
    },
  });

  const refresh = () => { qc.invalidateQueries({ queryKey: ["journal-admin"] }); qc.invalidateQueries({ queryKey: ["journal-public"] }); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edit) return;
    if (!edit.title.trim() || !edit.content.trim()) { toast.error("Title and content are required."); return; }
    setSaving(true);
    const row = {
      title: edit.title.trim().slice(0, 200),
      slug: slugify(edit.slug || edit.title) || crypto.randomUUID().slice(0, 8),
      excerpt: edit.excerpt?.trim() || null,
      content: edit.content,
      category: edit.category.trim() || "Guides",
      author: edit.author.trim() || "Limiel Insurance",
      featured_image_url: edit.featured_image_url?.trim() || null,
      published: edit.published,
      published_at: edit.published_at || null,
    };
    const res = edit.id
      ? await supabase.from("journal_articles").update(row).eq("id", edit.id)
      : await supabase.from("journal_articles").insert(row);
    setSaving(false);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success("Article saved");
    setEdit(null);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("journal_articles").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); refresh(); }
  };

  const togglePublish = async (a: Article & { id: string }) => {
    const { error } = await supabase.from("journal_articles").update({
      published: !a.published,
      published_at: a.published_at ?? new Date().toISOString().slice(0, 10),
    }).eq("id", a.id);
    if (error) toast.error(error.message); else refresh();
  };

  if (roleOk === false) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <p className="font-display text-xl font-bold">Agents only</p>
          <p className="mt-2 text-sm text-muted-foreground">This area is for Limiel agents and admins.</p>
          <Button asChild className="mt-4"><Link to="/dashboard" search={{ section: "overview" }}>Back to dashboard</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Agent tools</p>
            <h1 className="font-display text-3xl font-bold">Journal articles</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/dashboard" search={{ section: "overview" }}><ArrowLeft className="mr-1 h-4 w-4" /> Dashboard</Link></Button>
            <Button className="gradient-hero-bg text-primary-foreground" onClick={() => setEdit({ ...blank })}><Plus className="mr-1 h-4 w-4" /> New article</Button>
          </div>
        </div>

        {edit && (
          <Card className="shadow-soft">
            <CardHeader><CardTitle>{edit.id ? "Edit article" : "New article"}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={save} className="grid gap-4">
                <div className="grid gap-2"><Label>Title</Label><Input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} maxLength={200} /></div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-2"><Label>Category</Label><Input value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Author</Label><Input value={edit.author} onChange={(e) => setEdit({ ...edit, author: e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Publication date</Label><Input type="date" value={edit.published_at ?? ""} onChange={(e) => setEdit({ ...edit, published_at: e.target.value })} /></div>
                </div>
                <div className="grid gap-2"><Label>Featured image URL</Label><Input value={edit.featured_image_url ?? ""} onChange={(e) => setEdit({ ...edit, featured_image_url: e.target.value })} placeholder="https://…" /></div>
                <div className="grid gap-2"><Label>Short summary</Label><Textarea rows={2} value={edit.excerpt ?? ""} onChange={(e) => setEdit({ ...edit, excerpt: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Content</Label><Textarea rows={12} value={edit.content} onChange={(e) => setEdit({ ...edit, content: e.target.value })} placeholder="Write the article. Blank lines start new paragraphs." /></div>
                <label className="flex items-center gap-3 text-sm"><Switch checked={edit.published} onCheckedChange={(v) => setEdit({ ...edit, published: v })} /> Published</label>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving} className="gradient-hero-bg text-primary-foreground">Save</Button>
                  <Button type="button" variant="ghost" onClick={() => setEdit(null)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <CardContent className="divide-y p-0">
            {isLoading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
            {!isLoading && articles.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No articles yet.</p>}
            {articles.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.category} · {a.author} · {a.published_at ?? "no date"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={a.published ? "secondary" : "outline"}>{a.published ? "Published" : "Draft"}</Badge>
                  <Button size="icon" variant="ghost" aria-label="Toggle publish" onClick={() => togglePublish(a)}>{a.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                  <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setEdit({ ...a })}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
