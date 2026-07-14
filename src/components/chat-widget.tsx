import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-80 rounded-2xl border bg-card shadow-elevated sm:right-6"
          >
            <div className="flex items-center justify-between rounded-t-2xl gradient-hero-bg p-4 text-primary-foreground">
              <div>
                <p className="text-sm font-semibold">Limiel Support</p>
                <p className="text-xs opacity-80">We reply in minutes</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-56 space-y-2 overflow-auto p-4 text-sm">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted p-3">
                Hi 👋 How can we help you today?
              </div>
            </div>
            <form className="flex gap-2 border-t p-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Type a message…" />
              <Button size="icon" type="submit" className="gradient-hero-bg text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with support"
        className="fixed bottom-6 right-4 z-50 grid h-14 w-14 place-items-center rounded-full gradient-hero-bg text-primary-foreground shadow-elevated transition hover:scale-105 sm:right-6"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
}
