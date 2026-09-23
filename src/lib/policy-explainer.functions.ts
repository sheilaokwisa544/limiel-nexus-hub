import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  question: z.string().max(4000).default(""),
  policyText: z.string().max(20000).default(""),
  lang: z.enum(["en", "sw"]).default("en"),
});

export type PolicyExplanation = {
  summary: string;
  covered: string[];
  exclusions: string[];
  nextSteps: string[];
  questionsForInsurer: string[];
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
    confidenceNote: { type: "string" },
  },
  required: ["summary", "covered", "exclusions", "nextSteps", "questionsForInsurer", "confidenceNote"],
} as const;

export const explainCoverage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<PolicyExplanation> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured. Please try again later.");

    const question = data.question.trim();
    const policyText = data.policyText.trim();
    if (!question && !policyText) throw new Error("Please add a question or paste some policy text.");

    const language = data.lang === "sw" ? "Kiswahili" : "English";

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
        reasoning: { effort: "low", summary: "auto" },
        instructions: [
          "You are an insurance explainer for Limiel Insurance Limited, an independent insurance brokerage in Kenya.",
          "Limiel does not underwrite policies; it compares options across underwriters and supports clients through claims.",
          `Reply in ${language} using warm, plain language with no unexplained jargon. Use Kenyan context and KES where relevant.`,
          "Explain what is likely covered, what is commonly excluded or limited (waiting periods, excess, sub-limits), and practical next steps.",
          "Base coverage statements on the pasted policy text when provided; when it is missing or unclear, say so plainly instead of guessing.",
          "Never promise a claim outcome. Keep each list item to one short sentence.",
          "In confidenceNote, remind the reader that benefits, limits, exclusions and eligibility vary by insurer and policy, and that Limiel can confirm the details for their specific cover.",
        ].join(" "),
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: [
                  question ? `Customer question:\n${question}` : "Customer question: (none given)",
                  policyText ? `Policy text pasted by the customer:\n${policyText}` : "Policy text: (none pasted)",
                ].join("\n\n"),
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "coverage_explanation",
            strict: true,
            schema,
          },
        },
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Too many requests right now — please try again in a moment.");
      if (res.status === 402) throw new Error("The AI service is out of credits. Please contact Limiel support.");
      console.error("[explainCoverage] gateway error", res.status, detail.slice(0, 500));
      throw new Error("We couldn't generate an explanation just now. Please try again.");
    }

    // Stream the response so long reasoning runs never hit a request timeout.
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
          const event = JSON.parse(payload) as {
            type?: string;
            delta?: string;
            response?: { output_text?: string };
          };
          if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
            text += event.delta;
          } else if (event.type === "response.completed" && event.response?.output_text) {
            if (!text) text = event.response.output_text;
          }
        } catch {
          // ignore keep-alive / non-JSON lines
        }
      }
    }

    try {
      const parsed = JSON.parse(text) as PolicyExplanation;
      return {
        summary: parsed.summary ?? "",
        covered: parsed.covered ?? [],
        exclusions: parsed.exclusions ?? [],
        nextSteps: parsed.nextSteps ?? [],
        questionsForInsurer: parsed.questionsForInsurer ?? [],
        confidenceNote: parsed.confidenceNote ?? "",
      };
    } catch {
      throw new Error("We couldn't read the explanation. Please try rephrasing your question.");
    }
  });
