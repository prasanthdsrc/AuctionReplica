import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  auctions: [
    { href: '/auctions', label: 'Current Auctions' },
    { href: '/past-sales', label: 'Past Sales' },
    { href: '/selling', label: 'Sell With Us' },
    { href: '/calendar', label: 'Auction Calendar' },
  ],
  categories: [
    { href: '/categories/swiss-watches', label: 'Swiss Watches' },
    { href: '/categories/designer-bags', label: 'Designer Bags' },
    { href: '/categories/rings', label: 'Rings' },
    { href: '/categories/earrings', label: 'Earrings' },
  ],
  help: [
    { href: '/how-to-bid', label: 'How to Bid' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping & Delivery' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">F</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg leading-tight">First State</h2>
                <p className="text-xs text-background/60 -mt-0.5">AUCTIONS</p>
              </div>
            </div>
            <p className="text-background/70 text-sm mb-4 max-w-md">
              Trusted luxury auctioneers since 1995. Specializing in fine jewellery, Swiss watches, and designer bags with guaranteed authenticity on every item.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Auctions</h3>
            <ul className="space-y-2">
              {footerLinks.auctions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                    data-testid={`footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                    data-testid={`footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+61290939000"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone className="h-4 w-4" />
                  (02) 9093 9000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@firststateauctions.com"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  <Mail className="h-4 w-4" />
                  info@firststateauctions.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-background/70">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Level 5, 122 Arthur Street<br />North Sydney, NSW 2060</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} First State Auctions. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <Link href="/privacy" className="hover:text-primary transition-colors" data-testid="footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors" data-testid="footer-terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
