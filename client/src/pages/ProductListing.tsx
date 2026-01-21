import { useState, useMemo, useEffect } from 'react';
import { useSearch } from 'wouter';
import { Grid3X3, LayoutGrid, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchFiltersComponent } from '@/components/common/SearchFilters';
import { ProductGridSkeleton } from '@/components/common/LoadingState';
import { useProducts, useCategories } from '@/hooks/use-data';
import type { SearchFilters } from '@/lib/types';

export default function ProductListing() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    sortBy: 'relevance',
  });
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const { data: allProducts = [], isLoading: productsLoading, isError } = useProducts();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (initialQuery) {
      setFilters((prev) => ({ ...prev, query: initialQuery }));
    }
  }, [initialQuery]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

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
        if (filters.query) {
          const query = filters.query.toLowerCase();
          result.sort((a, b) => {
            const aScore = a.title.toLowerCase().includes(query) ? 1 : 0;
            const bScore = b.title.toLowerCase().includes(query) ? 1 : 0;
            return bScore - aScore;
          });
        }
    }

    return result;
  }, [allProducts, filters]);

  return (
    <div className="min-h-screen" data-testid="product-listing-page">
      <div className="bg-foreground text-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Browse Items</h1>
          </div>
          <p className="text-background/70 max-w-2xl">
            Explore our complete catalogue of fine jewellery, Swiss watches, designer bags,
            and more. Use the filters to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <SearchFiltersComponent
          filters={filters}
          categories={categories}
          onFiltersChange={setFilters}
        />

        <div className="flex items-center justify-between mt-6 mb-4 gap-4">
          <p className="text-sm text-muted-foreground" data-testid="results-count">
            {productsLoading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'} found`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={gridCols === 3 ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setGridCols(3)}
              data-testid="grid-3"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={gridCols === 4 ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setGridCols(4)}
              data-testid="grid-4"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {productsLoading ? (
          <ProductGridSkeleton count={8} cols={gridCols} />
        ) : isError ? (
          <div className="text-center py-16" data-testid="error-state">
            <Package className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error loading products</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16" data-testid="empty-state">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  query: '',
                  sortBy: 'relevance',
                  category: undefined,
                  priceMin: undefined,
                  priceMax: undefined,
                })
              }
              data-testid="clear-filters"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-4 md:gap-6 ${
              gridCols === 3
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
