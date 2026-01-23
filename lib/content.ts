import fs from 'fs';
import path from 'path';
import { Auction, Product, Category, HeroSlide } from './types';

const contentDir = path.join(process.cwd(), 'content');

interface TinaAuction {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
  numberOfLots: number;
  buyersPremium: number;
  status: 'upcoming' | 'open' | 'closed';
}

interface TinaProduct {
  title: string;
  description: string;
  images: string[];
  auctionId: string;
  lotNumber: number;
  estimateLow: number;
  estimateHigh: number;
  currentBid?: number;
  bidsCount: number;
  category: string;
  subcategory?: string;
  featured: boolean;
  specifications?: Array<{ key: string; value: string }>;
}

interface TinaCategory {
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  parentCategory?: string | null;
}

interface TinaSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  heroSlides: Array<{
    title: string;
    subtitle: string;
    imageUrl: string;
    linkUrl: string;
    linkText: string;
  }>;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

function getFilesInDirectory(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter(file => file.endsWith('.json'));
  } catch {
    return [];
  }
}

export function getSettings(): TinaSettings | null {
  return readJsonFile<TinaSettings>(path.join(contentDir, 'settings', 'site.json'));
}

export function getHeroSlides(): HeroSlide[] {
  const settings = getSettings();
  if (!settings?.heroSlides) return [];
  
  return settings.heroSlides.map((slide, index) => ({
    id: String(index + 1),
    title: slide.title,
    subtitle: slide.subtitle,
    imageUrl: slide.imageUrl,
    linkUrl: slide.linkUrl,
    linkText: slide.linkText
  }));
}

export function getAuctions(): Auction[] {
  const auctionsDir = path.join(contentDir, 'auctions');
  const files = getFilesInDirectory(auctionsDir);
  
  return files.map(file => {
    const id = file.replace('.json', '');
    const data = readJsonFile<TinaAuction>(path.join(auctionsDir, file));
    if (!data) return null;
    
    return {
      id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      startDate: data.startDate,
      endDate: data.endDate,
      isOnline: data.isOnline,
      numberOfLots: data.numberOfLots,
      buyersPremium: data.buyersPremium,
      status: data.status,
      catalogueUrl: data.status === 'open' ? `/auctions/${id}/catalogue` : undefined
    } as Auction;
  }).filter((a): a is Auction => a !== null);
}

export function getAuction(id: string): Auction | undefined {
  return getAuctions().find(a => a.id === id);
}

