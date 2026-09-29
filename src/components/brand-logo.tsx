import logo from "@/assets/limiel-logo.jpg.asset.json";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Limiel Insurance Limited — Your security, our commitment."
      className={cn("h-11 w-auto rounded-lg object-contain", className)}
    />
  );
}
