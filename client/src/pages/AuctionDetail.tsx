import { useParams, Link } from 'wouter';
import { Calendar, MapPin, Package, Percent, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/LoadingState';
import { useAuction } from '@/hooks/use-data';
import { getProductsByAuction } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: auction, isLoading: auctionLoading, isError } = useAuction(id || '');
  const { data: auctionProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/auctions', id, 'products'],
    queryFn: () => getProductsByAuction(id || ''),
    enabled: !!id,
  });

  if (auctionLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-64 md:h-80 w-full" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-20 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </CardContent>
              </Card>
              <ProductGridSkeleton count={6} cols={3} />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !auction) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="auction-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
          <p className="text-muted-foreground mb-6">The auction you're looking for doesn't exist.</p>
          <Link href="/auctions">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Auctions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };

  const statusLabels = {
    upcoming: 'Coming Soon',
    open: 'Open for Bidding',
    closed: 'Closed',
  };

  return (
    <div className="min-h-screen" data-testid="auction-detail-page">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <Link href="/auctions">
              <Button variant="ghost" size="sm" className="text-white mb-4 -ml-2" data-testid="back-to-auctions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Auctions
              </Button>
            </Link>
            <div className="flex items-start gap-3 mb-2">
              <Badge className={statusColors[auction.status]}>
                {statusLabels[auction.status]}
              </Badge>
              {auction.isOnline && (
                <Badge variant="secondary">Online Auction</Badge>
              )}
            </div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-white" data-testid="auction-title">
              {auction.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">About This Auction</h2>
                <p className="text-muted-foreground mb-6">{auction.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Start Date</p>
                      <p className="text-sm font-medium">{formatDate(auction.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">End Date</p>
                      <p className="text-sm font-medium">{formatDate(auction.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Lots</p>
                      <p className="text-sm font-medium">{auction.numberOfLots} Items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Percent className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Buyer's Premium</p>
                      <p className="text-sm font-medium">{auction.buyersPremium}%</p>
                    </div>
                  </div>
                  {auction.location && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg sm:col-span-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{auction.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <h2 className="font-semibold text-lg">Catalogue ({auctionProducts.length} Items)</h2>
              </div>
              {productsLoading ? (
                <ProductGridSkeleton count={6} cols={3} />
              ) : auctionProducts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No items in this auction yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {auctionProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  {auction.status === 'open' && (
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-3">Auction ends in:</p>
                      <CountdownTimer endDate={auction.endDate} size="md" />
                    </div>
                  )}
                  
                  {auction.status === 'upcoming' && (
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-3">Auction starts in:</p>
                      <CountdownTimer endDate={auction.startDate} size="md" />
                    </div>
                  )}

                  <Button className="w-full mb-3" size="lg" data-testid="register-to-bid">
                    Register to Bid
                  </Button>
                  
                  <Button variant="outline" className="w-full" data-testid="view-full-catalogue">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Catalogue
                  </Button>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium text-sm mb-3">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact our team for assistance with registration or bidding.
                    </p>
                    <p className="text-sm font-medium mt-2">(02) 9093 9000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
