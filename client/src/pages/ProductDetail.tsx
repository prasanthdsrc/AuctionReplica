import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Gavel, Heart, Share2, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '@/components/product/ProductCard';
import { useProduct, useProducts } from '@/hooks/use-data';
import { getAuctionById } from '@/api/auctions';
import { useQuery } from '@tanstack/react-query';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id || '');
  const { data: allProducts = [] } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState('');

  const { data: auction } = useQuery({
    queryKey: ['/api/auctions', product?.auctionId],
    queryFn: () => getAuctionById(product?.auctionId || ''),
    enabled: !!product?.auctionId,
  });

  const relatedProducts = allProducts
    .filter((p) => p.id !== product?.id && p.category === product?.category)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="bg-muted border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="product-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Items
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const minimumBid = product.currentBid
    ? product.currentBid + 100
    : product.estimateLow;

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen pb-16" data-testid="product-detail-page">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-foreground">
              Items
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    data-testid="prev-image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    data-testid="next-image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-foreground font-mono">
                  Lot {product.lotNumber}
                </Badge>
              </div>
              {product.featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      index === selectedImageIndex
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-serif text-2xl md:text-3xl font-bold" data-testid="product-title">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" data-testid="button-favorite">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {auction && (
              <Link href={`/auctions/${auction.id}`}>
                <Badge variant="outline" className="mb-4 cursor-pointer hover:bg-muted" data-testid="auction-link">
                  {auction.title}
                </Badge>
              </Link>
            )}

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Auction Estimate</p>
              <p className="text-2xl font-bold" data-testid="product-estimate">
                {formatPrice(product.estimateLow)} - {formatPrice(product.estimateHigh)}
              </p>
            </div>

            {product.currentBid && (
              <Card className="mb-6 border-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                      <p className="text-xl font-bold text-primary" data-testid="current-bid">
                        {formatPrice(product.currentBid)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Gavel className="h-4 w-4" />
                      <span className="text-sm">{product.bidsCount} bids</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Place Your Bid</p>
              <p className="text-xs text-muted-foreground mb-3">
                Minimum bid: {formatPrice(minimumBid)}
              </p>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={`Enter ${formatPrice(minimumBid)} or more`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="flex-1"
                  data-testid="bid-input"
                />
                <Button size="lg" data-testid="place-bid">
                  Place Bid
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h2 className="font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground" data-testid="product-description">
                {product.description}
              </p>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-muted rounded-md p-3">
                      <p className="text-xs text-muted-foreground">{key}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Authenticity Guaranteed</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Secure Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Returns Accepted</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-xl font-bold mb-6">Related Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
