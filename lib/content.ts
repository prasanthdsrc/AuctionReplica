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

export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getProducts();
  const category = getCategory(categorySlug);
  
  // Direct match first
  const directMatches = products.filter(p => p.category === categorySlug);
  if (directMatches.length > 0) {
    return directMatches;
  }
  
  // If no direct matches and category has a parent, show products from sibling categories
  if (category?.parentCategory) {
    const parentCategory = category.parentCategory;
    const categories = getCategories();
    
    // Find all categories with the same parent (siblings)
    const siblingCategories = categories
      .filter(c => c.parentCategory === parentCategory)
      .map(c => c.slug);
    
    // Also include categories that start with the parent prefix
    const relatedCategories = categories
      .filter(c => c.slug.startsWith(parentCategory) || siblingCategories.includes(c.slug))
      .map(c => c.slug);
    
    return products.filter(p => 
      relatedCategories.includes(p.category) || 
      p.category.startsWith(parentCategory)
    );
  }
  
  return directMatches;
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
  
  // Second pass: calculate product counts with hierarchy support
  return categoryData.map(({ id, data }) => {
    let productCount = products.filter(p => p.category === data.slug).length;
    
    // If no direct products and has parent category, count from related categories
    if (productCount === 0 && data.parentCategory) {
      const parentCategory = data.parentCategory;
      const siblingCategories = categoryData
        .filter(c => c.data.parentCategory === parentCategory)
        .map(c => c.data.slug);
      
      productCount = products.filter(p => 
        siblingCategories.includes(p.category) || 
        p.category.startsWith(parentCategory)
      ).length;
    }
    
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
