import { ShieldCheck, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - First State Auctions',
  description: 'Learn about First State Auctions, Australia\'s premier auction house for fine jewellery, Swiss watches, and designer bags.',
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-6 text-center">About First State Auctions</h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground text-center text-lg mb-8">
              Australia's premier online auction house specializing in fine jewellery, 
              Swiss watches, and authenticated designer bags.
            </p>
          </div>

          <div className="relative aspect-[21/9] mb-12 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80"
              alt="First State Auctions showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-2xl font-serif font-bold mb-2">Trusted Since 1995</h2>
              <p className="text-white/80">Over 25 years of expertise in luxury auctions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Authenticity Guaranteed</h3>
                <p className="text-muted-foreground">
                  Every item is thoroughly authenticated by our team of expert gemologists and brand specialists. 
                  We stand behind every piece with our 100% authenticity guarantee.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Valuations</h3>
                <p className="text-muted-foreground">
                  Our certified appraisers provide accurate, fair market valuations for all consigned items. 
                  We ensure both buyers and sellers receive the best possible outcomes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  With bidders from over 50 countries, we connect sellers with a worldwide audience of 
                  collectors and enthusiasts seeking quality luxury items.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
                <p className="text-muted-foreground">
                  From registration to delivery, we handle every aspect of the auction process. 
                  Secure payments, insured shipping, and dedicated customer support.
                </p>
              </CardContent>
            </Card>
          </div>

          <section className="bg-muted/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Our Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold mb-2">Fine Jewellery</h3>
                <p className="text-sm text-muted-foreground">
                  Diamonds, gemstones, and precious metals from renowned houses
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Swiss Watches</h3>
                <p className="text-sm text-muted-foreground">
                  Rolex, Patek Philippe, Audemars Piguet, and more
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Designer Bags</h3>
                <p className="text-sm text-muted-foreground">
                  Hermès, Chanel, Louis Vuitton, and other luxury brands
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Visit Our Showroom</h2>
            <p className="text-muted-foreground mb-4">
              Level 5, 122 Arthur Street<br />
              North Sydney, NSW 2060<br />
              Australia
            </p>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday: By appointment only
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
