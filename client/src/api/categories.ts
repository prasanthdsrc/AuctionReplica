import { categories as staticCategories } from '@/lib/data';
import type { Category } from '@/lib/types';

const API_BASE = '/api';

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const response = await fetch(`${API_BASE}/categories/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch category');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticCategories.find((c) => c.slug === slug);
  }
}

export async function getPopularCategories(limit = 10): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE}/categories?limit=${limit}&sort=popular`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticCategories
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, limit);
  }
}
