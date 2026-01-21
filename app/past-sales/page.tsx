import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auctions, products } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Past Sales - First State Auctions',
  description: 'View results from our previous auctions. See realized prices and explore our auction history.',
};

export default function PastSalesPage() {
  const closedAuctions = auctions.filter(a => a.status === 'closed');
  const recentSales = products.slice(0, 8);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Past Sales</h1>
          <p className="text-muted-foreground">View results from our previous auctions</p>
        </div>

        {closedAuctions.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Completed Auctions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {closedAuctions.map((auction) => (
                <Link key={auction.id} href={`/auctions/${auction.id}`}>
                  <Card className="overflow-hidden hover-elevate transition-all h-full">
                    <div className="relative aspect-[16/9]">
                      <img
                        src={auction.imageUrl}
                        alt={auction.title}
                        className="w-full h-full object-cover grayscale"
                      />
                      <Badge variant="outline" className="absolute top-3 left-3 bg-background">Closed</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-3">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Ended: {formatDate(auction.endDate)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {auction.numberOfLots} Lots Sold
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg mb-12">
            <p className="text-muted-foreground mb-4">No closed auctions yet.</p>
            <Link href="/auctions" className="text-primary hover:underline">
              View current auctions
            </Link>
          </div>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Sale Highlights</h2>
          <p className="text-muted-foreground mb-6">
            A selection of items from our recent auctions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentSales.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} data-testid={`past-sale-${product.id}`}>
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
                    <div>
                      <p className="text-xs text-muted-foreground">Sold For</p>
                      <p className="font-semibold text-primary">
                        {product.currentBid ? formatCurrency(product.currentBid) : 'Price on request'}
                      </p>
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
