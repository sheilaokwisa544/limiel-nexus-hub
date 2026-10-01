import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { limielKnowledge } from "./policy-explainer.functions";

export const SUPPORT_UNAVAILABLE =
  "I'm sorry, Limiel Support is temporarily unavailable. Please contact our team directly at limielinsurance@gmail.com or +254 719 401 804 and we'll be happy to assist you.";

const FAQ_TEXT = `# Medical Insurance FAQs (official — use these answers)
Q: How much will it cost me to get covered? A: Depends on factors such as age and medical plan of choice. Request a quote online or speak to a representative who will help you find a plan for your budget.
Q: Can I pay my premium in installments? A: Yes — flexible payment plans let you settle your premium in instalments through financial credit services and bank IPF (Investment Project Financing).
Q: What should I consider when choosing a health plan? A: Cover benefits, convenience, affordability, customer service and value-added benefits. Value-adds include cover for medical injuries from political violence, local and international rescue and evacuation, nutritional advice, 24-hour call centre, health camps and health alerts.
Q: Can I get maternity cover if I join while pregnant? A: Our medical plans have maternity benefits with a waiting period of 1 year.
Q: Can I get outpatient cover with inpatient? A: You must have inpatient cover to enjoy outpatient cover.
Q: Refund if I cancel early? A: Refunds are considered for individuals who cancel within 30 days of the policy. Otherwise, members withdrawing are not eligible for a premium refund.
Q: What is a pre-existing condition? A: A medical condition which you knew or ought reasonably to have known of and can be medically proven to have existed prior to becoming a member or renewing a policy.
Q: Why pay at some hospitals despite having cover? A: (1) Visiting a provider without a required referral note, (2) the condition isn't provided for under the scheme, (3) the hospital isn't on the panel, (4) benefit limits exhausted, (5) a visit fee or copayment applies.
Q: Complaints? A: Email limielinsurance@gmail.com or call +254 719 401 804.`;

const QUOTE_LINKS = "Quote forms (use the matching one, as a full markdown link): Medical /quote?product=medical, Motor /quote?product=motor, Life /quote?product=life, Education /quote?product=education, Travel /quote?product=travel, Retirement /quote?product=retirement, Estate planning /quote?product=estate-planning. Other pages: /products, /contact, /explain.";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "product", "followUpRequired", "quoteRequested", "askPhone"],
  properties: {
    reply: { type: "string" },
    product: { type: ["string", "null"], enum: ["medical", "motor", "life", "education", "travel", "retirement", "estate-planning", "general", null] },
    followUpRequired: { type: "boolean" },
    quoteRequested: { type: "boolean" },
    askPhone: { type: "boolean" },
  },
};

type Msg = { role: "user" | "assistant"; content: string; at: string };

async function admin() {
  return (await import("@/integrations/supabase/client.server")).supabaseAdmin;
}

async function load(id: string, token: string) {
  const db = await admin();
  const { data } = await db.from("support_conversations").select("*").eq("id", id).eq("access_token", token).maybeSingle();
  if (!data) throw new Error("Conversation not found");
  return { db, row: data };
}

export const startSupportChat = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ email: z.string().trim().email().max(255) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row, error } = await db
      .from("support_conversations")
      .insert({ email: data.email.toLowerCase() })
      .select("id, access_token")
      .single();
    if (error || !row) throw new Error("Could not start chat");
    return { id: row.id, token: row.access_token };
  });

export const updateSupportContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      id: z.string().uuid(), token: z.string().uuid(),
      name: z.string().trim().max(100).optional(),
      phone: z.string().trim().max(30).regex(/^[+\d\s()-]*$/).optional(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { db } = await load(data.id, data.token);
    const patch: Record<string, string> = {};
    if (data.name) patch.name = data.name;
    if (data.phone) patch.phone = data.phone;
    if (Object.keys(patch).length) await db.from("support_conversations").update(patch).eq("id", data.id);
    return { ok: true };
  });

