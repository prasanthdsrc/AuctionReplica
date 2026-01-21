import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAuctions } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import CountdownTimer from '@/components/common/CountdownTimer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Current Auctions - First State Auctions',
  description: 'Browse our current and upcoming auctions featuring fine jewellery, Swiss watches, and designer bags.',
};

export default function AuctionsPage() {
  const auctions = getAuctions();
  const openAuctions = auctions.filter(a => a.status === 'open');
  const upcomingAuctions = auctions.filter(a => a.status === 'upcoming');
  const closedAuctions = auctions.filter(a => a.status === 'closed');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Auctions</h1>
          <p className="text-muted-foreground">Browse our current and upcoming auctions</p>
        </div>

        {openAuctions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Auctions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openAuctions.map((auction) => (
                <Link key={auction.id} href={`/auctions/${auction.id}`} data-testid={`auction-${auction.id}`}>
                  <Card className="overflow-hidden hover-elevate transition-all h-full">
                    <div className="relative aspect-[16/9]">
                      <img
                        src={auction.imageUrl}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600">Live</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-3">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{auction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        <span>Ends in: </span>
                        <CountdownTimer endDate={auction.endDate} className="font-medium text-foreground" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{auction.numberOfLots} Lots</span>
                        <span className="text-primary font-medium">{auction.buyersPremium}% Buyer's Premium</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {upcomingAuctions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Auctions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAuctions.map((auction) => (
                <Link key={auction.id} href={`/auctions/${auction.id}`} data-testid={`auction-${auction.id}`}>
                  <Card className="overflow-hidden hover-elevate transition-all h-full">
                    <div className="relative aspect-[16/9]">
                      <img
                        src={auction.imageUrl}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge variant="secondary" className="absolute top-3 left-3">Upcoming</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-3">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{auction.description}</p>
                      <div className="text-sm text-muted-foreground mb-3">
                        <p>Starts: {formatDate(auction.startDate)}</p>
                        <p>Ends: {formatDate(auction.endDate)}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{auction.numberOfLots} Lots</span>
                        <span className="text-primary font-medium">{auction.buyersPremium}% Buyer's Premium</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {closedAuctions.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Closed Auctions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {closedAuctions.map((auction) => (
                <Link key={auction.id} href={`/auctions/${auction.id}`} data-testid={`auction-${auction.id}`}>
                  <Card className="overflow-hidden hover-elevate transition-all h-full opacity-75">
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
                      <div className="text-sm text-muted-foreground">
                        <p>Ended: {formatDate(auction.endDate)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
