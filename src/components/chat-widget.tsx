import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { BrandLogo } from "@/components/brand-logo";
import {
  sendSupportMessage,
  startSupportChat,
  updateSupportContact,
} from "@/lib/support.functions";

type ChatMessage = { role: "user" | "assistant"; content: string };
type Session = { id: string; token: string };
type Step = "email" | "contact" | "chat";

const WELCOME = "Hello! I’m Limiel Support. I can help with general insurance questions, our products, quotes, and next steps.";
const QUICK_QUESTIONS = [
  "What insurance products do you offer?",
  "How do I request a quote?",
  "How do I make a claim?",
  "I need to speak to a representative",
];

export function ChatWidget() {
  const startChat = useServerFn(startSupportChat);
  const updateContact = useServerFn(updateSupportContact);
  const sendMessage = useServerFn(sendSupportMessage);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  const submitEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!(event.currentTarget as HTMLFormElement).reportValidity()) return;
    setLoading(true);
    setError(null);
    try {
      const next = await startChat({ data: { email } });
      setSession(next);
      setStep("contact");
    } catch {
      setError("We couldn’t start the chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async (skip = false) => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      if (!skip && (name.trim() || phone.trim())) {
        await updateContact({ data: { ...session, name: name.trim() || undefined, phone: phone.trim() || undefined } });
      }
      setStep("chat");
    } catch {
      setError("We couldn’t save those details. You can skip and continue.");
    } finally {
      setLoading(false);
    }
  };

  const ask = async (text: string) => {
    const clean = text.trim();
    if (!clean || !session || loading) return;
    setMessages((current) => [...current, { role: "user", content: clean }]);
    setLoading(true);
    setError(null);
    setShowPhonePrompt(false);
    try {
      const answer = await sendMessage({ data: { ...session, message: clean } });
      setMessages((current) => [...current, { role: "assistant", content: answer.reply }]);
      setShowPhonePrompt(answer.askPhone && !phone.trim());
    } catch {
      setError("Your message didn’t send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveRequestedPhone = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session || !phone.trim() || !(event.currentTarget as HTMLFormElement).reportValidity()) return;
    setLoading(true);
    setError(null);
    try {
      await updateContact({ data: { ...session, phone: phone.trim() } });
      setShowPhonePrompt(false);
      setMessages((current) => [...current, { role: "assistant", content: "Thank you. A Limiel representative can use that number to follow up with you." }]);
    } catch {
      setError("We couldn’t save your phone number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            aria-label="Limiel Support chat"
            className="fixed inset-x-3 bottom-24 z-50 flex h-[min(620px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-lg border bg-card shadow-elevated sm:inset-x-auto sm:right-6 sm:w-[380px]"
          >
            <header className="flex min-h-16 items-center gap-3 gradient-hero-bg px-4 py-3 text-primary-foreground">
              <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-background">
                <BrandLogo className="h-9 w-9 rounded-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Limiel Support</p>
                <p className="text-xs opacity-80">General insurance guidance</p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                aria-label="Close Limiel Support"
                className="shrink-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="size-4" />
              </Button>
            </header>

            {step === "email" && (
              <div className="flex flex-1 flex-col justify-center overflow-auto p-5">
                <Message from="assistant">
                  <MessageContent><MessageResponse>{WELCOME}</MessageResponse></MessageContent>
                </Message>
                <form className="mt-6 space-y-3" onSubmit={submitEmail}>
                  <div>
                    <label htmlFor="support-email" className="text-sm font-medium">Email address</label>
                    <Input
                      id="support-email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    We use your email to keep this conversation and help with follow-up. See our <a href="/privacy" className="font-medium text-primary underline underline-offset-2">Privacy Policy</a>.
                  </p>
                  {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Starting…" : "Start chat"}
                  </Button>
                </form>
              </div>
            )}

            {step === "contact" && (
              <div className="flex flex-1 flex-col justify-center overflow-auto p-5">
                <div>
                  <p className="font-semibold">Nice to meet you.</p>
                  <p className="mt-1 text-sm text-muted-foreground">You may share your name and phone number so our team can follow up. Both are optional.</p>
                </div>
                <form
                  className="mt-6 space-y-3"
                  onSubmit={(event) => { event.preventDefault(); void saveContact(false); }}
                >
                  <div>
                    <label htmlFor="support-name" className="text-sm font-medium">Name <span className="font-normal text-muted-foreground">(optional)</span></label>
                    <Input id="support-name" maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="support-phone" className="text-sm font-medium">Phone <span className="font-normal text-muted-foreground">(optional)</span></label>
                    <Input id="support-phone" type="tel" maxLength={30} pattern="[+0-9 ()-]*" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0719 401 804" />
                  </div>
                  {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
                  <div className="flex gap-2 pt-1">
                    <Button type="button" variant="outline" className="flex-1" disabled={loading} onClick={() => void saveContact(true)}>Skip</Button>
                    <Button type="submit" className="flex-1" disabled={loading}>{loading ? "Saving…" : "Continue"}</Button>
                  </div>
                </form>
              </div>
            )}

            {step === "chat" && (
              <>
                <Conversation className="min-h-0">
                  <ConversationContent className="gap-4 p-4">
                    {messages.map((message, index) => (
                      <Message from={message.role} key={`${message.role}-${index}`}>
                        <MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : undefined}>
                          <MessageResponse>{message.content}</MessageResponse>
                        </MessageContent>
                      </Message>
                    ))}
                    {messages.length === 1 && (
                      <div className="grid gap-2" aria-label="Quick questions">
                        {QUICK_QUESTIONS.map((question) => (
                          <Button key={question} type="button" variant="outline" className="h-auto justify-start whitespace-normal px-3 py-2 text-left text-xs" onClick={() => void ask(question)}>
                            {question}
                          </Button>
                        ))}
                      </div>
                    )}
                    {loading && <Shimmer className="text-sm">Limiel Support is typing…</Shimmer>}
                    {showPhonePrompt && (
                      <form className="rounded-md border bg-muted/40 p-3" onSubmit={saveRequestedPhone}>
                        <label htmlFor="support-follow-up-phone" className="text-xs font-medium">Phone number for follow-up <span className="font-normal text-muted-foreground">(optional)</span></label>
                        <div className="mt-2 flex gap-2">
                          <Input id="support-follow-up-phone" type="tel" required maxLength={30} pattern="[+0-9 ()-]*" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0719 401 804" />
                          <Button type="submit" disabled={loading}>Save</Button>
                        </div>
                        <Button type="button" variant="link" className="mt-1 h-auto p-0 text-xs" onClick={() => setShowPhonePrompt(false)}>Not now</Button>
                      </form>
                    )}
                    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
                  </ConversationContent>
                  <ConversationScrollButton />
                </Conversation>
                <div className="border-t p-3">
                  <PromptInput onSubmit={({ text }) => ask(text)} className="bg-background">
                    <PromptInputTextarea maxLength={2000} placeholder="Ask Limiel Support…" disabled={loading} className="min-h-16" />
                    <PromptInputFooter className="justify-end">
                      <PromptInputSubmit status={loading ? "submitted" : "ready"} disabled={loading} />
                    </PromptInputFooter>
                  </PromptInput>
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">General information only. Please don’t share sensitive medical or payment details.</p>
                </div>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>
      <Button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Limiel Support" : "Open Limiel Support"}
        aria-expanded={open}
        className="fixed bottom-6 right-4 z-50 h-12 rounded-full px-4 shadow-elevated sm:right-6"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span>Limiel Support</span>
      </Button>
    </>
  );
}