import { products as staticProducts } from '@/lib/data';
import type { Product, SearchFilters } from '@/lib/types';

const API_BASE = '/api';

export async function getProducts(filters?: SearchFilters): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.query) params.set('query', filters.query);
    if (filters?.category) params.set('category', filters.category);
    if (filters?.priceMin !== undefined) params.set('priceMin', String(filters.priceMin));
    if (filters?.priceMax !== undefined) params.set('priceMax', String(filters.priceMax));
    if (filters?.sortBy) params.set('sortBy', filters.sortBy);

    const response = await fetch(`${API_BASE}/products?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return filterProducts(staticProducts, filters);
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch product');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticProducts.find((p) => p.id === id);
  }
}

export async function getProductsByAuction(auctionId: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/auctions/${auctionId}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticProducts.filter((p) => p.auctionId === auctionId);
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/categories/${categorySlug}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticProducts.filter((p) => p.category === categorySlug);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products?featured=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticProducts.filter((p) => p.featured);
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    const lowerQuery = query.toLowerCase();
    return staticProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  }
}

function filterProducts(products: Product[], filters?: SearchFilters): Product[] {
  if (!filters) return products;

  let result = [...products];

  if (filters.query) {
    const query = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.estimateLow >= (filters.priceMin || 0));
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.estimateHigh <= (filters.priceMax || Infinity));
  }

  switch (filters.sortBy) {
    case 'price-low':
      result.sort((a, b) => a.estimateLow - b.estimateLow);
      break;
    case 'price-high':
      result.sort((a, b) => b.estimateHigh - a.estimateHigh);
      break;
    case 'newest':
      result.sort((a, b) => b.lotNumber - a.lotNumber);
      break;
    case 'ending-soon':
      result.sort((a, b) => a.lotNumber - b.lotNumber);
      break;
    default:
      break;
  }

  return result;
}
