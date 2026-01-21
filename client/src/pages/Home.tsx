import { Link } from 'wouter';
import { ArrowRight, Shield, Award, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeroCarousel } from '@/components/common/HeroCarousel';
import { AuctionCard } from '@/components/auction/AuctionCard';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/common/CategoryCard';
import { FAQAccordion } from '@/components/common/FAQAccordion';
import { LoadingState, AuctionGridSkeleton, ProductGridSkeleton, CategoryGridSkeleton } from '@/components/common/LoadingState';
import { useCurrentAuctions, useFeaturedProducts, useCategories, heroSlides, faqItems } from '@/hooks/use-data';

const features = [
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Every item authenticated by experts',
  },
  {
    icon: Award,
    title: 'Trusted Since 1995',
    description: 'Over 25 years of auction excellence',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'Secure delivery to your door',
  },
];

export default function Home() {
  const { data: auctions, isLoading: auctionsLoading } = useCurrentAuctions();
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div data-testid="home-page">
      <HeroCarousel slides={heroSlides} />

      <section className="bg-muted py-8" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-background rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="current-auctions-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Current Auctions</h2>
              <p className="text-muted-foreground mt-1">Browse our latest auction events</p>
            </div>
            <Link href="/auctions">
              <Button variant="outline" className="group" data-testid="view-all-auctions">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          {auctionsLoading ? (
            <AuctionGridSkeleton count={3} />
          ) : auctions && auctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No current auctions available.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted" data-testid="featured-items-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Featured Items</h2>
              <p className="text-muted-foreground mt-1">A selection of what is currently listed for auction</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="group" data-testid="view-all-products">
                Browse All Items
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          {productsLoading ? (
            <ProductGridSkeleton count={5} cols={4} />
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No featured items available.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="categories-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Browse Categories</h2>
              <p className="text-muted-foreground mt-1">Explore popular jewellery categories and types</p>
            </div>
          </div>
          {categoriesLoading ? (
            <CategoryGridSkeleton count={10} />
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.slice(0, 10).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No categories available.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-foreground text-background" data-testid="cta-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Thinking About Selling?
            </h2>
            <p className="text-background/70 mb-6">
              We are currently taking vendor submissions for Natural Diamonds & Gemstones,
              Swiss Watches & Designer Bags. Get the best prices for your luxury items.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/selling">
                <Button size="lg" data-testid="cta-sell">
                  Start Selling
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-background border-background/30 hover:bg-background/10" data-testid="cta-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="faq-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Auction Basics</h2>
              <p className="text-muted-foreground mt-1">Quick and easy explanation to get you started</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <FAQAccordion items={faqItems} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
