import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center" aria-label="Limiel Insurance home">
            <BrandLogo className="h-14" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Independent Kenyan insurance brokerage. Real Towers, Upper Hill, Nairobi, Kenya.
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
            <li><Link to="/explain" className="hover:text-primary">Explain My Cover</Link></li>
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
