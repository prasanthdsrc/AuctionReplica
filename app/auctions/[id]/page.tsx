import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { auctions, getProductsByAuction } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import CountdownTimer from '@/components/common/CountdownTimer';
import type { Metadata } from 'next';

interface AuctionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return auctions.map((auction) => ({
    id: auction.id,
  }));
}

export async function generateMetadata({ params }: AuctionPageProps): Promise<Metadata> {
  const { id } = await params;
  const auction = auctions.find((a) => a.id === id);
  
  if (!auction) {
    return { title: 'Auction Not Found' };
  }

  return {
    title: `${auction.title} - First State Auctions`,
    description: auction.description,
  };
}

export default async function AuctionPage({ params }: AuctionPageProps) {
  const { id } = await params;
  const auction = auctions.find((a) => a.id === id);

  if (!auction) {
    notFound();
  }

  const products = getProductsByAuction(auction.id);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link href="/auctions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Auctions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              {auction.status === 'open' && (
                <Badge className="absolute top-4 left-4 bg-green-600">Live</Badge>
              )}
              {auction.status === 'upcoming' && (
                <Badge variant="secondary" className="absolute top-4 left-4">Upcoming</Badge>
              )}
              {auction.status === 'closed' && (
                <Badge variant="outline" className="absolute top-4 left-4 bg-background">Closed</Badge>
              )}
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4">{auction.title}</h1>
            <p className="text-muted-foreground mb-6">{auction.description}</p>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Auction Details</h2>
                
                {auction.status === 'open' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Time Remaining</span>
                    </div>
                    <CountdownTimer endDate={auction.endDate} className="text-2xl font-bold text-green-700" />
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{formatDate(auction.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{formatDate(auction.endDate)}</p>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">Number of Lots</p>
                    <p className="font-medium">{auction.numberOfLots}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Buyer's Premium</p>
                    <p className="font-medium">{auction.buyersPremium}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auction Type</p>
                    <p className="font-medium">{auction.isOnline ? 'Online Auction' : 'Live Auction'}</p>
                  </div>
                </div>

                {auction.status === 'open' && (
                  <Button className="w-full mt-6" data-testid="button-register-to-bid">
                    Register to Bid
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Catalogue ({products.length} Lots)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} data-testid={`catalogue-item-${product.id}`}>
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
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 mb-2 text-sm">{product.title}</h3>
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
