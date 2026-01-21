import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, getProduct, getAuction } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import CountdownTimer from '@/components/common/CountdownTimer';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  
  if (!product) {
    return { title: 'Item Not Found' };
  }

  return {
    title: `${product.title} - First State Auctions`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const auction = getAuction(product.auctionId);
  const nextBid = product.currentBid ? product.currentBid + 100 : product.estimateLow;

  return (
    <div className="py-8" data-testid="product-detail-page">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          {auction && (
            <>
              <Link href={`/auctions/${auction.id}`} className="hover:text-foreground line-clamp-1 max-w-[200px]">
                {auction.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImageGallery images={product.images} title={product.title} />

          <div>
            {auction && auction.status === 'open' && (
              <div className="bg-foreground text-background rounded-lg p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Auction Ends In</span>
                </div>
                <CountdownTimer endDate={auction.endDate} className="font-bold" />
              </div>
            )}

            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="text-sm">LOT {product.lotNumber}</Badge>
            </div>

            <h1 className="text-2xl font-serif font-bold mb-3" data-testid="product-title">{product.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Certified Authentic
              </Badge>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                  <p className="text-3xl font-bold text-foreground" data-testid="current-bid">
                    {product.currentBid ? formatCurrency(product.currentBid) : 'No bids yet'}
                  </p>
                  <p className="text-sm text-muted-foreground">{product.bidsCount} bids</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Estimate (AUD)</p>
                  <p className="font-medium" data-testid="product-estimate">
                    {formatCurrency(product.estimateLow)} - {formatCurrency(product.estimateHigh)}
                  </p>
                </div>

                <Button className="w-full mb-4 text-lg py-6" data-testid="place-bid">
                  BID {formatCurrency(nextBid)}
                </Button>

                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="flex-1 justify-center py-2">
                    20% buyer's premium
                  </Badge>
                  <Badge variant="secondary" className="flex-1 justify-center py-2">
                    <Truck className="h-3 w-3 mr-1" />
                    Free International Shipping
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" data-testid="button-ask-question">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid="button-share">
                    <Share2 className="h-4 w-4 mr-2" />
                    Tell a Friend
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                <TabsTrigger value="terms" className="flex-1">Terms</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  {product.specifications && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Specifications</h4>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <dt className="text-muted-foreground">{key}:</dt>
                            <dd className="font-medium">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="mb-3">We offer complimentary insured shipping on all purchases.</p>
                  <h4 className="font-semibold text-foreground mb-2">Shipping Times</h4>
                  <ul className="space-y-1">
                    <li>Australia: 3-5 business days</li>
                    <li>New Zealand: 5-7 business days</li>
                    <li>Asia Pacific: 7-10 business days</li>
                    <li>North America & Europe: 10-14 business days</li>
                    <li>Rest of World: 14-21 business days</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="terms" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="mb-3">By placing a bid, you agree to the following terms:</p>
                  <ul className="space-y-1">
                    <li>20% buyer's premium applies to all purchases</li>
                    <li>Payment due within 7 days of auction close</li>
                    <li>All sales are final</li>
                    <li>Items must be collected or shipped within 14 days</li>
                    <li>Authenticity guaranteed on all items</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Sign up to receive updates on this lot
                </p>
                <Button variant="outline" size="sm">
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
