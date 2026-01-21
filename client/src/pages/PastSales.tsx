import { Calendar, Package, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const pastSalesData = products.slice(0, 8).map((product, index) => ({
  ...product,
  soldPrice: Math.round(product.estimateLow * (0.9 + Math.random() * 0.3)),
  soldDate: new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }),
}));

export default function PastSales() {
  return (
    <div className="min-h-screen" data-testid="past-sales-page">
      <div className="bg-foreground text-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Past Sales</h1>
          </div>
          <p className="text-background/70 max-w-2xl">
            Browse our extensive archive of past auction results. Get a good idea of the
            approximate price you may expect to pay for similar items.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastSalesData.map((item) => (
            <Card key={item.id} className="overflow-hidden" data-testid={`past-sale-${item.id}`}>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-muted">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 flex-1">
                  <Badge variant="secondary" className="mb-2">SOLD</Badge>
                  <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Sold: {item.soldDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>Lot {item.lotNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-bold text-lg">{formatPrice(item.soldPrice)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Estimate: {formatPrice(item.estimateLow)} - {formatPrice(item.estimateHigh)}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Need more detailed pricing information?
              </p>
              <p className="font-medium mt-2">
                Contact us at <a href="mailto:info@firststateauctions.com" className="text-primary hover:underline">info@firststateauctions.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
