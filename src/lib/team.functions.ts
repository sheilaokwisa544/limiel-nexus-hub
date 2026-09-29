import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STAFF_ROLES = ["admin", "super_admin", "agent"] as const;

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  const { data: sa } = await supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" });
  if (error || (!data && !sa)) throw new Error("Only administrators can manage team access.");
}

export const listStaff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin.from("user_roles").select("user_id, role");
    if (error) throw error;
    const staff = (roles ?? []).filter((r) => (STAFF_ROLES as readonly string[]).includes(r.role));
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .in("id", staff.map((s) => s.user_id));
    const nameOf = new Map((profiles ?? []).map((p) => [p.id, p.full_name]));
    const { data: usersPage } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const emailOf = new Map((usersPage?.users ?? []).map((u) => [u.id, u.email]));
    return staff.map((s) => ({
      userId: s.user_id,
      role: s.role,
      name: nameOf.get(s.user_id) ?? "—",
      email: emailOf.get(s.user_id) ?? "—",
    }));
  });

export const grantStaffRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ email: z.string().email(), role: z.enum(["admin", "agent"]) }).parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: usersPage, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) throw listErr;
    const target = (usersPage?.users ?? []).find(
      (u) => u.email?.toLowerCase() === data.email.toLowerCase(),
    );
    if (!target) throw new Error("No account exists with that email. Ask them to sign up on the website first.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: target.id, role: data.role }, { onConflict: "user_id,role" });
    if (error) throw error;
    return { ok: true };
  });