export const sendSupportMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), token: z.string().uuid(), message: z.string().trim().min(1).max(2000) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { db, row } = await load(data.id, data.token);
    const history = (Array.isArray(row.messages) ? row.messages : []) as Msg[];
    const userMsg: Msg = { role: "user", content: data.message, at: new Date().toISOString() };
    const all = [...history, userMsg].slice(-30);

    let parsed: { reply: string; product: string | null; followUpRequired: boolean; quoteRequested: boolean; askPhone: boolean } | null = null;
    const key = process.env["LOVABLE_API_KEY"];
    try {
      if (!key) throw new Error("no key");
      const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          stream: true,
          store: false,
          reasoning: { effort: "low" },
          instructions: [
            "You are Limiel Support, the friendly, professional first-line assistant for Limiel Insurance Limited — an independent Kenyan insurance brokerage that compares options across underwriters (it does not underwrite) and supports clients through claims. Office: Real Towers, Upper Hill, Nairobi. Contact: limielinsurance@gmail.com, +254 719 401 804 (call/WhatsApp).",
            "Use simple, warm, concise language for an ordinary Kenyan customer. Short replies (2-5 sentences) unless asked for detail. Remember the conversation context.",
            "Use ONLY the information below. NEVER invent prices, premiums, limits, waiting periods, benefits, exclusions, insurers, hospital panels, claim procedures or approval decisions.",
            "For pricing/quote questions: say cost depends on the cover and the customer's needs, and give the matching quote link. Set quoteRequested true.",
            "If you cannot answer from the information below, say: \"I don't have enough information to give you an accurate answer on that. I can have a Limiel Insurance representative follow up with you.\" and set followUpRequired true.",
            "Set followUpRequired true for: complaints, existing policies, claims, policy decisions, personalised quotes, detailed purchase advice, or requests to speak to a person — then say: \"I can help with general information, but this would be better handled by a Limiel Insurance representative. I've noted your request and our team can follow up with you.\"",
            "Set askPhone true only when followUpRequired or quoteRequested is true. Do not request sensitive medical details.",
            "product: the main product discussed (or 'general').",
            QUOTE_LINKS,
            FAQ_TEXT,
            "# Limiel products\n" + limielKnowledge(),
          ].join("\n"),
          input: all.map((m) => ({ role: m.role, content: m.content })),
          text: { format: { type: "json_schema", name: "support_reply", strict: true, schema } },
        }),
      });
      if (!res.ok || !res.body) throw new Error(`gateway ${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "", text = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const p = line.slice(5).trim();
          if (!p || p === "[DONE]") continue;
          try {
            const ev = JSON.parse(p) as { type?: string; delta?: string };
            if (ev.type === "response.output_text.delta" && typeof ev.delta === "string") text += ev.delta;
          } catch { /* keep-alive */ }
        }
      }
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("[support] AI error", e);
    }

    const reply = parsed?.reply || SUPPORT_UNAVAILABLE;
    const assistantMsg: Msg = { role: "assistant", content: reply, at: new Date().toISOString() };
    const followUp = row.follow_up_required || !!parsed?.followUpRequired || !parsed;
    const quote = row.quote_requested || !!parsed?.quoteRequested;
    const status = ["contacted", "converted", "closed"].includes(row.status)
      ? row.status
      : followUp ? "follow_up_required" : quote ? "quote_requested" : "in_conversation";
    const product = parsed?.product && parsed.product !== "general" ? parsed.product : row.product ?? parsed?.product ?? null;

    await db.from("support_conversations").update({
      messages: [...history, userMsg, assistantMsg],
      follow_up_required: followUp,
      quote_requested: quote,
      status,
      product,
      last_interaction_at: new Date().toISOString(),
    }).eq("id", data.id);

    return { reply, at: assistantMsg.at, askPhone: !!parsed?.askPhone && !row.phone };
  });
