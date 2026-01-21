import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Items - First State Auctions',
  description: 'Browse our complete collection of fine jewellery, Swiss watches, and designer bags.',
};

export default function ProductsPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Browse Items</h1>
          <p className="text-muted-foreground">{products.length} items available</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/products">
            <Badge variant="default" className="cursor-pointer">All Items</Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Badge variant="outline" className="cursor-pointer">{category.name}</Badge>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} data-testid={`product-${product.id}`}>
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
      </div>
    </div>
  );
}
