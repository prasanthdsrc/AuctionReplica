'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const jewelleryCategories = [
  { href: '/categories/rings', label: 'Rings' },
  { href: '/categories/earrings', label: 'Earrings' },
  { href: '/categories/pendants', label: 'Pendants' },
  { href: '/categories/bracelets', label: 'Bracelets' },
  { href: '/categories/necklaces', label: 'Necklaces' },
  { href: '/categories/bangles', label: 'Bangles' },
  { href: '/categories/loose-gems', label: 'Loose Gems' },
  { href: '/categories/brooches', label: 'Brooches' },
];

const jewelleryTypes = [
  { href: '/categories/diamond', label: 'Diamond' },
  { href: '/categories/sapphire', label: 'Sapphire' },
  { href: '/categories/ruby', label: 'Ruby' },
  { href: '/categories/emerald', label: 'Emerald' },
  { href: '/categories/pearl', label: 'Pearl' },
  { href: '/categories/aquamarine', label: 'Aquamarine' },
  { href: '/categories/tanzanite', label: 'Tanzanite' },
  { href: '/categories/opal', label: 'Opal' },
  { href: '/categories/gold-jewellery', label: 'Gold Jewellery' },
];

const watchCategories = [
  { href: '/categories/watches-mens', label: 'Mens Watches' },
  { href: '/categories/watches-ladies', label: 'Ladies Watches' },
  { href: '/categories/watches-midsize', label: 'Midsize Watches' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+61290939000" className="flex items-center gap-1.5 hover:text-primary transition-colors" data-testid="link-phone">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">(02) 9093 9000</span>
            </a>
            <a href="mailto:info@firststateauctions.com" className="flex items-center gap-1.5 hover:text-primary transition-colors" data-testid="link-email">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@firststateauctions.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-transparent h-7 px-2" data-testid="button-register">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-transparent h-7 px-2" data-testid="button-login">
                <User className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex-shrink-0" data-testid="link-logo">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-xl">F</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-serif font-bold text-lg leading-tight">First State</h1>
                  <p className="text-xs text-muted-foreground -mt-0.5">AUCTIONS</p>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/auctions">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    pathname === '/auctions' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-auctions"
                >
                  AUCTIONS
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${
                      pathname?.startsWith('/categories/') && jewelleryCategories.some(c => pathname === c.href) 
                        ? 'text-primary bg-primary/5' : 'text-foreground'
                    }`}
                    data-testid="nav-jewellery"
                  >
                    JEWELLERY <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4" align="start">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">CATEGORIES</p>
                      {jewelleryCategories.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href} className="cursor-pointer" data-testid={`dropdown-${item.label.toLowerCase()}`}>
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">BY TYPE</p>
                      {jewelleryTypes.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href} className="cursor-pointer" data-testid={`dropdown-${item.label.toLowerCase()}`}>
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${
                      pathname?.startsWith('/categories/watches') ? 'text-primary bg-primary/5' : 'text-foreground'
                    }`}
                    data-testid="nav-watches"
                  >
                    WATCHES <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {watchCategories.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="cursor-pointer" data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/categories/designer-bags">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    pathname === '/categories/designer-bags' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-designer-bags"
                >
                  DESIGNER BAGS
                </Button>
              </Link>

              <Link href="/selling">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    pathname === '/selling' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-selling"
                >
                  SELLING
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    pathname === '/about' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-about"
                >
                  INFORMATION
                </Button>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 sm:w-64"
                    autoFocus
                    data-testid="input-search"
                  />
                  <Button type="submit" size="icon" variant="ghost" data-testid="button-search-submit">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setSearchOpen(false)}
                    data-testid="button-search-close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSearchOpen(true)}
                  data-testid="button-search-open"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="lg:hidden" data-testid="button-mobile-menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <nav className="flex flex-col gap-1 mt-8">
                    <Link href="/auctions">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-auctions">
                        Auctions
                      </Button>
                    </Link>
                    
                    <div className="py-2">
                      <p className="px-4 text-sm font-semibold text-muted-foreground mb-2">Jewellery Categories</p>
                      {jewelleryCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase()}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-2">
                      <p className="px-4 text-sm font-semibold text-muted-foreground mb-2">Jewellery Types</p>
                      {jewelleryTypes.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase()}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-2">
                      <p className="px-4 text-sm font-semibold text-muted-foreground mb-2">Watches</p>
                      {watchCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <Link href="/categories/designer-bags">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-designer-bags">
                        Designer Bags
                      </Button>
                    </Link>
                    
                    <Link href="/selling">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-selling">
                        Selling
                      </Button>
                    </Link>
                    
                    <Link href="/about">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-information">
                        Information
                      </Button>
                    </Link>
                    
                    <Link href="/contact">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-contact">
                        Contact
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
