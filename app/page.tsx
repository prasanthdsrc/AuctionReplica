import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, ShieldCheck, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { heroSlides, auctions, categories, getFeaturedProducts } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import HeroCarousel from '@/components/common/HeroCarousel';
import CountdownTimer from '@/components/common/CountdownTimer';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const openAuctions = auctions.filter(a => a.status === 'open');

  return (
    <div>
      <HeroCarousel slides={heroSlides} />

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">Current Auctions</h2>
              <p className="text-muted-foreground">Don't miss out on these live auctions</p>
            </div>
            <Link href="/auctions">
              <Button variant="outline" data-testid="link-view-all-auctions">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`} data-testid={`auction-card-${auction.id}`}>
                <Card className="overflow-hidden hover-elevate transition-all">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={auction.imageUrl}
                      alt={auction.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600">Live</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{auction.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <CountdownTimer endDate={auction.endDate} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{auction.numberOfLots} Lots</span>
                      <span className="text-primary font-medium">{auction.buyersPremium}% BP</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">Featured Items</h2>
              <p className="text-muted-foreground">Hand-picked luxury pieces from our current auctions</p>
            </div>
            <Link href="/products">
              <Button variant="outline" data-testid="link-view-all-products">
                Browse All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} data-testid={`product-card-${product.id}`}>
                <Card className="overflow-hidden hover-elevate transition-all">
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
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} data-testid={`category-card-${category.slug}`}>
                <Card className="overflow-hidden hover-elevate transition-all text-center">
                  <div className="aspect-square relative">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-medium text-white text-sm">{category.name}</h3>
                      <p className="text-xs text-white/70">{category.productCount} items</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">100% Authentic</h3>
              <p className="text-sm text-background/70">Every item guaranteed authentic or your money back</p>
            </div>
            <div className="text-center">
              <Award className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Expert Valuations</h3>
              <p className="text-sm text-background/70">Professional appraisals by certified gemologists</p>
            </div>
            <div className="text-center">
              <Truck className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-background/70">Complimentary insured delivery worldwide</p>
            </div>
            <div className="text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-background/70">Multiple payment options with buyer protection</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Sell?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Consign your luxury items with Australia's most trusted auction house. 
            We offer competitive commission rates and global reach.
          </p>
          <Link href="/selling">
            <Button size="lg" data-testid="button-sell-with-us">
              Start Selling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
