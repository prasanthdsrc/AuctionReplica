import { Link } from 'wouter';
import { CheckCircle, ArrowRight, Camera, ClipboardCheck, DollarSign, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const acceptedItems = [
  'Natural Diamonds & Gemstones',
  'Swiss Watches (Rolex, Patek Philippe, Audemars Piguet, etc.)',
  'Designer Bags (Hermès, Chanel, Louis Vuitton, Dior, etc.)',
  'Fine Jewellery (Cartier, Tiffany, Van Cleef & Arpels, etc.)',
  'Pearl Jewellery',
  'Diamond Jewellery',
  'Gold & Platinum Jewellery',
  'Estate & Antique Pieces',
];

const sellingSteps = [
  {
    icon: Camera,
    title: 'Submit Your Items',
    description: 'Send us photos and details of your items for a free, no-obligation evaluation.',
  },
  {
    icon: ClipboardCheck,
    title: 'Expert Valuation',
    description: 'Our team of experts will assess your items and provide an auction estimate.',
  },
  {
    icon: Truck,
    title: 'Ship or Drop Off',
    description: 'We arrange insured shipping or you can drop off items at our Sydney office.',
  },
  {
    icon: DollarSign,
    title: 'Get Paid',
    description: 'Once sold, receive payment within 21 days of the auction closing.',
  },
];

const benefits = [
  'No upfront fees - we only earn when your item sells',
  'Access to 100,000+ registered bidders worldwide',
  'Professional photography and marketing',
  'Competitive commission rates',
  'Secure handling and storage',
  'Expert authentication services',
];

export default function Selling() {
  return (
    <div className="min-h-screen" data-testid="selling-page">
      <div className="bg-foreground text-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Sell Your Luxury Items
            </h1>
            <p className="text-background/70 text-lg mb-8">
              Turn your fine jewellery, Swiss watches, and designer bags into cash.
              We make selling easy, secure, and profitable.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button size="lg" data-testid="cta-submit-items">
                  Submit Your Items
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-background border-background/30 hover:bg-background/10" data-testid="cta-call-us">
                Call (02) 9093 9000
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellingSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6 pt-8">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <step.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                What We Accept
              </h2>
              <p className="text-muted-foreground mb-6">
                We specialize in high-quality luxury items that appeal to our global
                collector base. If you have pieces from prestigious brands or of
                exceptional quality, we'd love to hear from you.
              </p>
              <ul className="space-y-3">
                {acceptedItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                Why Sell With Us
              </h2>
              <p className="text-muted-foreground mb-6">
                With nearly 30 years of experience and a reputation built on trust,
                we offer sellers the best opportunity to maximize the value of their items.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-foreground text-background overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-background/70 mb-6">
                    Submit your items today for a free, no-obligation evaluation.
                    Our experts will get back to you within 48 hours with an
                    auction estimate.
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link href="/contact">
                      <Button size="lg" data-testid="cta-get-started">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
                    alt="Fine jewellery"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
