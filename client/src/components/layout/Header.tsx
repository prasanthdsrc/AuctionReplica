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

// Jewellery Collections (main dropdown items)
const jewelleryCollections = [
  { href: '/categories/certified-diamonds', label: 'Certified Diamonds' },
  { href: '/categories/designer-jewellery', label: 'Designer Jewellery' },
  { href: '/categories/loose-diamonds', label: 'Loose Diamonds' },
  { href: '/categories/engagement-rings', label: 'Engagement Rings' },
  { href: '/categories/diamond-dress-rings', label: 'Diamond Dress Rings' },
  { href: '/categories/fancy-colour-diamonds', label: 'Fancy Colour Diamonds' },
  { href: '/categories/tennis-bracelets', label: 'Tennis Bracelets' },
  { href: '/categories/diamond-studs', label: 'Diamond Studs' },
  { href: '/categories/diamond-eternity-rings', label: 'Diamond Eternity Rings' },
  { href: '/categories/diamond-earrings', label: 'Diamond Earrings' },
];

// Watch categories matching original site
const watchCategories = [
  { href: '/categories/swiss-watches', label: 'Swiss Watches' },
  { href: '/categories/rolex-watches', label: 'Rolex Watches' },
  { href: '/categories/omega-watches', label: 'Omega Watches' },
  { href: '/categories/cartier-watches', label: 'Cartier Watches' },
  { href: '/categories/tag-heuer-watches', label: 'Tag Heuer Watches' },
  { href: '/categories/iwc-watches', label: 'IWC Schaffhausen Watches' },
  { href: '/categories/breitling-watches', label: 'Breitling Watches' },
  { href: '/categories/raymond-weil-watches', label: 'Raymond Weil Watches' },
  { href: '/categories/mens-watches', label: "Men's Watches" },
  { href: '/categories/ladies-watches', label: "Ladies' Watches" },
  { href: '/categories/midsize-watches', label: 'Mid-Size Watches' },
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
    jewelleryCollections.some(c => location === c.href);
  
  const isWatchActive = location?.startsWith('/categories/') && 
    watchCategories.some(c => location === c.href);
  
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
                <DropdownMenuContent align="start" className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                  {jewelleryCollections.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                      <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
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
                <DropdownMenuContent align="start" className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                  {watchCategories.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
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
                <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                  {infoLinks.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
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
                      <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Jewellery Collections</p>
                      {jewelleryCollections.map((item) => (
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
