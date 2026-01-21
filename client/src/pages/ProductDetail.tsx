import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Clock, Shield, Heart, Share2, ChevronLeft, ChevronRight, MessageCircle, Percent, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CountdownTimer } from '@/components/common/CountdownTimer';
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
            <div>
              <Skeleton className="aspect-square w-full rounded-lg mb-4" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
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

  const nextBidAmount = product.currentBid
    ? product.currentBid + 25
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
    <div className="min-h-screen pb-16 bg-background" data-testid="product-detail-page">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            {auction && (
              <>
                <Link href={`/auctions/${auction.id}`} className="text-muted-foreground hover:text-primary transition-colors line-clamp-1">
                  {auction.title}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 border">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain p-4"
                data-testid="product-main-image"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    data-testid="prev-image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    data-testid="next-image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all bg-white ${
                    index === selectedImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  data-testid={`thumbnail-${index}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          <div>
            {auction && auction.status === 'open' && (
              <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-3 mb-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Auction Ends In</span>
                </div>
                <CountdownTimer endDate={auction.endDate} size="sm" />
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-primary border-primary font-mono">
                LOT {product.lotNumber}
              </Badge>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-3" data-testid="product-title">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Certified Authentic
              </Badge>
            </div>

            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                  <p className="text-4xl font-bold" data-testid="current-bid">
                    <span className="text-xl align-top">$</span>
                    {product.currentBid ? product.currentBid.toLocaleString() : '—'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scroll over the amount for other currencies
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground" data-testid="product-estimate">
                    Estimate (AUD): {formatPrice(product.estimateLow)} - {formatPrice(product.estimateHigh)}
                  </p>
                </div>

                <Button 
                  className="w-full mb-4 h-12 text-lg font-semibold bg-primary hover:bg-primary/90" 
                  size="lg" 
                  data-testid="place-bid"
                >
                  BID {formatPrice(nextBidAmount)}
                </Button>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <Badge variant="outline" className="px-3 py-1.5">
                    <Percent className="h-3 w-3 mr-1.5 text-primary" />
                    20% buyer's premium
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1.5">
                    <Truck className="h-3 w-3 mr-1.5 text-primary" />
                    Free International Shipping
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" data-testid="button-ask-question">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-share">
                    <Share2 className="h-4 w-4 mr-2" />
                    Tell a Friend
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-auto">
                <TabsTrigger value="description" className="text-sm py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Description
                </TabsTrigger>
                <TabsTrigger value="shipping" className="text-sm py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Shipping Information
                </TabsTrigger>
                <TabsTrigger value="terms" className="text-sm py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Terms and conditions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground" data-testid="product-description">
                    {product.description}
                  </p>
                  
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
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
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-4">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    We offer free international shipping on all items. Shipping is fully insured and tracked.
                  </p>
                  <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium text-foreground mb-2">Shipping Details</h4>
                    <ul className="space-y-2">
                      <li>• Australia: 3-5 business days</li>
                      <li>• International: 7-14 business days</li>
                      <li>• Express shipping available at checkout</li>
                    </ul>
                  </div>
                  <p>
                    All items are carefully packaged and shipped via registered post with full insurance coverage.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="terms" className="mt-4">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    By placing a bid, you agree to our auction terms and conditions.
                  </p>
                  <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium text-foreground mb-2">Key Terms</h4>
                    <ul className="space-y-2">
                      <li>• 20% buyer's premium applies to all purchases</li>
                      <li>• Payment due within 7 days of auction close</li>
                      <li>• All sales are final - no refunds on authenticated items</li>
                      <li>• Items must be collected or shipped within 14 days</li>
                    </ul>
                  </div>
                  <p>
                    For full terms and conditions, please visit our <Link href="/about" className="text-primary hover:underline">Terms of Service</Link> page.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                Sign up to comment, edit, inspect and more.{' '}
                <Button variant="outline" size="sm" className="ml-2">Sign up</Button>
                <Button variant="link" size="sm" className="ml-1 text-primary">Continue</Button>
              </p>
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
