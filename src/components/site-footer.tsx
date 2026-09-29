import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";

const WA = `https://wa.me/254719401804?text=${encodeURIComponent("Hello Limiel Insurance, I would like to enquire about an insurance cover.")}`;
const linkCls = "cursor-pointer transition hover:text-primary hover:underline";

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
            <a href="https://www.linkedin.com/in/limiel-insurance-company" target="_blank" rel="noopener noreferrer" aria-label="Limiel on LinkedIn" className="cursor-pointer rounded-full border p-2 transition hover:border-primary hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </a>
            <span aria-label="Facebook" className="rounded-full border p-2"><Facebook className="h-4 w-4" /></span>
            <span aria-label="Instagram" className="rounded-full border p-2"><Instagram className="h-4 w-4" /></span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className={linkCls}>About</Link></li>
            <li><Link to="/products" className={linkCls}>Products</Link></li>
            <li><Link to="/quote" className={linkCls}>Get a Quote</Link></li>
            <li><Link to="/explain" className={linkCls}>Explain My Cover</Link></li>
            <li><Link to="/blog" className={linkCls}>Journal</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:+254719401804" className={`flex items-center gap-2 ${linkCls}`}><Phone className="h-4 w-4" /> 0719 401 804</a></li>
            <li><a href={WA} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${linkCls}`}><MessageCircle className="h-4 w-4" /> WhatsApp us</a></li>
            <li><a href="mailto:limielInsurance@gmail.com" className={`flex items-center gap-2 ${linkCls}`}><Mail className="h-4 w-4" /> limielInsurance@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Our Office</h4>
          <p className="mt-4 text-sm text-muted-foreground">Real Towers, Upper Hill,<br />Nairobi, Kenya</p>
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Limiel Insurance Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
