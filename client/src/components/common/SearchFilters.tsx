import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category, SearchFilters } from '@/lib/types';

interface SearchFiltersProps {
  filters: SearchFilters;
  categories: Category[];
  onFiltersChange: (filters: SearchFilters) => void;
}

export function SearchFiltersComponent({
  filters,
  categories,
  onFiltersChange,
}: SearchFiltersProps) {
  const handleQueryChange = (value: string) => {
    onFiltersChange({ ...filters, query: value });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value === 'all' ? undefined : value });
  };

  const handleSortChange = (value: SearchFilters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handlePriceMinChange = (value: string) => {
    const num = parseInt(value);
    onFiltersChange({ ...filters, priceMin: isNaN(num) ? undefined : num });
  };

  const handlePriceMaxChange = (value: string) => {
    const num = parseInt(value);
    onFiltersChange({ ...filters, priceMax: isNaN(num) ? undefined : num });
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4" data-testid="search-filters">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          value={filters.query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-10"
          data-testid="filter-search-input"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select
          value={filters.category || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger data-testid="filter-category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleSortChange(value as SearchFilters['sortBy'])}
        >
          <SelectTrigger data-testid="filter-sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Price"
          value={filters.priceMin || ''}
          onChange={(e) => handlePriceMinChange(e.target.value)}
          className="w-full"
          data-testid="filter-price-min"
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={filters.priceMax || ''}
          onChange={(e) => handlePriceMaxChange(e.target.value)}
          className="w-full"
          data-testid="filter-price-max"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filters.query || filters.category || filters.priceMin || filters.priceMax
            ? 'Filters applied'
            : 'No filters applied'}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onFiltersChange({
              query: '',
              sortBy: 'relevance',
              category: undefined,
              priceMin: undefined,
              priceMax: undefined,
            })
          }
          data-testid="filter-clear"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
