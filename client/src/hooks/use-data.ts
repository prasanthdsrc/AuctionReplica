import { useQuery } from '@tanstack/react-query';
import { getAuctions, getAuctionById, getCurrentAuctions } from '@/api/auctions';
import { getProducts, getProductById, getFeaturedProducts, getProductsByCategory } from '@/api/products';
import { getCategories, getCategoryBySlug } from '@/api/categories';
import type { SearchFilters } from '@/lib/types';

export function useAuctions() {
  return useQuery({
    queryKey: ['/api/auctions'],
    queryFn: getAuctions,
  });
}

export function useAuction(id: string) {
  return useQuery({
    queryKey: ['/api/auctions', id],
    queryFn: () => getAuctionById(id),
    enabled: !!id,
  });
}

export function useCurrentAuctions() {
  return useQuery({
    queryKey: ['/api/auctions', 'current'],
    queryFn: getCurrentAuctions,
  });
}

export function useProducts(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['/api/products', filters],
    queryFn: () => getProducts(filters),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['/api/products', 'featured'],
    queryFn: getFeaturedProducts,
  });
}

export function useProductsByCategory(categorySlug: string) {
  return useQuery({
    queryKey: ['/api/categories', categorySlug, 'products'],
    queryFn: () => getProductsByCategory(categorySlug),
    enabled: !!categorySlug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['/api/categories'],
    queryFn: getCategories,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['/api/categories', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

export { heroSlides, faqItems } from '@/lib/data';
