import { Link } from 'wouter';
import { Calendar, MapPin, Package, Percent } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import type { Auction } from '@/lib/types';

interface AuctionCardProps {
  auction: Auction;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function AuctionCard({ auction }: AuctionCardProps) {
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
    <Card className="overflow-hidden hover-elevate group" data-testid={`auction-card-${auction.id}`}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={statusColors[auction.status]} data-testid={`auction-status-${auction.id}`}>
            {statusLabels[auction.status]}
          </Badge>
        </div>
        {auction.isOnline && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              Online Auction
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-serif font-semibold text-lg mb-3 line-clamp-2" data-testid={`auction-title-${auction.id}`}>
          {auction.title}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(auction.startDate)} - {formatDate(auction.endDate)}</span>
          </div>
          {auction.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{auction.location}</span>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{auction.numberOfLots} Lots</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span>{auction.buyersPremium}% Buyer's Premium</span>
            </div>
          </div>
        </div>

        {auction.status === 'open' && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Ends in:</p>
            <CountdownTimer endDate={auction.endDate} size="sm" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Link href={`/auctions/${auction.id}`} className="flex-1">
            <Button className="w-full" data-testid={`auction-catalogue-${auction.id}`}>
              View Catalogue
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
