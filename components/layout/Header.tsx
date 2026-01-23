'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, User, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
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

// Jewellery Categories (by item type)
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

// Jewellery Types (by gemstone/material) - uses existing category slugs
const jewelleryTypes = [
  { href: '/categories/diamond', label: 'Diamond' },
  { href: '/categories/pearl', label: 'Pearl' },
  { href: '/categories/sapphire', label: 'Sapphire' },
  { href: '/categories/ruby', label: 'Ruby' },
  { href: '/categories/tanzanite', label: 'Tanzanite' },
  { href: '/categories/emerald', label: 'Emerald' },
  { href: '/categories/jade', label: 'Jade' },
  { href: '/categories/aquamarine', label: 'Aquamarine' },
  { href: '/categories/opal', label: 'Opal' },
  { href: '/categories/topaz', label: 'Topaz' },
  { href: '/categories/tourmaline', label: 'Tourmaline' },
  { href: '/categories/gold-jewellery', label: 'Gold Jewellery' },
];

// Jewellery Collections (curated) - linking to existing categories
const jewelleryCollections = [
  { href: '/categories/diamond', label: 'Certified Diamonds' },
  { href: '/categories/loose-gems', label: 'Loose Gems' },
  { href: '/categories/rings', label: 'Engagement Rings' },
  { href: '/categories/bracelets', label: 'Tennis Bracelets' },
  { href: '/categories/earrings', label: 'Diamond Earrings' },
];

// All jewellery for checking active state
const allJewelleryItems = [...jewelleryCategories, ...jewelleryTypes, ...jewelleryCollections];

// Watch categories - all watch brands and types
const watchCategories = [
  { href: '/categories/swiss-watches', label: 'Swiss Watches' },
  { href: '/categories/rolex-watches', label: 'Rolex Watches' },
  { href: '/categories/omega-watches', label: 'Omega Watches' },
  { href: '/categories/cartier-watches', label: 'Cartier Watches' },
  { href: '/categories/tag-heuer-watches', label: 'Tag Heuer Watches' },
  { href: '/categories/iwc-watches', label: 'IWC Schaffhausen Watches' },
  { href: '/categories/breitling-watches', label: 'Breitling Watches' },
  { href: '/categories/raymond-weil-watches', label: 'Raymond Weil Watches' },
  { href: '/categories/watches-mens', label: "Men's Watches" },
  { href: '/categories/watches-ladies', label: "Ladies' Watches" },
  { href: '/categories/watches-midsize', label: 'Mid-Size Watches' },
];

const infoLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/selling', label: 'Selling with Us' },
  { href: '/past-sales', label: 'Past Sales' },
  { href: '/contact', label: 'Contact Us' },
];

type JewellerySubmenu = 'categories' | 'types' | 'collections' | null;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jewellerySubmenu, setJewellerySubmenu] = useState<JewellerySubmenu>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isJewelleryActive = pathname?.startsWith('/categories/') && 
    allJewelleryItems.some(c => pathname === c.href);
  
  const isWatchActive = pathname?.startsWith('/categories/') && 
    watchCategories.some(c => pathname === c.href);
  
  const isInfoActive = infoLinks.some(l => pathname === l.href);

  const getSubmenuItems = () => {
    switch (jewellerySubmenu) {
      case 'categories':
        return jewelleryCategories;
      case 'types':
        return jewelleryTypes;
      case 'collections':
        return jewelleryCollections;
      default:
        return [];
    }
  };

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
                    pathname === '/auctions' ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  data-testid="nav-auctions"
                >
                  AUCTIONS
                </Button>
              </Link>

              {/* Jewellery with hierarchical flyout */}
              <DropdownMenu onOpenChange={(open) => { if (!open) setJewellerySubmenu(null); }}>
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
                <DropdownMenuContent 
                  align="start" 
                  className="p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
                  sideOffset={5}
                >
                  <div className="flex">
                    {/* Main menu items */}
                    <div className="w-56 border-r border-gray-200 dark:border-gray-700 p-1">
                      <div
                        className={`flex items-center justify-between px-2 py-1.5 rounded-sm cursor-pointer transition-colors text-sm ${
                          jewellerySubmenu === 'categories' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-primary/10 hover:text-primary'
                        }`}
                        onMouseEnter={() => setJewellerySubmenu('categories')}
                        data-testid="submenu-jewellery-categories"
                      >
                        <span>Jewellery Categories</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </div>
                      <div
                        className={`flex items-center justify-between px-2 py-1.5 rounded-sm cursor-pointer transition-colors text-sm ${
                          jewellerySubmenu === 'types' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-primary/10 hover:text-primary'
                        }`}
                        onMouseEnter={() => setJewellerySubmenu('types')}
                        data-testid="submenu-jewellery-types"
                      >
                        <span>Jewellery Types</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </div>
                      <div
                        className={`flex items-center justify-between px-2 py-1.5 rounded-sm cursor-pointer transition-colors text-sm ${
                          jewellerySubmenu === 'collections' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-primary/10 hover:text-primary'
                        }`}
                        onMouseEnter={() => setJewellerySubmenu('collections')}
                        data-testid="submenu-jewellery-collections"
                      >
                        <span>Jewellery Collections</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </div>
                    </div>
                    
                    {/* Submenu items */}
                    {jewellerySubmenu && (
                      <div className="w-52 max-h-80 overflow-y-auto">
                        {getSubmenuItems().map((item) => (
                          <DropdownMenuItem key={item.href} asChild className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                            <Link href={item.href} data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    )}
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
                  size="sm"
                  className={`text-sm font-medium ${
                    pathname === '/selling' ? 'text-primary bg-primary/5' : 'text-foreground'
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
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
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
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname === '/auctions' ? 'bg-primary/10 text-primary' : ''}`}
                        data-testid="mobile-nav-auctions"
                      >
                        Auctions
                      </Button>
                    </Link>

                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-4 uppercase tracking-wide">Jewellery Categories</p>
                      {jewelleryCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-4 uppercase tracking-wide">Jewellery Types</p>
                      {jewelleryTypes.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-4 uppercase tracking-wide">Jewellery Collections</p>
                      {jewelleryCollections.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-4 uppercase tracking-wide">Watches</p>
                      {watchCategories.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <Link href="/categories/designer-bags">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname === '/categories/designer-bags' ? 'bg-primary/10 text-primary' : ''}`}
                        data-testid="mobile-nav-designer-bags"
                      >
                        Designer Bags
                      </Button>
                    </Link>

                    <Link href="/selling">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname === '/selling' ? 'bg-primary/10 text-primary' : ''}`}
                        data-testid="mobile-nav-selling"
                      >
                        Selling
                      </Button>
                    </Link>

                    <div className="py-2 border-t mt-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-4 uppercase tracking-wide">Information</p>
                      {infoLinks.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
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
