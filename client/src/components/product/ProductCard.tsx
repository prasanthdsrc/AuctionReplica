import { Link } from 'wouter';
import { Gavel } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group" data-testid={`product-card-${product.id}`}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground font-mono text-xs">
            Lot {product.lotNumber}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[40px]" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Auction estimate:</p>
          <p className="font-semibold text-sm" data-testid={`product-estimate-${product.id}`}>
            {formatPrice(product.estimateLow)} - {formatPrice(product.estimateHigh)}
          </p>
        </div>

        {product.currentBid && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Gavel className="h-3.5 w-3.5" />
            <span>Current bid: <span className="text-foreground font-medium">{formatPrice(product.currentBid)}</span></span>
            <span>({product.bidsCount} bids)</span>
          </div>
        )}

        <Link href={`/products/${product.id}`}>
          <Button variant="outline" className="w-full" data-testid={`product-view-${product.id}`}>
            View & Bid
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
