import { Link } from "@tanstack/react-router";
import { Shield, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-hero-bg text-primary-foreground">
              <Shield className="h-5 w-5" />
            </span>
            Limiel<span className="text-secondary">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Africa's smart insurance marketplace. Compare, apply, and manage policies in minutes.
          </p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="rounded-full border p-2 transition hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/claims" className="hover:text-primary">Claims</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Products</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Motor Insurance</li>
            <li>Health Insurance</li>
            <li>Travel Insurance</li>
            <li>Life Insurance</li>
            <li>Business Insurance</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Regulatory</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Limiel Insurance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