export function getProducts(): Product[] {
  const productsDir = path.join(contentDir, 'products');
  const files = getFilesInDirectory(productsDir);
  
  return files.map(file => {
    const id = file.replace('.json', '');
    const data = readJsonFile<TinaProduct>(path.join(productsDir, file));
    if (!data) return null;
    
    const specifications: Record<string, string> = {};
    if (data.specifications) {
      data.specifications.forEach(spec => {
        specifications[spec.key] = spec.value;
      });
    }
    
    return {
      id,
      auctionId: data.auctionId,
      title: data.title,
      description: data.description,
      images: data.images || [],
      lotNumber: data.lotNumber,
      estimateLow: data.estimateLow,
      estimateHigh: data.estimateHigh,
      currentBid: data.currentBid,
      bidsCount: data.bidsCount,
      category: data.category,
      subcategory: data.subcategory,
      featured: data.featured,
      specifications
    } as Product;
  }).filter((p): p is Product => p !== null);
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductsByAuction(auctionId: string): Product[] {
  return getProducts().filter(p => p.auctionId === auctionId);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter(p => p.featured);
}

// Helper function to check if product is jewellery (not a watch or bag)
function isJewellery(p: Product): boolean {
  const watchCategories = ['watches-mens', 'watches-ladies', 'watches-midsize'];
  const bagCategories = ['designer-bags'];
  return !watchCategories.includes(p.category) && !bagCategories.includes(p.category);
}

// Smart category mapping - matches server/routes.ts categoryMapping logic
function getCategoryFilter(slug: string): ((p: Product) => boolean) | null {
  const title = (p: Product) => p.title.toLowerCase();
  
  const categoryMapping: Record<string, (p: Product) => boolean> = {
    // Jewellery Categories (by item type)
    'rings': (p) => isJewellery(p) && (p.category === 'rings' || title(p).includes('ring')),
    'earrings': (p) => isJewellery(p) && (p.category === 'earrings' || title(p).includes('earring')),
    'pendants': (p) => isJewellery(p) && (p.category === 'pendants' || title(p).includes('pendant')),
    'bracelets': (p) => isJewellery(p) && (p.category === 'bracelets' || title(p).includes('bracelet')),
    'necklaces': (p) => isJewellery(p) && (p.category === 'necklaces' || title(p).includes('necklace')),
    'bangles': (p) => isJewellery(p) && (p.category === 'bangles' || title(p).includes('bangle')),
    'loose-gems': (p) => isJewellery(p) && (title(p).includes('loose') && !title(p).includes('diamond')),
    'brooches': (p) => isJewellery(p) && (p.category === 'brooches' || title(p).includes('brooch')),
    
    // Jewellery Types (by gemstone/material) - using existing category slugs
    'diamond': (p) => isJewellery(p) && (p.category === 'diamond' || title(p).includes('diamond')),
    'pearl': (p) => isJewellery(p) && (p.category === 'pearl' || title(p).includes('pearl')),
    'sapphire': (p) => isJewellery(p) && (p.category === 'sapphire' || title(p).includes('sapphire')),
    'ruby': (p) => isJewellery(p) && (p.category === 'ruby' || title(p).includes('ruby')),
    'tanzanite': (p) => isJewellery(p) && (p.category === 'tanzanite' || title(p).includes('tanzanite')),
    'emerald': (p) => isJewellery(p) && (p.category === 'emerald' || title(p).includes('emerald')),
    'jade': (p) => isJewellery(p) && (p.category === 'jade' || title(p).includes('jade')),
    'aquamarine': (p) => isJewellery(p) && (p.category === 'aquamarine' || title(p).includes('aquamarine')),
    'opal': (p) => isJewellery(p) && (p.category === 'opal' || title(p).includes('opal')),
    'topaz': (p) => isJewellery(p) && (p.category === 'topaz' || title(p).includes('topaz')),
    'tourmaline': (p) => isJewellery(p) && (p.category === 'tourmaline' || title(p).includes('tourmaline')),
    'gold-jewellery': (p) => isJewellery(p) && (p.category === 'gold-jewellery' || title(p).includes('gold')),
    
    // Jewellery Collections
    'certified-diamonds': (p) => p.category === 'diamond' && (title(p).includes('certified') || title(p).includes('gia') || title(p).includes('igi')),
    'loose-diamonds': (p) => p.category === 'diamond' && title(p).includes('loose'),
    'engagement-rings': (p) => isJewellery(p) && title(p).includes('engagement'),
    'tennis-bracelets': (p) => isJewellery(p) && title(p).includes('tennis'),
    'diamond-earrings': (p) => isJewellery(p) && title(p).includes('diamond') && (title(p).includes('earring') || title(p).includes('drop') || title(p).includes('hoop')),
    
    // Watch Categories
    'swiss-watches': (p) => p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize',
    'rolex-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('rolex'),
    'omega-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('omega'),
    'cartier-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('cartier'),
    'tag-heuer-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && (title(p).includes('tag heuer') || title(p).includes('tag-heuer')),
    'iwc-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('iwc'),
    'breitling-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('breitling'),
    'raymond-weil-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && title(p).includes('raymond weil'),
    'watches-mens': (p) => p.category === 'watches-mens',
    'watches-ladies': (p) => p.category === 'watches-ladies',
    'watches-midsize': (p) => p.category === 'watches-midsize',
    
    // Designer Bags
    'designer-bags': (p) => p.category === 'designer-bags',
  };
  
  return categoryMapping[slug] || null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getProducts();
  
  // Use smart category filtering (matches server/routes.ts behavior)
  const filterFn = getCategoryFilter(categorySlug);
  if (filterFn) {
    return products.filter(filterFn);
  }
  
  // Fallback to direct category match
  return products.filter(p => p.category === categorySlug);
}

export function getCategories(): Category[] {
  const categoriesDir = path.join(contentDir, 'categories');
  const files = getFilesInDirectory(categoriesDir);
  const products = getProducts();
  
  // First pass: get all category data
  const categoryData = files.map(file => {
    const id = file.replace('.json', '');
    const data = readJsonFile<TinaCategory>(path.join(categoriesDir, file));
    if (!data) return null;
    return { id, data };
  }).filter((c): c is { id: string; data: TinaCategory } => c !== null);
  
  // Second pass: calculate product counts using smart filtering (matches server/routes.ts)
  return categoryData.map(({ id, data }) => {
    // Use smart category filtering for product count
    const filterFn = getCategoryFilter(data.slug);
    let productCount = filterFn 
      ? products.filter(filterFn).length 
      : products.filter(p => p.category === data.slug).length;
    
    return {
      id: `cat-${id}`,
      name: data.name,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      productCount,
      parentCategory: data.parentCategory || null
    } as Category;
  });
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find(c => c.slug === slug);
}
