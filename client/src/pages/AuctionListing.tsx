import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuctionCard } from '@/components/auction/AuctionCard';
import { AuctionGridSkeleton } from '@/components/common/LoadingState';
import { useAuctions } from '@/hooks/use-data';

export default function AuctionListing() {
  const [activeTab, setActiveTab] = useState('all');
  const { data: auctions, isLoading, isError } = useAuctions();

  const filteredAuctions = auctions?.filter((auction) => {
    if (activeTab === 'all') return true;
    return auction.status === activeTab;
  }) || [];

  const auctionCounts = {
    all: auctions?.length || 0,
    open: auctions?.filter((a) => a.status === 'open').length || 0,
    upcoming: auctions?.filter((a) => a.status === 'upcoming').length || 0,
    closed: auctions?.filter((a) => a.status === 'closed').length || 0,
  };

  return (
    <div className="min-h-screen" data-testid="auction-listing-page">
      <div className="bg-foreground text-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Auctions</h1>
          </div>
          <p className="text-background/70 max-w-2xl">
            Browse our current and upcoming auctions featuring fine jewellery, Swiss watches,
            and designer bags. Register to bid and discover exceptional luxury items at auction prices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6" data-testid="auction-tabs">
            <TabsTrigger value="all" data-testid="tab-all">
              All ({auctionCounts.all})
            </TabsTrigger>
            <TabsTrigger value="open" data-testid="tab-open">
              Open ({auctionCounts.open})
            </TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming ({auctionCounts.upcoming})
            </TabsTrigger>
            <TabsTrigger value="closed" data-testid="tab-closed">
              Closed ({auctionCounts.closed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <AuctionGridSkeleton count={3} />
            ) : isError ? (
              <div className="text-center py-16" data-testid="error-state">
                <Calendar className="h-16 w-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Error loading auctions</h3>
                <p className="text-muted-foreground">Please try again later.</p>
              </div>
            ) : filteredAuctions.length === 0 ? (
              <div className="text-center py-16" data-testid="empty-state">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No auctions found</h3>
                <p className="text-muted-foreground">
                  There are no {activeTab !== 'all' ? activeTab : ''} auctions at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
