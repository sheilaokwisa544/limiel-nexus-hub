import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/data/products";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME = ["application/pdf", "image/png", "image/jpeg", "image/webp", "image/gif"] as const;

const FileInput = z.object({
  name: z.string().min(1).max(200),
  mime: z.enum(ALLOWED_MIME),
  base64: z.string().min(1).max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 8),
});

const Input = z.object({
  question: z.string().max(4000).default(""),
  policyText: z.string().max(20000).default(""),
  lang: z.enum(["en", "sw"]).default("en"),
  files: z.array(FileInput).max(3).default([]),
});

export const UNSURE_MESSAGE =
  "I’m unable to confirm that from the information available. Would you like to speak to a Limiel Insurance agent?";

export type PolicyHighlight = { quote: string; source: string; meaning: string };

export type PolicyExplanation = {
  summary: string;
  covered: string[];
  exclusions: string[];
  nextSteps: string[];
  questionsForInsurer: string[];
  highlights: PolicyHighlight[];
  confident: boolean;
  confidenceNote: string;
};

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    covered: { type: "array", items: { type: "string" } },
    exclusions: { type: "array", items: { type: "string" } },
    nextSteps: { type: "array", items: { type: "string" } },
    questionsForInsurer: { type: "array", items: { type: "string" } },
    highlights: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          quote: { type: "string" },
          source: { type: "string" },
          meaning: { type: "string" },
        },
        required: ["quote", "source", "meaning"],
      },
    },
    confident: { type: "boolean" },
    confidenceNote: { type: "string" },
  },
  required: ["summary", "covered", "exclusions", "nextSteps", "questionsForInsurer", "highlights", "confident", "confidenceNote"],
} as const;

export function limielKnowledge() {
  return products
    .map((p) => {
      const tabs = p.tabs
        .map(
          (t) =>
            `  - ${t.label}: ${t.intro} Covers: ${t.covers.join("; ")}.` +
            (t.considerations?.length ? ` Considerations: ${t.considerations.join("; ")}.` : ""),
        )
        .join("\n");
      return `## ${p.title}\n${p.overview}\n${tabs}`;
    })
    .join("\n\n");
}

export const explainCoverage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<PolicyExplanation> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured. Please try again later.");

    const question = data.question.trim();
    const policyText = data.policyText.trim();
    if (!question && !policyText && data.files.length === 0)
      throw new Error("Please add a question, paste policy text or upload a document.");

    for (const f of data.files) {
      if ((f.base64.length * 3) / 4 > MAX_FILE_BYTES) throw new Error(`${f.name} is larger than 8 MB.`);
    }

    const language = data.lang === "sw" ? "Kiswahili" : "English";

    const fileParts = data.files.map((f) =>
      f.mime === "application/pdf"
        ? { type: "input_file", filename: f.name, file_data: `data:application/pdf;base64,${f.base64}` }
        : { type: "input_image", image_url: `data:${f.mime};base64,${f.base64}` },
    );

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        instructions: [
          "You are the insurance assistant for Limiel Insurance Limited, an independent insurance brokerage in Kenya.",
          "Limiel does not underwrite policies; it compares options across underwriters and supports clients through claims.",
          `Reply in ${language} using warm, plain language with no unexplained jargon. Use Kenyan context and KES where relevant.`,
          "Only use two sources: (1) the customer's own policy text or uploaded documents, and (2) the verified Limiel product information below.",
          "Never invent prices, premiums, benefits, limits, exclusions, policy terms, claim decisions or insurer/provider details.",
          "Explain what is likely covered, what is excluded or limited (waiting periods, excess, sub-limits) and practical next steps.",
          "In highlights, copy up to 6 short verbatim excerpts (max ~40 words each) from the customer's policy text or documents that support your answer; set source to the file name or 'Pasted text' and meaning to a one-sentence plain explanation. Leave highlights empty if no policy wording was supplied.",
          `If the sources do not let you answer confidently, set confident to false and set summary exactly to: "${UNSURE_MESSAGE}" (translated to ${language} if needed), keeping lists short or empty.`,
          "Never promise a claim outcome. Keep each list item to one short sentence.",
          "In confidenceNote, remind the reader that details vary by insurer and policy and that Limiel can confirm them.",
          "\n# Verified Limiel product information\n" + limielKnowledge(),
        ].join(" "),
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: [
                  question ? `Customer question:\n${question}` : "Customer question: (none given — explain the supplied policy)",
                  policyText ? `Policy text pasted by the customer:\n${policyText}` : "Policy text: (none pasted)",
                  data.files.length ? `Uploaded documents: ${data.files.map((f) => f.name).join(", ")}` : "",
                ]
                  .filter(Boolean)
                  .join("\n\n"),
              },
              ...fileParts,
            ],
          },
        ],
        text: { format: { type: "json_schema", name: "coverage_explanation", strict: true, schema } },
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      console.error("[explainCoverage] gateway error", res.status, detail.slice(0, 500));
      if (res.status === 429) throw new Error("Too many requests right now — please try again in a moment.");
      if (res.status === 402) throw new Error("The AI service is out of credits. Please contact Limiel support.");
      if (res.status === 400) throw new Error("We couldn't read that document. Try a clearer image or a smaller PDF.");
      throw new Error("We couldn't generate an explanation just now. Please try again.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload) as { type?: string; delta?: string; response?: { output_text?: string } };
          if (event.type === "response.output_text.delta" && typeof event.delta === "string") text += event.delta;
          else if (event.type === "response.completed" && event.response?.output_text && !text) text = event.response.output_text;
        } catch {
          // ignore keep-alive lines
        }
      }
    }

    try {
      const p = JSON.parse(text) as PolicyExplanation;
      return {
        summary: p.summary ?? "",
        covered: p.covered ?? [],
        exclusions: p.exclusions ?? [],
        nextSteps: p.nextSteps ?? [],
        questionsForInsurer: p.questionsForInsurer ?? [],
        highlights: p.highlights ?? [],
        confident: p.confident !== false,
        confidenceNote: p.confidenceNote ?? "",
      };
    } catch {
      return {
        summary: UNSURE_MESSAGE,
        covered: [],
        exclusions: [],
        nextSteps: [],
        questionsForInsurer: [],
        highlights: [],
        confident: false,
        confidenceNote: "",
      };
    }
  });
