import { Shield, Award, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const milestones = [
  { year: '1995', event: 'First State Auctions founded in Sydney' },
  { year: '2002', event: 'Expanded to online auctions' },
  { year: '2010', event: 'Reached 100,000 registered bidders' },
  { year: '2015', event: 'Celebrated 20 years of excellence' },
  { year: '2020', event: 'Launched enhanced virtual bidding platform' },
  { year: '2024', event: 'Set new Australian record for watch auction' },
];

const values = [
  {
    icon: Shield,
    title: 'Authenticity',
    description: 'Every item is verified by our team of experts to ensure genuine quality.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in the luxury auction industry.',
  },
  {
    icon: Users,
    title: 'Trust',
    description: 'Building lasting relationships with buyers and sellers worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting collectors and enthusiasts from around the world.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen" data-testid="about-page">
      <div className="bg-foreground text-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">About First State Auctions</h1>
          <p className="text-background/70 text-lg max-w-3xl">
            Trusted luxury auctioneers since 1995, specializing in fine jewellery, Swiss watches,
            and designer bags with guaranteed authenticity on every item.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  First State Auctions was established in 1995 with a simple mission: to provide
                  a trusted marketplace for fine jewellery and luxury collectibles. What started
                  as a small operation in Sydney has grown into one of Australia's most respected
                  auction houses.
                </p>
                <p className="mt-4">
                  We have been selected as auctioneers to various Commonwealth of Australia
                  government agencies in the sale of seized, recovered and unclaimed jewellery,
                  a testament to our reputation for integrity and professionalism.
                </p>
                <p className="mt-4">
                  Today, we connect collectors and enthusiasts from around the world through our
                  state-of-the-art online bidding platform, while maintaining the personal touch
                  and expert service that has defined us for nearly three decades.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80"
                alt="Luxury jewellery display"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 z-10" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-primary font-bold text-lg">{milestone.year}</p>
                        <p className="text-muted-foreground">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
