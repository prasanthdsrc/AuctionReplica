import { useParams, Link } from 'wouter';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/LoadingState';
import { useCategory, useProductsByCategory } from '@/hooks/use-data';

export default function CategoryListing() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, isLoading: categoryLoading, isError } = useCategory(slug || '');
  const { data: categoryProducts = [], isLoading: productsLoading } = useProductsByCategory(slug || '');

  if (categoryLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-48 md:h-64 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-48 mb-6" />
          <ProductGridSkeleton count={8} cols={4} />
        </div>
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="category-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse All Items
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="category-listing-page">
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-white mb-2 -ml-2" data-testid="back-to-products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Items
              </Button>
            </Link>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-white" data-testid="category-title">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/70 mt-2 max-w-2xl">{category.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground mb-6" data-testid="category-count">
          {productsLoading ? 'Loading...' : `${categoryProducts.length} ${categoryProducts.length === 1 ? 'item' : 'items'} in this category`}
        </p>

        {productsLoading ? (
          <ProductGridSkeleton count={8} cols={4} />
        ) : categoryProducts.length === 0 ? (
          <div className="text-center py-16" data-testid="empty-state">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              There are no items in this category at the moment.
            </p>
            <Link href="/products">
              <Button variant="outline">Browse All Items</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
