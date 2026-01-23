import { useState } from 'react';
import { Link, useLocation } from 'wouter';
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
} from '@/components/ui/dropdown-menu';

const jewelleryCategories = [
  { href: '/categories/rings', label: 'Rings' },
  { href: '/categories/earrings', label: 'Earrings' },
  { href: '/categories/pendants', label: 'Pendants' },
  { href: '/categories/bracelets', label: 'Bracelets' },
  { href: '/categories/necklaces', label: 'Necklaces' },
  { href: '/categories/bangles', label: 'Bangles' },
  { href: '/categories/brooches', label: 'Brooches' },
  { href: '/categories/loose-gems', label: 'Loose Gems' },
];

const jewelleryTypes = [
  { href: '/categories/diamond', label: 'Diamond' },
  { href: '/categories/sapphire', label: 'Sapphire' },
  { href: '/categories/ruby', label: 'Ruby' },
  { href: '/categories/emerald', label: 'Emerald' },
  { href: '/categories/pearl', label: 'Pearl' },
  { href: '/categories/opal', label: 'Opal' },
  { href: '/categories/tanzanite', label: 'Tanzanite' },
  { href: '/categories/aquamarine', label: 'Aquamarine' },
  { href: '/categories/topaz', label: 'Topaz' },
  { href: '/categories/tourmaline', label: 'Tourmaline' },
  { href: '/categories/jade', label: 'Jade' },
  { href: '/categories/gold-jewellery', label: 'Gold Jewellery' },
];

const watchCategories = [
  { href: '/categories/watches-mens', label: 'Mens Watches' },
  { href: '/categories/watches-ladies', label: 'Ladies Watches' },
  { href: '/categories/watches-midsize', label: 'Midsize Watches' },
];

const infoLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/selling', label: 'Selling with Us' },
  { href: '/past-sales', label: 'Past Sales' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isJewelleryActive = location?.startsWith('/categories/') && 
    (jewelleryCategories.some(c => location === c.href) || jewelleryTypes.some(c => location === c.href));
  
  const isWatchActive = location?.startsWith('/categories/watches');
  
  const isInfoActive = infoLinks.some(l => location === l.href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+61290939000" className="flex items-center gap-1.5 hover-elevate rounded px-1 py-0.5" data-testid="link-phone">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">(02) 9093 9000</span>
            </a>
            <a href="mailto:info@firststateauctions.com" className="flex items-center gap-1.5 hover-elevate rounded px-1 py-0.5" data-testid="link-email">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@firststateauctions.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="ghost" size="sm" className="text-background h-7 px-2" data-testid="button-register">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-background h-7 px-2" data-testid="button-login">
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

            <nav className="hidden lg:flex items-center gap-0.5">
              <Link href="/auctions">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    location === '/auctions' ? 'text-primary bg-primary/5' : 'text-foreground'
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
                    size="sm"
                    className={`text-sm font-medium ${
                      isJewelleryActive ? 'text-primary bg-primary/5' : 'text-foreground'
                    }`}
                    data-testid="nav-jewellery"
                  >
                    JEWELLERY <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4" align="start">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Categories</p>
                      {jewelleryCategories.map((item) => (
                        <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                          <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">By Stone</p>
                      {jewelleryTypes.map((item) => (
                        <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                          <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
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
                    size="sm"
                    className={`text-sm font-medium ${
                      isWatchActive ? 'text-primary bg-primary/5' : 'text-foreground'
                    }`}
                    data-testid="nav-watches"
                  >
                    WATCHES <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {watchCategories.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                      <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/categories/designer-bags">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    location === '/categories/designer-bags' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-designer-bags"
                >
                  DESIGNER BAGS
                </Button>
              </Link>

              <Link href="/selling">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    location === '/selling' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-selling"
                >
                  SELLING
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm font-medium ${
                      isInfoActive ? 'text-primary bg-primary/5' : 'text-foreground'
                    }`}
                    data-testid="nav-information"
                  >
                    INFORMATION <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {infoLinks.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                      <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
                    
                    <div className="py-2 border-t mt-2">
                      <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Jewellery Categories</p>
                      {jewelleryCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-2 border-t">
                      <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Jewellery By Stone</p>
                      {jewelleryTypes.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-2 border-t">
                      <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Watches</p>
                      {watchCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2">
                      <Link href="/categories/designer-bags">
                        <Button variant="ghost" className="w-full justify-start text-base font-medium" data-testid="mobile-nav-designer-bags">
                          Designer Bags
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="py-2 border-t">
                      <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Information</p>
                      {infoLinks.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm pl-6" data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
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
