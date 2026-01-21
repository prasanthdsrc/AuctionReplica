import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategories, getProductsByCategory, getCategory } from '@/lib/content';
import { formatCurrency } from '@/lib/utils';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} - First State Auctions`,
    description: category.description || `Browse our collection of ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to All Items
        </Link>

        <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-8">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-serif font-bold text-white mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-white/80 text-lg">{category.description}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground">{products.length} items in this category</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} data-testid={`category-product-${product.id}`}>
                <Card className="overflow-hidden hover-elevate transition-all h-full">
                  <div className="relative aspect-square bg-white">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                    <Badge variant="secondary" className="absolute top-3 left-3">
                      Lot {product.lotNumber}
                    </Badge>
                    {product.featured && (
                      <Badge className="absolute top-3 right-3">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 mb-3 text-sm">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Bid</p>
                        <p className="font-semibold text-primary">
                          {product.currentBid ? formatCurrency(product.currentBid) : 'No bids'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Estimate</p>
                        <p className="text-sm">
                          {formatCurrency(product.estimateLow)} - {formatCurrency(product.estimateHigh)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{product.bidsCount} bids</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No items in this category yet.</p>
            <Link href="/products" className="text-primary hover:underline">
              Browse all items
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
