import Link from 'next/link';
import { CheckCircle, ArrowRight, DollarSign, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell With Us - First State Auctions',
  description: 'Consign your luxury items with Australia\'s most trusted auction house. Competitive commission rates and global reach.',
};

export default function SellingPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Commission Rates',
      description: 'Industry-leading rates that maximize your returns. No hidden fees or surprise charges.'
    },
    {
      icon: Globe,
      title: 'Global Buyer Network',
      description: 'Access to collectors and enthusiasts from over 50 countries who actively bid on quality items.'
    },
    {
      icon: Shield,
      title: 'Secure & Insured',
      description: 'Full insurance coverage from consignment to sale. Your items are protected at every stage.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Submit Your Items',
      description: 'Contact us with photos and details of your luxury items. Our experts will provide a free preliminary valuation.'
    },
    {
      number: '2',
      title: 'Expert Authentication',
      description: 'Our specialists authenticate and appraise your items, determining accurate market values.'
    },
    {
      number: '3',
      title: 'Professional Cataloguing',
      description: 'We photograph and describe your items professionally, showcasing them to our global audience.'
    },
    {
      number: '4',
      title: 'Auction & Payment',
      description: 'Your items go to auction and you receive payment within 21 days of the sale closing.'
    }
  ];

  const itemsAccepted = [
    'Swiss Watches (Rolex, Patek Philippe, Audemars Piguet, etc.)',
    'Fine Jewellery (Diamonds, Gemstones, Precious Metals)',
    'Designer Bags (Hermès, Chanel, Louis Vuitton, etc.)',
    'Vintage & Antique Pieces',
    'Limited Edition & Collectible Items',
    'Estate Collections'
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Sell With First State Auctions</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Turn your luxury items into cash with Australia's most trusted auction house
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-consign">
              Start Consigning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <benefit.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-border" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold text-center mb-6">Items We Accept</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {itemsAccepted.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us today for a free, no-obligation valuation of your luxury items. 
            Our expert team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
            <a href="tel:+61290939000">
              <Button size="lg" variant="outline" data-testid="button-call-us">
                Call (02) 9093 9000
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
